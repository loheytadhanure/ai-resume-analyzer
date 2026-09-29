import { normalizeSkill } from "./skillNormalizer.js";
import { collectResumeEvidence } from "./resumeEvidence.js";
import type { ResumeEvidence } from "./resumeEvidence.js";


// =====================================================
// SKILL MATCH RESULT
// =====================================================

export interface SkillMatch {

    skill: string;

    matched: boolean;

    confidence: number;

    evidence: ResumeEvidence[];

    matchType: "direct" | "indirect" | "none";
}


// =====================================================
// WHOLE-WORD MATCHING
// =====================================================
//
// Prevents false positives such as:
//
// Java       → JavaScript ❌
// AI         → Tailwind CSS ❌
//
// But allows:
//
// Java       → Java ✅
// AI         → Artificial Intelligence / AI system ✅
// Data Structures → Data Structures and Algorithms ✅
// =====================================================

function containsWholeWord(
    text: string,
    skill: string
): boolean {

    const escapedSkill =
        skill.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

    const regex =
        new RegExp(
            `\\b${escapedSkill}\\b`,
            "i"
        );

    return regex.test(text);
}


// =====================================================
// EVIDENCE CONFIDENCE
// =====================================================
//
// Different resume sections provide different levels
// of evidence.
//
// Skills / Project technologies = strongest
// Project / Experience descriptions = strong
// Certifications / Achievements = supporting evidence
// =====================================================

function getEvidenceConfidence(
    evidence: ResumeEvidence
): number {

    switch (evidence.section) {

        case "Skills":
            return 1.0;

        case "Projects":
            return 0.95;

        case "Experience":
            return 0.95;

        case "Certifications":
            return 0.80;

        case "Achievements":
            return 0.85;

        case "Leadership":
            return 0.80;

        default:
            return 0.70;
    }
}


// =====================================================
// MAIN SKILL MATCHING FUNCTION
// =====================================================

