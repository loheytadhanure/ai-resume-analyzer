import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
});


export async function parseJobDescription(
    text: string
) {

    console.log(
        "Sending job description to OpenRouter..."
    );


    const response =
        await client.chat.completions.create({

            model: "openai/gpt-4o-mini",

            messages: [

                // =================================
                // SYSTEM PROMPT
                // =================================

                {
                    role: "system",

                    content: `
You are an expert job description analyzer.

Analyze the job description and extract structured information.

IMPORTANT:

Return ONLY valid JSON.

Do not use markdown.
Do not use code blocks.
Do not add explanations.

The most important task is to extract ATOMIC skills.

An atomic skill means ONE specific skill, technology,
programming language, tool, concept, or soft skill.

DO NOT return entire sentences as skills.

For example:

BAD:
"Basic programming knowledge (Java / Python / or similar languages)"

GOOD:
"Java"
"Python"
"Programming"

BAD:
"Understanding of data structures and algorithms"

GOOD:
"Data Structures"
"Algorithms"

BAD:
"Exposure to AI concepts or hands-on use of AI tools
(GitHub Copilot, Claude Code, Cursor)"

GOOD:
"AI"
"GitHub Copilot"
"Claude Code"
"Cursor"

Separate technical skills from soft skills.

Use exactly this structure:

{
    "jobTitle": "",
    "company": "",

    "requiredSkills": [],

    "preferredSkills": [],

    "softSkills": [],

    "responsibilities": [],

    "qualifications": []
}

Rules:

1. Extract every explicit technology.
2. Extract programming languages.
3. Extract frameworks.
4. Extract databases.
5. Extract cloud technologies.
6. Extract AI/ML technologies.
7. Extract developer tools.
8. Extract concepts such as Data Structures and Algorithms.
9. Extract explicit soft skills separately.
10. Do not invent skills.
11. Do not put complete sentences inside requiredSkills.
`
                },


                // =================================
                // USER INPUT
                // =================================

                {
                    role: "user",
                    content: text
                }

            ],

            temperature: 0

        });


    const content =
        response.choices[0]?.message?.content;


    if (!content) {

        throw new Error(
            "OpenRouter returned an empty response."
        );

    }


    console.log(
        "OpenRouter response received."
    );

    console.log(
        "RAW JD RESPONSE:"
    );

    console.log(content);


    // =================================
    // EXTRACT JSON
    // =================================

    const jsonStart =
        content.indexOf("{");

    const jsonEnd =
        content.lastIndexOf("}");


    if (
        jsonStart === -1 ||
        jsonEnd === -1
    ) {

        throw new Error(
            "No valid JSON found in OpenRouter response."
        );

    }


    const jsonText =
        content.substring(
            jsonStart,
            jsonEnd + 1
        );


    return JSON.parse(jsonText);
}


// import OpenAI from "openai";
// import dotenv from "dotenv";

// dotenv.config();

// const client = new OpenAI({
//     apiKey: process.env.OPENROUTER_API_KEY,
//     baseURL: "https://openrouter.ai/api/v1"
// });

// export async function parseJobDescription(text: string) {

//     console.log("Sending job description to OpenRouter...");

//     const response = await client.chat.completions.create({

//         // We will use a model available through OpenRouter
//         model: "openai/gpt-4o-mini",

//         messages: [
//             {
//                 role: "system",
//                 content: `
// You are an expert job description parser.

// Extract structured information from the job description.

// Return ONLY valid JSON.

// Do not include:
// - explanations
// - markdown
// - code fences

// Do not invent information.

// Use exactly this structure:

// {
//     "jobTitle": "",
//     "company": "",
//     "requiredSkills": [],
//     "preferredSkills": [],
//     "responsibilities": [],
//     "qualifications": []
// }

// Extract exact technology and skill names.
// `
//             },

//             {
//                 role: "user",
//                 content: text
//             }
//         ],

//         temperature: 0
//     });

//     const content =
//         response.choices[0]?.message?.content;

//     if (!content) {
//         throw new Error(
//             "OpenRouter returned an empty response."
//         );
//     }

//     console.log(
//         "OpenRouter response received."
//     );

//     console.log(
//         "RAW JD RESPONSE:"
//     );

//     console.log(content);


//     // Extract JSON from the response
//     const jsonStart =
//         content.indexOf("{");

//     const jsonEnd =
//         content.lastIndexOf("}");


//     if (
//         jsonStart === -1 ||
//         jsonEnd === -1
//     ) {
//         throw new Error(
//             "No valid JSON found in OpenRouter response."
//         );
//     }


//     const jsonText =
//         content.substring(
//             jsonStart,
//             jsonEnd + 1
//         );


//     return JSON.parse(jsonText);
// }
// // import OpenAI from "openai";
// // import dotenv from "dotenv";

// // dotenv.config();

// // const client = new OpenAI({
// //     apiKey: process.env.OPENROUTER_API_KEY,
// //     baseURL: "https://openrouter.ai/api/v1"
// // });


// // export async function parseJobDescription(text: string) {

// //     console.log("Sending job description to OpenAI...");

// //     const response = await client.responses.create({

// //         model: "openai/gpt-4o-mini",

// //         input: [
// //             {
// //                 role: "system",

// //                 content: `
// // You are an expert job description parser.

// // Your task is to analyze a job description and extract
// // important information into structured JSON.

// // Do not invent information.

// // Extract exact skill and technology names.

// // Identify:
// // - Job title
// // - Company
// // - Required skills
// // - Preferred skills
// // - Responsibilities
// // - Qualifications
// // `
// //             },

// //             {
// //                 role: "user",

// //                 content: text
// //             }
// //         ],

// //         text: {
// //             format: {
// //                 type: "json_schema",

// //                 name: "job_description",

// //                 strict: true,

// //                 schema: {
// //                     type: "object",

// //                     properties: {

// //                         jobTitle: {
// //                             type: "string"
// //                         },

// //                         company: {
// //                             type: "string"
// //                         },

// //                         requiredSkills: {
// //                             type: "array",
// //                             items: {
// //                                 type: "string"
// //                             }
// //                         },

// //                         preferredSkills: {
// //                             type: "array",
// //                             items: {
// //                                 type: "string"
// //                             }
// //                         },

// //                         responsibilities: {
// //                             type: "array",
// //                             items: {
// //                                 type: "string"
// //                             }
// //                         },

// //                         qualifications: {
// //                             type: "array",
// //                             items: {
// //                                 type: "string"
// //                             }
// //                         }

// //                     },

// //                     required: [
// //                         "jobTitle",
// //                         "company",
// //                         "requiredSkills",
// //                         "preferredSkills",
// //                         "responsibilities",
// //                         "qualifications"
// //                     ],

// //                     additionalProperties: false
// //                 }
// //             }
// //         }
// //     });


// //     console.log("Job description parsed by OpenAI.");

// //     return JSON.parse(response.output_text);
// // }