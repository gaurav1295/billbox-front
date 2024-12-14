import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { getToken } = auth();
    const token = await getToken();

    if (!token) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }

    // Parse formData from the incoming request
    const formData = await req.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Prepare FormData for external API
    const externalFormData = new FormData();
    externalFormData.append('image', file);

    // Send file to external API
    const externalApiResponse = await fetch('http://localhost:8000/extract/extract-text', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // Token added for authentication
        // No Content-Type header for multipart/form-data; FormData sets it automatically
      },
      body: externalFormData,
    });

    if (!externalApiResponse.ok) {
      const errorResponse = await externalApiResponse.text();
      throw new Error(`External API upload failed: ${errorResponse}`);
    }

    const externalApiData = await externalApiResponse.json();
    return NextResponse.json({ fileId: externalApiData.fileId });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
