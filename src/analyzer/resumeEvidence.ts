export interface ResumeEvidence {
    section: string;
    title?: string;
    text: string;
}


/**
 * Converts the structured resume JSON
 * into searchable evidence items.
 */
export function collectResumeEvidence(
    resume: any
): ResumeEvidence[] {

    const evidence: ResumeEvidence[] = [];


    // ==========================================
    // SKILLS
    // ==========================================

    if (resume.skills) {

        for (
            const [category, skills] of Object.entries(
                resume.skills
            )
        ) {

            if (Array.isArray(skills)) {

                for (const skill of skills) {

                    evidence.push({
                        section: "Skills",
                        title: category,
                        text: String(skill)
                    });

                }

            }

        }

    }


    // ==========================================
    // EXPERIENCE
    // ==========================================

    if (
        Array.isArray(resume.experience)
    ) {

        for (const experience of resume.experience) {

            const title =
                experience.title ||
                experience.role ||
                experience.company ||
                "Experience";

            const description =
                experience.description || "";


            if (description) {

                evidence.push({
                    section: "Experience",
                    title,
                    text: description
                });

            }

        }

    }


    // ==========================================
    // PROJECTS
    // ==========================================

    if (
        Array.isArray(resume.projects)
    ) {

        for (const project of resume.projects) {

            const title =
                project.name ||
                project.title ||
                "Project";


            // Project technologies

            if (
                Array.isArray(project.technologies)
            ) {

                for (
                    const technology of project.technologies
                ) {

                    evidence.push({

                        section: "Projects",

                        title,

                        text: String(technology)

                    });

                }

            }


            // Project description

            if (
                project.description
            ) {

                evidence.push({

                    section: "Projects",

                    title,

                    text:
                        String(
                            project.description
                        )

                });

            }

        }

    }


    // ==========================================
    // CERTIFICATIONS
    // ==========================================

    if (
        Array.isArray(resume.certifications)
    ) {

        for (
            const certification of resume.certifications
        ) {

            const text =
                typeof certification === "string"
                    ? certification
                    : certification.title ||
                      certification.name ||
                      "";


            if (text) {

                evidence.push({

                    section: "Certifications",

                    text: String(text)

                });

            }

        }

    }


    // ==========================================
    // ACHIEVEMENTS
    // ==========================================

    if (
        Array.isArray(resume.achievements)
    ) {

        for (
            const achievement of resume.achievements
        ) {

            const text =
                typeof achievement === "string"
                    ? achievement
                    : achievement.title ||
                      achievement.name ||
                      "";


            if (text) {

                evidence.push({

                    section: "Achievements",

                    text: String(text)

                });

            }

        }

    }


    // ==========================================
    // LEADERSHIP
    // ==========================================

    if (
        Array.isArray(resume.leadership)
    ) {

        for (
            const leadership of resume.leadership
        ) {

            const text =
                typeof leadership === "string"
                    ? leadership
                    : leadership.title ||
                      leadership.name ||
                      "";


            if (text) {

                evidence.push({

                    section: "Leadership",

                    text: String(text)

                });

            }

        }

    }


    // ==========================================
    // RETURN
    // ==========================================

    return evidence;
}