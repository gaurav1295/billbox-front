import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const { getToken } = auth();
    const token = await getToken();
    
    const taskId = params.taskId;

    if (!taskId) {
      return new NextResponse('No taskId provided', { status: 400 });
    }

    const response = await fetch(`${process.env.API_BASE_URL}/extract/status/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}