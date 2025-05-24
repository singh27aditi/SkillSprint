import { db } from '@/config/db'
import { coursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const PROMPT = `Generate a learning course based on the following details. Make sure to add Course Name, Description, Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing the user's topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to the user's course, like sticky notes, design components, and visual aids. Use a minimalist color palette (black, gray, white, slate) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in the user's course) for Course Banner in 3d format Chapter Name, Topic under each chapters , Duration for each chapters etc, in JSON format only

Schema:

{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "chapters": "number",

"bannerImagePrompt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": [
          "string"
        ],
     
      }
    ]
  }
}

, User Input: `

export async function POST(req){
    const {courseId, ...formData} = await req.json();
    const user = await currentUser();

// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node


    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });
    const config = {
        responseMimeType: 'text/plain',
    };
    const model = 'gemini-2.0-flash';
    const contents = [
        {
        role: 'user',
        parts: [
            {
            text: PROMPT + JSON.stringify(formData),
            },
        ],
        },
    ];

    const response = await ai.models.generateContent({
        model,
        config,
        contents,
    });

    console.log(response.candidates[0].content.parts[0].text);

    const RawResp = response?.candidates[0]?.content?.parts[0]?.text;

    const RawJson = RawResp.replace('```json','').replace('```','');

    const JSONResp = JSON.parse(RawJson);

    //generate image

    const result = await db.insert(coursesTable).values({
        ...formData,
        courseJson: response.candidates[0].content.parts[0].text,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        cid: courseId
    })

    return NextResponse.json({courseId:courseId});
    }
