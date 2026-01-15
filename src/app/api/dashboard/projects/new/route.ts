import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/dbConnect";
import { auditProject } from "@/services/geminiService";
import { OfficialRecord } from "@/types/types";

const reportCount = async () => {
  const { count, error } = await supabaseAdmin
    .from("citizen_reports")
    .select("*", { count: "exact", head: true });

  if (error) return 0;

  return count;
};

export async function POST(req: NextRequest) {
  try {
    const {projectName, category, contractorName, budget, deadline, description} = req.body

    return NextResponse.json({})
  } catch (error) {
    console.error("DASHBOARD/SUMMARY API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
