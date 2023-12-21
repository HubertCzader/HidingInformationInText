import { Method } from "../types";
import { lorem } from "../utils/text";
import { PDFDocument, rgb } from "pdf-lib";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
// GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface WhiteTextPdfMethod {
  r: number;
  g: number;
  b: number;
  fontSize: number;
  hash: string;
}

export const whiteTextPdfMethod: Method<WhiteTextPdfMethod> = {
  name: "White text in pdf",
  defaultCover: lorem,
  defaultStego: "Attack at dawn!",
  config: { r: 255, g: 255, b: 255, fontSize: 5, hash: "!#!" },
  execute: (source, stego, config) =>
    new Promise(async (resolve) => {
      const pdfDoc = await PDFDocument.load(source);
      const firstPage = pdfDoc.getPage(0);
      const { height } = firstPage.getSize();
      const payload = config.hash + stego + config.hash;
      console.log("Hiding", payload);
      firstPage.drawText(payload, {
        x: 10,
        y: height - config.fontSize,
        size: config.fontSize,
        color: rgb(config.r / 255, config.g / 255, config.b / 255),
        maxWidth: firstPage.getSize().width - 24,
      });
      resolve(await pdfDoc.save());
    }),
  decode: (source, config) =>
    new Promise(async (resolve) => {
      console.log("extracting");

      // getDocument({ data: source })
      //   .promise.then((doc) => doc.getPage(1))
      //   .then((page) => page.getTextContent())
      //   .then((textContent) => {
      //     console.log("TEXT IS", textContent);
      //   });
      resolve("banana");
    }),
};
