
const skillAliases: Record<string, string> = {

    // =========================
    // PROGRAMMING
    // =========================

    "java": "java",
    "python": "python",
    "javascript": "javascript",
    "js": "javascript",
    "c++": "c++",

    "programming":
        "programming",


    // =========================
    // DSA
    // =========================

    "dsa":
        "data structures and algorithms",

    "data structures":
        "data structures",

    "data structure":
        "data structures",

    "algorithms":
        "algorithms",

    "algorithm":
        "algorithms",

    "data structures & algorithms":
        "data structures and algorithms",

    "data structures and algorithms":
        "data structures and algorithms",


    // =========================
    // JAVASCRIPT
    // =========================

    "node":
        "node.js",

    "nodejs":
        "node.js",

    "node js":
        "node.js",

    "react":
        "react.js",

    "reactjs":
        "react.js",

    "react js":
        "react.js",

    "next":
        "next.js",

    "nextjs":
        "next.js",

    "express":
        "express.js",

    "expressjs":
        "express.js",


    // =========================
    // DATABASE
    // =========================

    "postgres":
        "postgresql",

    "postgres db":
        "postgresql",

    "mongo":
        "mongodb",


    // =========================
    // DEVOPS
    // =========================

    "k8s":
        "kubernetes",
    "kubernetes":
        "kubernetes",    


    // =========================
    // AI
    // =========================

    "artificial intelligence":
        "ai",

    "artificial intelligence (ai)":
        "ai",

    "ai":
        "ai",

    "ml":
        "machine learning",

    "machine learning":
        "machine learning",

    "AIML":
        "machine learning",
    "ML":
        "machine learning",        


    // =========================
    // AI TOOLS
    // =========================

    "github co-pilot":
        "github copilot",

    "github copilot":
        "github copilot",

    "cursor ai":
        "cursor",

    "cursor":
        "cursor",

    "claude code":
        "claude code"
};


export function normalizeSkill(
    skill: string
): string {

    const normalized =
        skill
            .toLowerCase()
            .trim()
            .replace(/\s+/g, " ");


    return (
        skillAliases[normalized] ||
        normalized
    );
}

