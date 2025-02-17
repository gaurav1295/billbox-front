import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { getToken } = auth();
    const token = await getToken();
    
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return new NextResponse('No file provided', { status: 400 });
    }

    const response = await fetch(`${process.env.API_BASE_URL}/extract/extract-text-queue`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}