import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { getToken } = auth();
    const token = await getToken();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const criteria = searchParams.get('criteria');
    const month = searchParams.get('month');
    const year = searchParams.get('year');

    if (!criteria || !month || !year) {
      return new NextResponse('Missing required parameters', { status: 400 });
    }

    const response = await fetch(
      `${process.env.API_BASE_URL}/bill/monthly-summary?${searchParams.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in monthly-summary:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}