import { NextResponse } from 'next/server';

export async function POST(req) {
    const body = await req.json();
    const { link, filename } = body;
    console.log(filename)
    try {
        const response = await fetch(link);
        if (!response.ok) throw new Error('Failed to fetch PDF');

        const pdfBuffer = await response.arrayBuffer();
        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"}`,
            },
        });
    } catch (error) {
        return new NextResponse('Error downloading PDF', { status: 500 });
    }
}