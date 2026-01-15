import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/dbConnect'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const evidence = formData.get('evidence') as File
    const latitude = parseFloat(formData.get('latitude') as string)
    const longitude = parseFloat(formData.get('longitude') as string)
    const description = formData.get('description') as string
    const userId = formData.get('userId') as string | null

    if (!evidence || isNaN(latitude) || isNaN(longitude)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // DO NOT create or list buckets — it is forbidden by Supabase
    const bucketName = 'reports'

    // Generate unique filename
    const fileName = `${Date.now()}-${evidence.name.replace(/\s/g, '-')}`

    // Upload image to existing bucket
    const { error: uploadError } = await supabaseAdmin.storage
      .from(bucketName)
      .upload(fileName, evidence, {
        contentType: evidence.type,
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ error: 'Failed to upload evidence' }, { status: 500 })
    }

    // Get public image URL
    const { data } = supabaseAdmin.storage
      .from(bucketName)
      .getPublicUrl(fileName)

    const publicUrl = data.publicUrl

    // Save report in database
    const { data: report, error: reportError } = await supabaseAdmin
      .from('citizen_reports')
      .insert({
        image_url: publicUrl,
        latitude,
        longitude,
        notes: description,
        user_id: userId || null
      })
      .select()
      .single()

    if (reportError) {
      console.error('Report insert error:', reportError)
      return NextResponse.json({ error: 'Failed to save report' }, { status: 500 })
    }

    // Call AI audit API
    const protocol = req.headers.get('x-forwarded-proto') || 'http'
    const host = req.headers.get('host')
    const auditUrl = `${protocol}://${host}/api/audit`

    const auditRes = await fetch(auditUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reportId: report.id,
        imageUrl: publicUrl,
        latitude,
        longitude,
        notes: description
      })
    })

    const auditData = await auditRes.json()

    return NextResponse.json({
      success: true,
      report,
      audit: auditData.audit || null
    })

  } catch (err) {
    console.error('Report API Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}