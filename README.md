# Resume Analyzer MCP

This project sets up a Model Context Protocol (MCP) server for analyzing uploaded resumes.

## Project structure

```text
resume-analyzer-mcp/
├── src/
│   ├── index.ts
│   ├── parser/
│   ├── analyzer/
│   ├── prompts/
│   ├── tools/
│   ├── utils/
│   └── mcp/
├── uploads/
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Add your OpenAI API key to `.env`.
3. Run in development mode:
   ```bash
   npm run dev
   ```
4. Build the project:
   ```bash
   npm run build
   ```

## Notes

- `uploads/` is used for incoming PDF resumes.
- `src/index.ts` is the MCP server entrypoint.
- Additional parser, analyzer, tool, prompt, utility, and MCP components can be added under `src/` as the project grows.
