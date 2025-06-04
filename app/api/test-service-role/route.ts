import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase/server"

export async function GET() {
  try {
    // Test service role access by trying to access auth admin functions
    const { data, error } = await supabaseServer.auth.admin.listUsers({
      page: 1,
      perPage: 1,
    })

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: `Service role test failed: ${error.message}`,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Service role key is working correctly",
      userCount: data.users.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
