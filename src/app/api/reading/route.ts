import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildPrompt } from '@/lib/ai/readings';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { module, data, userName } = body;

    if (!module || !data || !userName) {
      return NextResponse.json(
        { error: 'Missing required fields: module, data, userName' },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(module, data, userName);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const reading = result.response.text();

    return NextResponse.json({
      reading,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error('AI Reading API error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    if (errorMessage.includes('API_KEY') || errorMessage.includes('authentication')) {
      return NextResponse.json(
        { error: 'AI service is not configured. Please set up your API key.' },
        { status: 503 }
      );
    }

    if (errorMessage.includes('quota') || errorMessage.includes('rate')) {
      return NextResponse.json(
        { error: 'AI service is temporarily busy. Please try again in a moment.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate reading. Please try again later.' },
      { status: 500 }
    );
  }
}
