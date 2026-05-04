import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildPrompt } from '@/lib/ai/readings';

const client = new Anthropic(); // uses ANTHROPIC_API_KEY env var

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

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract text from the response
    const textBlock = message.content.find((block) => block.type === 'text');
    const reading = textBlock ? textBlock.text : 'Unable to generate reading at this time.';

    return NextResponse.json({
      reading,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error('AI Reading API error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    // Check for specific API errors
    if (errorMessage.includes('api_key') || errorMessage.includes('authentication')) {
      return NextResponse.json(
        { error: 'AI service is not configured. Please set up your API key.' },
        { status: 503 }
      );
    }

    if (errorMessage.includes('rate_limit') || errorMessage.includes('overloaded')) {
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
