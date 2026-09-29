# Resume Analyzer MCP

An AI-powered Resume Analyzer that extracts structured information from resumes, evaluates ATS compatibility, parses job descriptions, and performs evidence-based resume-to-job matching.

The project combines LLM-based document understanding with deterministic analysis techniques to make the matching process explainable and transparent.

---

## 🚀 Features

### Resume Analysis
- Extracts text from PDF resumes
- Uses Llama 3 locally to convert unstructured resume text into structured JSON
- Identifies:
  - Personal information
  - Education
  - Skills
  - Projects
  - Experience
  - Certifications
  - Achievements
  - Leadership

### ATS Scoring
Calculates an ATS-style score based on resume sections:

- Contact Information
- Education
- Skills
- Experience
- Projects
- Achievements

### Job Description Analysis
- Extracts text from job-description PDFs
- Uses OpenRouter to structure job descriptions
- Extracts:
  - Job title
  - Company
  - Required skills
  - Preferred skills
  - Soft skills
  - Responsibilities
  - Qualifications

### Skill Matching
The system currently supports:

- Atomic skill extraction
- Skill normalization
- Exact skill matching
- Whole-word matching
- Evidence-based matching
- Indirect skill inference
- Confidence scores
- Match explanations

Example:

```text
JD Requirement:
Data Structures

Resume Evidence:
300+ DSA problems solved on LeetCode

Result:
Matched
Confidence: 0.95
Match Type: Indirect
Explainable Matching

Instead of only returning:

Python → Matched

the system provides evidence:

Python
├── Skills → Python
├── Projects → DevForge → Python
└── Projects → Ecolens → Python

This makes the matching process easier to understand and debug.

🏗️ Architecture
                    ┌────────────────────┐
                    │    Resume PDF      │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │   PDF Extraction   │
                    │    pdf-parse       │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │      Llama 3       │
                    │  Resume Parsing    │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │ Structured Resume  │
                    │       JSON         │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │  Evidence Builder  │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │ Skill Normalizer   │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │  Skill Matcher     │
                    └─────────┬──────────┘
                              │
                              │
      ┌───────────────────────┘
      │
      ▼
┌────────────────────┐
│   Job Description  │
│        PDF         │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│     PDF Parser     │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│     OpenRouter     │
│    JD Parsing      │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│   Structured JD    │
│       JSON         │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│   Job Matcher      │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│   Match Analysis   │
│  Score + Evidence  │
└────────────────────┘
📂 Project Structure
resume-analyzer-mcp/
│
├── src/
│   │
│   ├── analyzer/
│   │   ├── atsScore.ts
│   │   ├── jobMatcher.ts
│   │   ├── skillMatcher.ts
│   │   ├── skillNormalizer.ts
│   │   └── resumeEvidence.ts
│   │
│   ├── parser/
│   │   ├── pdfParser.ts
│   │   ├── aiResumeParser.ts
│   │   └── aiJDParser.ts
│   │
│   └── index.ts
│
├── uploads/
│   ├── resume.pdf
│   └── job-description.pdf
│
├── .env
├── package.json
├── tsconfig.json
└── README.md
🛠️ Tech Stack
Language
TypeScript
Node.js
AI / LLM
Llama 3 via Ollama
OpenRouter
Document Processing
pdf-parse
Development
npm
tsx
dotenv
🔄 Current Workflow
1. Resume Processing
Resume PDF
    ↓
Extract raw text
    ↓
Send text to Llama 3
    ↓
Generate structured JSON

The LLM is responsible for understanding the unstructured resume and organizing it into predefined sections.

2. ATS Analysis

The structured resume is passed to a deterministic ATS scoring function.

Resume JSON
    ↓
ATS Analyzer
    ↓
Section-wise scoring
    ↓
Final ATS Score

Example:

{
  "score": 95,
  "breakdown": {
    "contactInformation": 10,
    "education": 10,
    "skills": 25,
    "experience": 20,
    "projects": 20,
    "achievements": 10
  }
}
3. Job Description Processing
Job Description PDF
        ↓
PDF Text Extraction
        ↓
OpenRouter
        ↓
Structured JD JSON

Example:

{
  "jobTitle": "Trainee Software Engineer",
  "requiredSkills": [
    "Java",
    "Python",
    "Programming",
    "Data Structures",
    "Algorithms",
    "AI"
  ],
  "preferredSkills": [
    "AI",
    "ML",
    "Automation"
  ]
}
🧠 Skill Matching Pipeline

The current matching system follows:

JD Skill
   ↓
Atomic Skill Extraction
   ↓
Skill Normalization
   ↓
Resume Evidence Collection
   ↓
Exact / Whole-word Matching
   ↓
Indirect Evidence Rules
   ↓
Confidence Score
Skill Normalization

Different representations of the same skill are normalized.

Examples:

React
ReactJS
React.js

        ↓

react.js
Node
NodeJS
Node.js

        ↓

node.js
🔎 Evidence-Based Matching

The matcher does not only look at the resume's skills section.

It searches evidence across:

Skills
Projects
Experience
Certifications
Achievements
Leadership

For example:

JD:
AI

Resume:
DevForge:
"Built a 37-agent AI system automating the end-to-end SDLC."

Result:
Matched
Confidence: 0.95
Evidence:
Projects → DevForge
🎯 False-Positive Handling

The matcher uses whole-word matching to avoid incorrect substring matches.

For example:

Java

should match:

Java

but not:

JavaScript

Similarly:

AI

should not match:

Tailwind CSS

The matcher also distinguishes between:

Direct Match

and:

Indirect Match

Example:

Python → Direct
Data Structures → Indirect
📊 Example Output

Current system output contains:

{
  "matchScore": 65,
  "requiredSkillScore": 65,
  "preferredSkillScore": 63,
  "matchedSkills": [
    "Java",
    "Python",
    "Programming",
    "Data Structures",
    "Algorithms",
    "AI"
  ],
  "missingSkills": [
    "GitHub Copilot",
    "Claude Code",
    "Cursor"
  ],
  "preferredMatches": [
    "AI",
    "ML"
  ]
}

The system also returns detailed evidence for every matched skill.

🚧 Planned Features

The current implementation is rule-based for matching. The following improvements are planned.

1. Semantic Matching with Embeddings

Currently, the system relies heavily on exact matches, normalization, and manually defined evidence rules.

The next major improvement is semantic matching using embeddings.

Planned pipeline:

JD Skill
    ↓
Embedding Model
    ↓
Vector

Resume Evidence
    ↓
Embedding Model
    ↓
Vector

        ↓

Cosine Similarity
        ↓
Semantic Match

This will allow the system to recognize relationships such as:

Machine Learning
        ↕
Predictive Modeling

Automation
        ↕
Automating software workflows

Cloud Computing
        ↕
AWS / GCP / Azure

without manually creating a rule for every variation.

2. Hybrid Matching

The planned matching architecture is:

             JD Skill
                 │
        ┌────────┴────────┐
        ↓                 ↓
 Exact Matching     Semantic Matching
        │                 │
        ↓                 ↓
   Normalization       Embeddings
        │                 │
        └────────┬────────┘
                 ↓
          Final Match

This combines deterministic matching with semantic similarity.

3. Improved Match Scoring

The current score primarily uses required and preferred skill coverage.

Future versions will consider:

Required skill coverage
Preferred skill coverage
Semantic similarity
Evidence strength
Experience relevance
Project relevance
Skill confidence
4. AI-Powered Resume Recommendations

Future versions can generate recommendations such as:

Missing Skill:
GitHub Copilot

Recommendation:
Highlight relevant AI-assisted development experience
if you have actually used the tool.

Recommendations will be based on the detected gaps between the resume and job description.

5. MCP Server

The project is intended to evolve into an MCP-based Resume Analysis system.

Planned MCP tools could include:

analyze_resume
calculate_ats_score
parse_job_description
match_resume_to_job
get_skill_evidence
get_resume_recommendations

This would allow external AI agents or MCP-compatible clients to interact with the Resume Analyzer through structured tools.

6. Dashboard / UI

A future frontend can provide:

┌──────────────────────────────────┐
│        Resume Analyzer           │
├──────────────────────────────────┤
│ ATS Score             95 / 100   │
│ Job Match             65 / 100   │
├──────────────────────────────────┤
│ Required Skills                  │
│ ✓ Java                            │
│ ✓ Python                          │
│ ✓ Data Structures                 │
│ ✓ Algorithms                      │
│ ✓ AI                              │
│ ✗ GitHub Copilot                  │
│ ✗ Claude Code                     │
│ ✗ Cursor                          │
├──────────────────────────────────┤
│ Skill Evidence                   │
│                                  │
│ AI → DevForge                    │
│ ML → Scikit-learn                │
└──────────────────────────────────┘
🔐 Environment Variables

Create a .env file:

OPENROUTER_API_KEY=your_openrouter_api_key

Ollama runs locally and does not require an API key.

▶️ Running the Project
Install dependencies
npm install
Start Ollama

Make sure Ollama is installed and the required model is available:

ollama list

For example:

llama3:latest
Add input files

Place the files inside:

uploads/
uploads/
├── resume.pdf
└── job-description.pdf
Run
npm run dev
⚠️ Current Limitations
Matching is currently primarily rule-based.
Semantic similarity is not implemented yet.
Skill aliases are maintained manually.
Evidence inference uses predefined rules.
Resume and JD schemas depend on LLM output quality.
The project currently runs as a local CLI application.
MCP server integration is planned but not yet implemented.
UI/dashboard is planned but not yet implemented.
🗺️ Development Roadmap
PDF Extraction
      ✅
      ↓
AI Resume Parsing
      ✅
      ↓
ATS Scoring
      ✅
      ↓
AI Job Description Parsing
      ✅
      ↓
Atomic Skill Extraction
      ✅
      ↓
Skill Normalization
      ✅
      ↓
Evidence Collection
      ✅
      ↓
Evidence-Based Matching
      ✅
      ↓
False-Positive Handling
      ✅
      ↓
Semantic Matching / Embeddings
      🔄
      ↓
Hybrid Matching
      🔜
      ↓
Improved Match Scoring
      🔜
      ↓
AI Resume Recommendations
      🔜
      ↓
MCP Server
      🔜
      ↓
Dashboard / UI
      🔜
📌 Project Status

Current Status: Active Development

The core resume parsing, ATS analysis, job-description parsing, skill normalization, evidence collection, and rule-based job matching pipeline are implemented.

Semantic matching, hybrid scoring, recommendations, MCP tools, and the user interface are planned for future iterations.

👨‍💻 Author

Loheyta Dhanure

B.E. Electronics & Telecommunication
AIML Honors
