import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { jiraUrl, token, label, email } = await request.json();

    if (!jiraUrl || !token || !label || !email) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const query = "project=BTS";
    // Construct the Jira endpoint (API v3 for cloud)
    const endpoint = `${jiraUrl.replace(/\/$/, "")}/rest/api/3/search/jql?jql=${encodeURIComponent(
      query
    )}`;
    // Log the query for debugging
    console.log("Jira JQL query:", query);

    // Prepare Basic Auth header
    const authHeader =
      "Basic " + Buffer.from(`${email}:${token}`).toString("base64");

    const jiraResponse = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: authHeader,
        Accept: "application/json",
      },
    });

    if (!jiraResponse.ok) {
      const text = await jiraResponse.text();
      console.error("Jira API error:", text);
      return NextResponse.json({ error: text }, { status: jiraResponse.status });
    }

    const data = await jiraResponse.json();
    console.log("Response:", data);

    // Normalize the data structure for frontend
    const issues =
      data.sections?.[0]?.issues?.map((issue: any) => ({
        key: issue.key,
        fields: {
          summary: issue.summary,
          status: { name: issue.statusText || "Unknown" },
          assignee: { displayName: issue.subtitle || "—" },
        },
      })) || [];

    return NextResponse.json({ issues }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching Jira issues:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}