import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/dbConnect';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const image = formData.get('image') as File;
        const latitude = parseFloat(formData.get('latitude') as string);
        const longitude = parseFloat(formData.get('longitude') as string);
        const notes = formData.get('notes') as string;

        const userId = formData.get('userId') as string;

        if (!image || isNaN(latitude) || isNaN(longitude)) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Upload Image to Supabase Storage
        const fileName = `${Date.now()}-${image.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('reports')
            .upload(fileName, image);

        if (uploadError) {
            console.error('Upload error:', uploadError);
            return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
        }

        const imageUrl = supabase.storage.from('reports').getPublicUrl(fileName).data.publicUrl;

        // 2. Insert row into citizen_reports
        const { data: report, error: reportError } = await supabase
            .from('citizen_reports')
            .insert({
                image_url: imageUrl,
                latitude,
                longitude,
                notes,
                status: 'Pending',
                user_id: userId || null // Handle optional user_id
            })
            .select()
            .single();

        if (reportError) {
            console.error('Report save error:', reportError);
            return NextResponse.json({ error: 'Failed to save report' }, { status: 500 });
        }

        // 3. Call /api/audit
        // We use the absolute URL for internal fetch in Next.js
        const protocol = req.headers.get('x-forwarded-proto') || 'http';
        const host = req.headers.get('host');
        const auditUrl = `${protocol}://${host}/api/audit`;

        // Fire and forget or wait? User said "Call /api/audit", usually we wait for real-time feedback.
        const auditRes = await fetch(auditUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                reportId: report.id,
                imageUrl,
                latitude,
                longitude,
                notes
            })
        });

        const auditData = await auditRes.json();

        return NextResponse.json({
            success: true,
            report,
            audit: auditData.audit
        });

    } catch (error) {
        console.error('Report API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
