import ollama from "ollama";

const resumeSchema = {
    type: "object",

    properties: {

        name: {
            type: "string"
        },

        title: {
            type: "string"
        },

        email: {
            type: "string"
        },

        phone: {
            type: "string"
        },

        links: {
            type: "object",

            properties: {
                github: {
                    type: "string"
                },

                linkedin: {
                    type: "string"
                },

                portfolio: {
                    type: "string"
                }
            },

            required: [
                "github",
                "linkedin",
                "portfolio"
            ]
        },

        education: {
            type: "array",

            items: {
                type: "object",

                properties: {

                    degree: {
                        type: "string"
                    },

                    institution: {
                        type: "string"
                    },

                    score: {
                        type: "string"
                    },

                    year: {
                        type: "string"
                    }
                },

                required: [
                    "degree",
                    "institution",
                    "score",
                    "year"
                ]
            }
        },

        skills: {
            type: "object",

            properties: {

                programmingLanguages: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                },

                dataStructuresAlgorithms: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                },

                computerScienceFundamentals: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                },

                backend: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                },

                frontend: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                },

                cloudDevOps: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                },

                databases: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                },

                libraries: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                },

                tools: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                }
            },

            required: [
                "programmingLanguages",
                "dataStructuresAlgorithms",
                "computerScienceFundamentals",
                "backend",
                "frontend",
                "cloudDevOps",
                "databases",
                "libraries",
                "tools"
            ]
        },

        experience: {
            type: "array",

            items: {
                type: "object",

                properties: {

                    role: {
                        type: "string"
                    },

                    company: {
                        type: "string"
                    },

                    duration: {
                        type: "string"
                    },

                    description: {
                        type: "string"
                    }
                },

                required: [
                    "role",
                    "company",
                    "duration",
                    "description"
                ]
            }
        },

        projects: {
    type: "array",

    items: {
        type: "object",

        properties: {

            name: {
                type: "string"
            },

            technologies: {
                type: "array",

                items: {
                    type: "string"
                }
            },

            description: {
                type: "string"
            },

            link: {
                type: "string"
            }
        },

        required: [
            "name",
            "technologies",
            "description",
            "link"
        ]
    }
},

        certifications: {
            type: "array",

            items: {
                type: "string"
            }
        },

        achievements: {
            type: "array",

            items: {
                type: "string"
            }
        },

        leadership: {
            type: "array",

            items: {
                type: "string"
            }
        },

        extracurricular: {
            type: "array",

            items: {
                type: "string"
            }
        }
    },

    required: [
        "name",
        "title",
        "email",
        "phone",
        "links",
        "education",
        "skills",
        "experience",
        "projects",
        "certifications",
        "achievements",
        "leadership",
        "extracurricular"
    ]
};


export async function parseResumeWithAI(
    text: string
) {

    console.log(
        "Sending resume text to Ollama..."
    );

    const response = await ollama.chat({

        model: "llama3.2:3b",

        messages: [

            {
                role: "system",

                content: `
You are an expert resume parser.

Extract information from the resume.

Follow the provided JSON schema exactly.

Do not invent information.

For education:
- degree = degree name
- institution = institution name
- score = CGPA or percentage
- year = academic year

For projects:
- name = project name
- technologies = technologies explicitly mentioned for that project
- description = project description
- link = project link if present, otherwise empty string

Return structured information only.
`
            },

            {
                role: "user",

                content: text
            }

        ],

        format: resumeSchema,

        options: {
            temperature: 0
        }
    });


    console.log(
        "Ollama response received!"
    );


    return JSON.parse(
        response.message.content
    );
}