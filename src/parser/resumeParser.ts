export interface Resume {
    name: string;
    email: string;
    phone: string;
    location: string;

    education: Education[];

    skills: string[];

    projects: Project[];

    experience: Experience[];
}

export interface Education {
    degree: string;
    institution: string;
    cgpa?: string;
    year?: string;
}

export interface Project {
    name: string;
    description: string;
    technologies: string[];
}

export interface Experience {
    company: string;
    role: string;
    description: string;
}
export function parseResume(text: string): Resume {

    const resume: Resume = {
        name: "",
        email: "",
        phone: "",
        location: "",

        education: [],

        skills: [],

        projects: [],

        experience: []
    };

    // Extract email
    const emailMatch = text.match(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    );

    if (emailMatch) {
        resume.email = emailMatch[0];
    }

    // Extract phone number
    const phoneMatch = text.match(
        /(?:\+91[\s-]?)?[6-9]\d{9}/
    );

    if (phoneMatch) {
        resume.phone = phoneMatch[0];
    }

    // First line is usually the candidate's name
    const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);

    if (lines.length > 0) {
        resume.name = lines[0];
    }

    return resume;
}