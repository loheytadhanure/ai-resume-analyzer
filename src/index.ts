import dotenv from "dotenv";

import { extractTextFromPDF }
    from "./parser/pdfParser.ts";

import { parseResumeWithAI }
    from "./parser/aiResumeParser.ts";

import { parseJobDescription }
    from "./parser/aiJDParser.ts";

import { calculateATSScore }
    from "./analyzer/atsScore.ts";

import { matchResumeWithJob }
    from "./analyzer/jobMatcher.ts";


dotenv.config();


async function main() {


    // =====================================
    // STEP 1
    // RESUME PDF → RAW TEXT
    // =====================================

    const resumePath =
        "./uploads/resume.pdf";


    const resumeText =
        await extractTextFromPDF(
            resumePath
        );


    console.log(
        "PDF parsed successfully."
    );


    // =====================================
    // STEP 2
    // RAW TEXT → RESUME JSON
    // Ollama
    // =====================================

    console.log(
        "Sending resume text to Ollama..."
    );


    const resume =
        await parseResumeWithAI(
            resumeText
        );


    console.log(
        "Resume structured successfully."
    );


    // =====================================
    // STEP 3
    // RESUME → ATS SCORE
    // =====================================

    const atsResult =
        calculateATSScore(
            resume
        );


    console.log(
        "\n===== ATS RESULT =====\n"
    );


    console.log(
        JSON.stringify(
            atsResult,
            null,
            2
        )
    );


    // =====================================
    // STEP 4
    // JD PDF → RAW TEXT
    // =====================================

    const jdPath =
        "./uploads/job-description.pdf";


    const jdText =
        await extractTextFromPDF(
            jdPath
        );


    console.log(
        "\nJob description PDF parsed successfully."
    );


    // =====================================
    // STEP 5
    // RAW JD → JD JSON
    // OpenRouter
    // =====================================

    const job =
        await parseJobDescription(
            jdText
        );


    console.log(
        "Job description structured successfully."
    );


    console.log(
        "\n===== JOB DESCRIPTION =====\n"
    );


    console.log(
        JSON.stringify(
            job,
            null,
            2
        )
    );


    // =====================================
    // STEP 6
    // RESUME + JD → JOB MATCH
    // =====================================

    const matchResult =
        matchResumeWithJob(
            resume,
            job
        );


    console.log(
        "\n===== JOB MATCH =====\n"
    );


    console.log(
        JSON.stringify(
            matchResult,
            null,
            2
        )
    );

}


main().catch(
    (error) => {

        console.error(
            "\nApplication failed:\n"
        );

        console.error(
            error
        );

    }
);


// import dotenv from "dotenv";

// import { extractTextFromPDF } from "./parser/pdfParser.ts";
// import { parseResumeWithAI } from "./parser/aiResumeParser.ts";
// import { parseJobDescription } from "./parser/aiJDParser.ts";
// import { calculateATSScore } from "./analyzer/atsScore.ts";
// import { matchResumeWithJob } from "./analyzer/jobMatcher.ts";

// dotenv.config();

// async function main() {

//     // =====================================
//     // STEP 1: RESUME PDF → RAW TEXT
//     // =====================================

//     const resumePath = "./uploads/resume.pdf";

//     const resumeText =
//         await extractTextFromPDF(resumePath);

//     console.log("PDF parsed successfully.");


//     // =====================================
//     // STEP 2: RAW TEXT → RESUME JSON
//     // Ollama + Llama 3.2
//     // =====================================

//     console.log(
//         "Sending resume text to Ollama..."
//     );

//     const resume =
//         await parseResumeWithAI(resumeText);

//     console.log(
//         "Ollama response received!"
//     );

//     console.log(
//         "Resume structured successfully."
//     );


//     // =====================================
//     // STEP 3: RESUME JSON → ATS SCORE
//     // =====================================

//     const atsResult =
//         calculateATSScore(resume);

//     console.log(
//         "\n===== ATS RESULT =====\n"
//     );

//     console.log(
//         JSON.stringify(
//             atsResult,
//             null,
//             2
//         )
//     );


//     // =====================================
//     // STEP 4: JOB DESCRIPTION PDF → RAW TEXT
//     // =====================================

//     const jdPath =
//         "./uploads/job-description.pdf";

//     const jdText =
//         await extractTextFromPDF(jdPath);

//     console.log(
//         "\nJob description PDF parsed successfully."
//     );


//     // =====================================
//     // STEP 5: RAW JD TEXT → JD JSON
//     // OpenRouter
//     // =====================================

//     console.log(
//         "Sending job description to OpenRouter..."
//     );

//     const job =
//         await parseJobDescription(jdText);

//     console.log(
//         "OpenRouter response received!"
//     );

//     console.log(
//         "Job description structured successfully."
//     );


//     console.log(
//         "\n===== JOB DESCRIPTION =====\n"
//     );

//     console.log(
//         JSON.stringify(
//             job,
//             null,
//             2
//         )
//     );


//     // =====================================
//     // STEP 6: RESUME JSON + JD JSON
//     // → JOB MATCH
//     // =====================================

//     const matchResult =
//         matchResumeWithJob(
//             resume,
//             job
//         );

//     console.log(
//         "\n===== JOB MATCH =====\n"
//     );

//     console.log(
//         JSON.stringify(
//             matchResult,
//             null,
//             2
//         )
//     );
// }


// // =====================================
// // START APPLICATION
// // =====================================

// main().catch((error) => {

//     console.error(
//         "\n❌ Application failed:\n"
//     );

//     console.error(error);

// });