export function matchSkill(
    jdSkill: string,
    resume: any
): SkillMatch {

    // -------------------------------------------------
    // STEP 1
    // Normalize JD skill
    // -------------------------------------------------

    const normalizedJD =
        normalizeSkill(jdSkill);


    // -------------------------------------------------
    // STEP 2
    // Collect resume evidence
    // -------------------------------------------------

    const evidence =
        collectResumeEvidence(resume);


    // =================================================
    // STEP 3
    // DIRECT / WHOLE-WORD MATCH
    // =================================================
    //
    // Example:
    //
    // JD:
    // Java
    //
    // Resume:
    // Java        → MATCH
    // JavaScript  → NOT MATCH
    //
    // =================================================

    const directMatches =
        evidence.filter(item => {

            const text =
                item.text
                    .toLowerCase()
                    .trim();

            return containsWholeWord(
                text,
                normalizedJD
            );
        });


    if (directMatches.length > 0) {

        const confidence =
            Math.max(
                ...directMatches.map(
                    getEvidenceConfidence
                )
            );


        return {

            skill: jdSkill,

            matched: true,

            confidence,

            evidence: directMatches,

            matchType: "direct"
        };
    }


    // =================================================
    // STEP 4
    // DATA STRUCTURES
    // =================================================
    //
    // "Data Structures" may not literally appear.
    //
    // Example:
    //
    // "Solved 300+ DSA problems on LeetCode"
    //
    // This is indirect evidence.
    // =================================================

    if (
        normalizedJD === "data structures" ||
        normalizedJD ===
            "data structures and algorithms"
    ) {

        const matches =
            evidence.filter(item => {

                const text =
                    item.text.toLowerCase();

                return (

                    containsWholeWord(
                        text,
                        "data structures"
                    )

                    ||

                    containsWholeWord(
                        text,
                        "dsa"
                    )

                    ||

                    containsWholeWord(
                        text,
                        "leetcode"
                    )
                );
            });


        if (matches.length > 0) {

            return {

                skill: jdSkill,

                matched: true,

                confidence: 0.95,

                evidence: matches,

                matchType: "indirect"
            };
        }
    }


    // =================================================
    // STEP 5
    // ALGORITHMS
    // =================================================

    if (
        normalizedJD === "algorithms"
    ) {

        const matches =
            evidence.filter(item => {

                const text =
                    item.text.toLowerCase();

                return (

                    containsWholeWord(
                        text,
                        "algorithm"
                    )

                    ||

                    containsWholeWord(
                        text,
                        "algorithms"
                    )

                    ||

                    containsWholeWord(
                        text,
                        "dsa"
                    )

                    ||

                    containsWholeWord(
                        text,
                        "leetcode"
                    )

                    ||

                    containsWholeWord(
                        text,
                        "competitive programming"
                    )
                );
            });


        if (matches.length > 0) {

            return {

                skill: jdSkill,

                matched: true,

                confidence: 0.95,

                evidence: matches,

                matchType: "indirect"
            };
        }
    }


    // =================================================
    // STEP 6
    // PROGRAMMING
    // =================================================
    //
    // If the resume contains programming languages,
    // we can consider "Programming" satisfied.
    //
    // Example:
    //
    // Java
    // Python
    // C++
    //
    // → Programming
    // =================================================

    if (
        normalizedJD === "programming"
    ) {

        const programmingLanguages = [

            "java",

            "python",

            "javascript",

            "c++",

            "c#",

            "go",

            "typescript",

            "ruby",

            "kotlin",

            "swift"
        ];


        const matches =
            evidence.filter(item => {

                const text =
                    item.text.toLowerCase();

                return programmingLanguages.some(
                    language =>
                        containsWholeWord(
                            text,
                            language
                        )
                );
            });


        if (matches.length > 0) {

            return {

                skill: jdSkill,

                matched: true,

                confidence: 0.95,

                evidence: matches,

                matchType: "indirect"
            };
        }
    }


    // =================================================
    // STEP 7
    // ARTIFICIAL INTELLIGENCE
    // =================================================
    //
    // AI is a concept rather than just one technology.
    //
    // Therefore evidence such as:
    //
    // AI
    // LLM
    // Machine Learning
    // Multi-Agent Systems
    //
    // can support an AI match.
    //
    // IMPORTANT:
    //
    // We use whole-word matching here.
    //
    // Therefore:
    //
    // "AI" inside "Tailwind" ❌
    //
    // will NOT be considered a match.
    // =================================================

    if (
        normalizedJD === "ai"
    ) {

        const aiKeywords = [

            "ai",

            "artificial intelligence",

            "machine learning",

            "llm",

            "llms",

            "large language model",

            "multi-agent",

            "multi agent",

            "generative ai",

            "ai system",

            "ai-powered",

            "ai powered",

            "ai tools",

            "deep learning",

            "natural language processing",

            "nlp"
        ];


        const matches =
            evidence.filter(item => {

                const text =
                    item.text.toLowerCase();

                return aiKeywords.some(
                    keyword =>
                        containsWholeWord(
                            text,
                            keyword
                        )
                );
            });


        if (matches.length > 0) {

            return {

                skill: jdSkill,

                matched: true,

                confidence: 0.98,

                evidence: matches,

                matchType: "indirect"
            };
        }
    }


    // =================================================
    // STEP 8
    // MACHINE LEARNING
    // =================================================

    if (
        normalizedJD ===
        "machine learning"
    ) {

        const matches =
            evidence.filter(item => {

                const text =
                    item.text.toLowerCase();

                return (

                    containsWholeWord(
                        text,
                        "machine learning"
                    )

                    ||

                    containsWholeWord(
                        text,
                        "ml"
                    )

                    ||

                    containsWholeWord(
                        text,
                        "scikit-learn"
                    )

                    ||

                    containsWholeWord(
                        text,
                        "sklearn"
                    )
                );
            });


        if (matches.length > 0) {

            return {

                skill: jdSkill,

                matched: true,

                confidence: 0.95,

                evidence: matches,

                matchType: "indirect"
            };
        }
    }

// =================================================
// AUTOMATION
// =================================================

if (
    normalizedJD === "automation"
) {

    const matches =
        evidence.filter(item => {

            const text =
                item.text.toLowerCase();

            return (
                containsWholeWord(
                    text,
                    "automation"
                )

                ||

                containsWholeWord(
                    text,
                    "automating"
                )

                ||

                containsWholeWord(
                    text,
                    "automated"
                )

                ||

                containsWholeWord(
                    text,
                    "automate"
                )

                ||

                containsWholeWord(
                    text,
                    "automation system"
                )
            );
        });


    if (matches.length > 0) {

        return {

            skill: jdSkill,

            matched: true,

            confidence: 0.90,

            evidence: matches,

            matchType: "indirect"
        };
    }
}
    // =================================================
    // STEP 9
    // GITHUB COPILOT
    // =================================================

    if (
        normalizedJD ===
        "github copilot"
    ) {

        const matches =
            evidence.filter(item => {

                const text =
                    item.text.toLowerCase();

                return (

                    containsWholeWord(
                        text,
                        "github copilot"
                    )

                    ||

                    containsWholeWord(
                        text,
                        "github co-pilot"
                    )
                );
            });


        if (matches.length > 0) {

            return {

                skill: jdSkill,

                matched: true,

                confidence: 1.0,

                evidence: matches,

                matchType: "direct"
            };
        }
    }


    // =================================================
    // STEP 10
    // CURSOR
    // =================================================

    if (
        normalizedJD ===
        "cursor"
    ) {

        const matches =
            evidence.filter(item => {

                const text =
                    item.text.toLowerCase();

                return containsWholeWord(
                    text,
                    "cursor"
                );
            });


        if (matches.length > 0) {

            return {

                skill: jdSkill,

                matched: true,

                confidence: 1.0,

                evidence: matches,

                matchType: "direct"
            };
        }
    }


    // =================================================
    // STEP 11
    // CLAUDE CODE
    // =================================================

    if (
        normalizedJD ===
        "claude code"
    ) {

        const matches =
            evidence.filter(item => {

                const text =
                    item.text.toLowerCase();

                return containsWholeWord(
                    text,
                    "claude code"
                );
            });


        if (matches.length > 0) {

            return {

                skill: jdSkill,

                matched: true,

                confidence: 1.0,

                evidence: matches,

                matchType: "direct"
            };
        }
    }


    // =================================================
    // STEP 12
    // NO MATCH
    // =================================================

    return {

        skill: jdSkill,

        matched: false,

        confidence: 0,

        evidence: [],

        matchType: "none"
    };
}