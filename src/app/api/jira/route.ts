import { NextRequest, NextResponse } from 'next/server';

interface JiraRequest {
  jiraUrl: string;
  token: string;
  label: string;
}

interface JiraResponse {
  issues?: Array<{
    key: string;
    fields: {
      summary: string;
      description: string;
      status: { name: string };
      assignee?: { displayName: string };
    };
  }>;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { jiraUrl, token, label }: JiraRequest = await request.json();
    
    // Validate inputs
    if (!jiraUrl || !token || !label) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Jira API request
    const jql = encodeURIComponent(`labels = "${label}"`);
    const response = await fetch(`${jiraUrl}/rest/api/3/search?jql=${jql}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`:${token}`).toString('base64')}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Jira API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return NextResponse.json<JiraResponse>({ issues: data.issues });
  } catch (error) {
    console.error('Jira API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Jira tasks' },
      { status: 500 }
    );
  }
}
