export interface ATSResult {
    score: number;

    breakdown: {
        contactInformation: number;
        education: number;
        skills: number;
        experience: number;
        projects: number;
        achievements: number;
    };

    strengths: string[];

    improvements: string[];
}


export function calculateATSScore(resume: any): ATSResult {

    let contactInformation = 0;
    let education = 0;
    let skills = 0;
    let experience = 0;
    let projects = 0;
    let achievements = 0;


    const strengths: string[] = [];
    const improvements: string[] = [];


    // -------------------------
    // CONTACT INFORMATION
    // -------------------------

    if (resume.name) {
        contactInformation += 3;
    }

    if (resume.email) {
        contactInformation += 3;
    }

    if (resume.phone) {
        contactInformation += 2;
    }

    if (
        resume.links?.github ||
        resume.links?.linkedin
    ) {
        contactInformation += 2;
    }


    // -------------------------
    // EDUCATION
    // -------------------------

    if (resume.education?.length > 0) {

        education += 10;

        const hasScore = resume.education.some(
            (edu: any) =>
                edu.cgpa ||
                edu.percentage ||
                edu["cgpa/percentage"]
        );

        if (hasScore) {
            education += 5;
        }

        strengths.push(
            "Education section contains relevant academic information."
        );

    } else {

        improvements.push(
            "Add an education section with degree, institution and academic score."
        );
    }


    // -------------------------
    // SKILLS
    // -------------------------

    const skillCategories = resume.skills
        ? Object.values(resume.skills)
        : [];

    const totalSkills = skillCategories.reduce(
        (total: number, category: any) =>
            total + (Array.isArray(category) ? category.length : 0),
        0
    );


    if (totalSkills >= 15) {

        skills = 25;

        strengths.push(
            "Strong technical skills section with a wide range of technologies."
        );

    } else if (totalSkills >= 10) {

        skills = 20;

    } else if (totalSkills >= 5) {

        skills = 15;

    } else {

        skills = 5;

        improvements.push(
            "Add more relevant technical skills."
        );
    }


    // -------------------------
    // EXPERIENCE
    // -------------------------

    if (resume.experience?.length > 0) {

        experience += 15;

        const hasDescription =
            resume.experience.some(
                (exp: any) =>
                    exp.description &&
                    exp.description.length > 50
            );

        if (hasDescription) {
            experience += 5;
        }

        strengths.push(
            "Resume contains professional experience."
        );

    } else {

        improvements.push(
            "Add relevant internship or professional experience."
        );
    }


    // -------------------------
    // PROJECTS
    // -------------------------

    if (resume.projects?.length >= 2) {

        projects += 15;

        const projectsWithDescription =
            resume.projects.filter(
                (project: any) =>
                    project.description &&
                    project.description.length > 50
            );

        if (projectsWithDescription.length >= 2) {
            projects += 5;
        }

        strengths.push(
            "Strong project portfolio demonstrating practical experience."
        );

    } else if (resume.projects?.length === 1) {

        projects = 10;

        improvements.push(
            "Consider adding more relevant projects."
        );

    } else {

        improvements.push(
            "Add projects demonstrating practical technical skills."
        );
    }


    // -------------------------
    // ACHIEVEMENTS
    // -------------------------

    const certifications =
        resume.certifications?.length || 0;

    const achievementsCount =
        resume.achievements?.length || 0;

    if (
        certifications >= 2 ||
        achievementsCount >= 2
    ) {

        achievements = 10;

        strengths.push(
            "Good certifications and achievements."
        );

    } else if (
        certifications >= 1 ||
        achievementsCount >= 1
    ) {

        achievements = 6;

    } else {

        achievements = 2;

        improvements.push(
            "Consider adding relevant certifications or achievements."
        );
    }


    // -------------------------
    // TOTAL SCORE
    // -------------------------

    const score =
        contactInformation +
        education +
        skills +
        experience +
        projects +
        achievements;


    return {

        score,

        breakdown: {
            contactInformation,
            education,
            skills,
            experience,
            projects,
            achievements
        },

        strengths,

        improvements
    };
}