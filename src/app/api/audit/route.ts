import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/dbConnect';
import { auditProject } from '@/services/geminiService';
import { OfficialRecord } from '@/types/types';

export async function POST(req: NextRequest) {
    try {
        const { reportId, imageUrl, latitude, longitude, notes } = await req.json();

        if (!reportId || !imageUrl || isNaN(latitude) || isNaN(longitude)) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Fetch nearest government project
        // For simplicity in a hackathon, we fetch all and find the nearest in JS.
        // In production, use PostGIS: st_distance(location, st_point(lng, lat))
        const { data: projects, error: projectsError } = await supabase
            .from('government_projects')
            .select('*');

        if (projectsError || !projects) {
            return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
        }

        const nearestProject = projects.reduce((prev, curr) => {
            const prevDist = Math.sqrt(Math.pow(prev.latitude - latitude, 2) + Math.pow(prev.longitude - longitude, 2));
            const currDist = Math.sqrt(Math.pow(curr.latitude - latitude, 2) + Math.pow(curr.longitude - longitude, 2));
            return prevDist < currDist ? prev : curr;
        });

        // 2. Perform AI Audit using the new combined function
        const auditResult = await auditProject(nearestProject, { imageUrl, notes });

        // 3. Insert into audit_results
        const { data: auditData, error: auditError } = await supabase
            .from('audit_results')
            .insert({
                report_id: reportId,
                project_id: nearestProject.id,
                risk_level: auditResult.risk_level,
                discrepancies: auditResult.discrepancies,
                ai_verdict: auditResult.ai_verdict
            })
            .select()
            .single();

        if (auditError) {
            console.error('Audit save error:', auditError);
            return NextResponse.json({ error: 'Failed to save audit result' }, { status: 500 });
        }

        // 5. Update Report Status
        await supabase
            .from('citizen_reports')
            .update({ status: 'Audited' })
            .eq('id', reportId);

        return NextResponse.json({ success: true, audit: auditData });

    } catch (error) {
        console.error('Audit API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
