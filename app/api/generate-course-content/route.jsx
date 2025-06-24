import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";

export async function POST(req) {
    const {courseJson, courseTitle, courseId} = await req.json();
    const PROMPT='Generate content for each topic in HTML format and return ONLY valid JSON. Schema: {chapterName: string, topic: string, content: string, duration: string}. Important: Return only the JSON array, no markdown formatting or additional text. User Input:';
    
    const promises = courseJson?.chapters?.map(async(chapter) => {
        const config = {
            responseMimeType: 'application/json', // Request JSON directly
        };
        const model = 'gemini-2.0-flash';
        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: PROMPT + JSON.stringify(chapter),
                    },
                ],
            },
        ];

        try {
            const response = await ai.models.generateContent({
                model,
                config,
                contents,
            });

            let rawResp = response?.candidates[0]?.content?.parts[0]?.text;
            console.log('Raw AI Response:', rawResp);

            // More robust JSON cleaning
            const jsonResp = cleanAndParseJSON(rawResp);
            
            return jsonResp;
        } catch (error) {
            console.error('Error processing chapter:', chapter, error);
            // Return a fallback structure
            return {
                chapterName: chapter.chapterName || 'Unknown Chapter',
                topic: chapter.topic || 'Unknown Topic',
                content: '<div><h2>Content temporarily unavailable</h2><p>Please try again later.</p></div>',
                duration: '30 minutes'
            };
        }
    });
    
    try {
        const CourseContent = await Promise.all(promises);
        
        return NextResponse.json({
            courseName: courseTitle,
            CourseContent: CourseContent
        });
    } catch (error) {
        console.error('Error generating course content:', error);
        return NextResponse.json(
            { error: 'Failed to generate course content' }, 
            { status: 500 }
        );
    }
}

function cleanAndParseJSON(rawText) {
    try {
        // First, try parsing as-is (in case it's already clean JSON)
        return JSON.parse(rawText);
    } catch (e) {
        // If that fails, try cleaning the text
        let cleanedText = rawText;
        
        // Remove all markdown code block markers
        cleanedText = cleanedText.replace(/```json\s*/gi, '');
        cleanedText = cleanedText.replace(/```\s*/g, '');
        
        // Remove any leading/trailing whitespace
        cleanedText = cleanedText.trim();
        
        // Find the first [ or { and last ] or }
        const firstBracket = Math.min(
            cleanedText.indexOf('[') >= 0 ? cleanedText.indexOf('[') : Infinity,
            cleanedText.indexOf('{') >= 0 ? cleanedText.indexOf('{') : Infinity
        );
        
        const lastBracket = Math.max(
            cleanedText.lastIndexOf(']'),
            cleanedText.lastIndexOf('}')
        );
        
        if (firstBracket !== Infinity && lastBracket >= 0) {
            cleanedText = cleanedText.substring(firstBracket, lastBracket + 1);
        }
        
        try {
            return JSON.parse(cleanedText);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            console.error('Cleaned text:', cleanedText);
            
            // Try to fix common JSON issues
            cleanedText = fixCommonJSONIssues(cleanedText);
            
            try {
                return JSON.parse(cleanedText);
            } catch (finalError) {
                console.error('Final JSON Parse Error:', finalError);
                throw new Error(`Unable to parse JSON: ${finalError.message}`);
            }
        }
    }
}

function fixCommonJSONIssues(jsonString) {
    let fixed = jsonString;
    
    // Fix escaped quotes in HTML content
    // Replace \" with " inside HTML content (between > and <)
    fixed = fixed.replace(/>([^<]*)\\"([^<]*)</g, '>$1"$2<');
    
    // Fix unescaped quotes in HTML attributes
    fixed = fixed.replace(/="([^"]*)"([^"]*)"([^"]*)">/g, '="$1\\"$2\\"$3">');
    
    // Fix unescaped backslashes (except valid escape sequences)
    fixed = fixed.replace(/\\(?!["\\/bfnrt])/g, '\\\\');
    
    // Fix trailing commas
    fixed = fixed.replace(/,\s*([}\]])/g, '$1');
    
    // Fix missing commas between objects/arrays
    fixed = fixed.replace(/}\s*{/g, '},{');
    fixed = fixed.replace(/]\s*\[/g, '],[');
    
    return fixed;
}