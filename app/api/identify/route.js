// app/api/identify/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

function extractJsonFromMarkdown(markdown) {
  const jsonMatch = markdown.match(/```json\n([\s\S]*?)\n```/);
  if (jsonMatch && jsonMatch[1]) {
    try {
      return JSON.parse(jsonMatch[1]);
    } catch (error) {
      console.error("Error parsing JSON from markdown:", error);
    }
  }
  return null;
}

export async function POST(request) {
  try {
    const { image } = await request.json();

    if (!process.env.GOOGLE_API_KEY) {
      console.error("GOOGLE_API_KEY is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    //const genAI = new GoogleGenerativeAI(
    //  "xosapike",
    //);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("Sending request to Gemini API...");
    const result = await model.generateContent([
      "Identify this plant and provide the following information in JSON format: \n" +
        "1. name: Plant name\n" +
        "2. description: Brief description\n" +
        "3. scientificName: Scientific name\n" +
        "4. family: Family\n" +
        "5. nativeRegion: Native region\n" +
        "6. sunlightNeeds: Sunlight needs\n" +
        "7. wateringFrequency: Watering frequency\n",
      { inlineData: { data: image.split(",")[1], mimeType: "image/jpeg" } },
    ]);

    const response = await result.response;
    const text = response.text();

    console.log("Gemini API response:", text);

    // Extract and parse the JSON from the markdown response
    const plantInfo = extractJsonFromMarkdown(text);

    if (!plantInfo) {
      throw new Error("Failed to parse plant information from API response");
    }

    return NextResponse.json(plantInfo);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to identify plant: " + error.message },
      { status: 500 },
    );
  }
}
