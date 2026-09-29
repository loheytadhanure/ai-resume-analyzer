import {
    matchSkill
} from "./skillMatcher.js";


export interface JobMatchResult {

    matchScore: number;

    requiredSkillScore: number;

    preferredSkillScore: number;

    matchedSkills: string[];

    missingSkills: string[];

    preferredMatches: string[];

    skillAnalysis: any[];

    recommendations: string[];

}


export function matchResumeWithJob(
    resume: any,
    job: any
): JobMatchResult {


    // ==========================================
    // REQUIRED SKILLS
    // ==========================================

    const requiredSkills =
        Array.isArray(
            job.requiredSkills
        )
            ? job.requiredSkills
            : [];


    // ==========================================
    // PREFERRED SKILLS
    // ==========================================

    const preferredSkills =
        Array.isArray(
            job.preferredSkills
        )
            ? job.preferredSkills
            : [];


    // ==========================================
    // MATCH REQUIRED SKILLS
    // ==========================================

    const requiredAnalysis =
        requiredSkills.map(
            (skill: string) =>
                matchSkill(
                    skill,
                    resume
                )
        );


    // ==========================================
    // MATCH PREFERRED SKILLS
    // ==========================================

    const preferredAnalysis =
        preferredSkills.map(
            (skill: string) =>
                matchSkill(
                    skill,
                    resume
                )
        );


    // ==========================================
    // FILTER MATCHED
    // ==========================================

    const matchedSkills =
        requiredAnalysis
            .filter(
                result =>
                    result.matched
            )
            .map(
                result =>
                    result.skill
            );


    // ==========================================
    // FILTER MISSING
    // ==========================================

    const missingSkills =
        requiredAnalysis
            .filter(
                result =>
                    !result.matched
            )
            .map(
                result =>
                    result.skill
            );


    // ==========================================
    // PREFERRED MATCHES
    // ==========================================

    const preferredMatches =
        preferredAnalysis
            .filter(
                result =>
                    result.matched
            )
            .map(
                result =>
                    result.skill
            );


    // ==========================================
    // REQUIRED SCORE
    // ==========================================

    let requiredSkillScore = 0;


    if (
        requiredAnalysis.length > 0
    ) {

        const totalConfidence =
            requiredAnalysis.reduce(
                (
                    total,
                    result
                ) =>
                    total +
                    result.confidence,
                0
            );


        requiredSkillScore =
            Math.round(
                (
                    totalConfidence /
                    requiredAnalysis.length
                ) * 100
            );

    }


    // ==========================================
    // PREFERRED SCORE
    // ==========================================

    let preferredSkillScore = 0;


    if (
        preferredAnalysis.length > 0
    ) {

        const totalConfidence =
            preferredAnalysis.reduce(
                (
                    total,
                    result
                ) =>
                    total +
                    result.confidence,
                0
            );


        preferredSkillScore =
            Math.round(
                (
                    totalConfidence /
                    preferredAnalysis.length
                ) * 100
            );

    }


    // ==========================================
    // FINAL SCORE
    // ==========================================

    const matchScore =
        Math.round(

            (
                requiredSkillScore *
                0.8
            )

            +

            (
                preferredSkillScore *
                0.2
            )

        );


    // ==========================================
    // RECOMMENDATIONS
    // ==========================================

    const recommendations =
        missingSkills.map(
            skill =>
                `If you have experience with ${skill}, consider highlighting it in your resume.`
        );


    // ==========================================
    // RETURN RESULT
    // ==========================================

    return {

        matchScore,

        requiredSkillScore,

        preferredSkillScore,

        matchedSkills,

        missingSkills,

        preferredMatches,

        skillAnalysis:
            [
                ...requiredAnalysis,
                ...preferredAnalysis
            ],

        recommendations

    };

}