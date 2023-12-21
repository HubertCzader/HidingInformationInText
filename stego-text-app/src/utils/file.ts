import { PdfFormat } from "../types";
import { PDFDocument, PageSizes } from "pdf-lib";

export function saveByteArray(filename: string, byte: ArrayBuffer) {
  var blob = new Blob([byte], { type: "application/pdf" });
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  var fileName = filename;
  link.download = fileName;
  link.click();
}

export async function textToPdf(text: string): Promise<PdfFormat> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage(PageSizes.A4);
  page.drawText(text, {
    x: 12,
    lineHeight: 18,
    y: page.getSize().height - 24,
    size: 12,
    maxWidth: page.getSize().width - 24,
  });
  return await pdfDoc.save();
}
