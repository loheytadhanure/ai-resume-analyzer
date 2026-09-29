import fs from "fs";
import { PDFParse } from "pdf-parse";

export async function extractTextFromPDF(
    filePath: string
): Promise<string> {

    const pdfBuffer = fs.readFileSync(filePath);

    const parser = new PDFParse({
        data: pdfBuffer
    });

    const result = await parser.getText();

    await parser.destroy();

    return result.text;
}