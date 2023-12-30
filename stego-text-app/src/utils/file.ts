import { PdfFormat } from "../types";
import { PDFDocument, PageSizes } from "pdf-lib";
import { pdfjs } from "../../pdfjs";

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

export async function textFromPdf(pdf: PdfFormat): Promise<string> {
  return await pdfjs.getDocument(pdf).promise.then(async (pdfDoc: any) => {
    let textContent = "";
    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      // Get the text content of the page
      await pdfDoc
        .getPage(pageNum)
        .then(function (page: any) {
          return page.getTextContent();
        })
        .then(function (content: any) {
          // Concatenate text content of each page
          textContent += content.items.map((item: any) => item.str).join(" ");
        });
    }
    return textContent;
  });
}
