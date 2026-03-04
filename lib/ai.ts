import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateDashboardInsights(data: any) {
    const prompt = `
    Analyze the following telecom business data for a tenant:
    ${JSON.stringify(data)}
    
    Provide:
    1. A weekly performance summary.
    2. Growth trends.
    3. Risk alerts (e.g., low compliance).
    4. Unusual activity detection.
    
    Format the response as a JSON object with these keys.
  `;

    const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || "{}");
}

export async function translateNaturalLanguageQuery(query: string) {
    const prompt = `
    Translate the following natural language query into a structured database search object for Prisma:
    Query: "${query}"
    
    Available Models: Client (name, phone, idNumber, status), SIMBatch (batchId), SIMCard (serialNumber, status).
    
    Example output for "Show me all clients registered this month":
    { "model": "Client", "where": { "registrationDate": { "gte": "2024-03-01T00:00:00Z" } } }
    
    Return only the JSON object.
  `;

    const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || "{}");
}
