import { db } from '@/config/db'
import { coursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import axios from 'axios';

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

export const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

export async function POST(req){
    const {courseId, ...formData} = await req.json();
    const user = await currentUser();

// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node
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

    const ImagePrompt = JSONResp.course?.bannerImagePrompt;

    //generate image
    const bannerImageUrl = await GenerateImage(ImagePrompt)

    const result = await db.insert(coursesTable).values({
        ...formData,
        courseJson: response.candidates[0].content.parts[0].text,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        cid: courseId,
        bannerImageUrl: bannerImageUrl
    })

    return NextResponse.json({courseId:courseId});
    }

    const GenerateImage = async (imagePrompt) => {
      const BASE_URL='https://aigurulab.tech';
        const result = await axios.post(BASE_URL+'/api/generate-image',
                {
                    width: 1024,
                    height: 1024,
                    input: imagePrompt,
                    model: 'flux',
                    aspectRatio:"16:9"
                },
                {
                    headers: {
                        'x-api-key': process.env.AI_GURU_LAB_API,
                        'Content-Type': 'application/json',
                    },
                })
        console.log(result.data.image)
        return result.data.image;
    }