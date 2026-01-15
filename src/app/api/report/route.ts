import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/dbConnect';


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const evidence = formData.get('evidence') as File;
    const latitude = parseFloat(formData.get('latitude') as string);
    const longitude = parseFloat(formData.get('longitude') as string);
    const description = formData.get('description') as string;
    const userId = formData.get('userId') as string;

    if (!evidence || isNaN(latitude) || isNaN(longitude)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1Ensure bucket exists and is public
    const bucketName = 'reports';
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    if (listError) {
      console.error('Error listing buckets:', listError);
      return NextResponse.json({ error: 'Failed to list buckets' }, { status: 500 });
    }

    const bucketExists = buckets.some((b) => b.name === bucketName);

    if (!bucketExists) {
      const { data: createdBucket, error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true, // Make the bucket public
      });

      if (createError) {
        console.error('Error creating bucket:', createError);
        return NextResponse.json({ error: 'Failed to create bucket' }, { status: 500 });
      }

      console.log('Bucket created:', createdBucket);
    }

    // 2Upload evidence
    const fileName = `${Date.now()}-${evidence.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, evidence.stream(), {
        contentType: evidence.type, // preserve MIME type
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json({ error: 'Failed to upload evidence' }, { status: 500 });
    }

    // 3Get public URL
    const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(fileName);

    // 4Insert row into citizen_reports
    const { data: report, error: reportError } = await supabase
      .from('citizen_reports')
      .insert({
        image_url: publicUrl,
        latitude,
        longitude,
        notes: description,
        status: 'Pending',
        user_id: userId || null,
      })
      .select()
      .single();

    if (reportError) {
      console.error('Report save error:', reportError);
      return NextResponse.json({ error: 'Failed to save report' }, { status: 500 });
    }

    // 5Call /api/audit
    const protocol = req.headers.get('x-forwarded-proto') || 'http';
    const host = req.headers.get('host');
    const auditUrl = `${protocol}://${host}/api/audit`;

    const auditRes = await fetch(auditUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reportId: report.id,
        imageUrl: publicUrl,
        latitude,
        longitude,
        notes: description,
      }),
    });

    const auditData = await auditRes.json();

    return NextResponse.json({
      success: true,
      report,
      audit: auditData.audit,
    });
  } catch (error) {
    console.error('Report API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

