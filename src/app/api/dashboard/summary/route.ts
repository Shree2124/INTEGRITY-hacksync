import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/dbConnect";
import { auditProject } from "@/services/geminiService";
import { OfficialRecord } from "@/types/types";

const reportCount = async ()=>{
    const { count, error } = await supabase
    .from("citizen_reports")
    .select("*", { count: "exact", head: true })

    if(error) throw new Error("error while fetching citizen reports")

    return count
}

const highRiskCount = async ()=>{
    const { count, error } = await supabase
    .from("citizen_reports")
    .select("*", { count: "exact", head: true })
    .eq("","")

    if(error) throw new Error("error while fetching citizen reports")

    return count
}

export async function POST(req: NextRequest) {
  try {
    const { count: totalReports, error: error1 } = await supabase
      .from("citizen_reports")
      .select("*", { count: "exact", head: true });
  } catch (error) {
    console.error("DASHBOARD/SUMMARY API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
