import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { getToken } = auth();
    const token = await getToken();

    const response = await fetch(
      `${process.env.API_BASE_URL}/bill/lastest-bill-list`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in latest-bill-list:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}