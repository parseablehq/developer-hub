import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.TAVILY_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Tavily API key not configured' },
        { status: 500 }
      );
    }

    // Search specifically within Parseable documentation
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        query: `${query} site:parseable.com OR site:parseable.io`,
        search_depth: 'advanced',
        include_answer: true,
        include_raw_content: false,
        max_results: 5,
        include_domains: ['parseable.com', 'parseable.io', 'docs.parseable.com'],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Tavily API error:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch AI search results' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      answer: data.answer || null,
      results: data.results?.map((result: {
        title: string;
        url: string;
        content: string;
        score?: number;
      }) => ({
        title: result.title,
        url: result.url,
        content: result.content,
        score: result.score,
      })) || [],
    });
  } catch (error) {
    console.error('AI search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
