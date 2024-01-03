import { Method } from "../types";
import { textFromPdf } from "../utils/file";
import { escapeRegExp } from "../utils/regex";
import { lorem } from "../utils/text";
import { PDFDocument, rgb } from "pdf-lib";

interface WhiteTextPdfMethod {
  red: number;
  green: number;
  blue: number;
  fontSize: number;
  hash: string;
}

export const whiteTextPdfMethod: Method<WhiteTextPdfMethod> = {
  name: "White text in pdf",
  defaultCover: lorem,
  defaultStego: "Attack at dawn!",
  config: { red: 255, green: 255, blue: 255, fontSize: 5, hash: "!#!" },
  execute: (source, stego, config) =>
    new Promise(async (resolve) => {
      const pdfDoc = await PDFDocument.load(source);
      const firstPage = pdfDoc.getPage(0);
      const { height } = firstPage.getSize();
      const payload = config.hash + stego + config.hash;
      firstPage.drawText(payload, {
        x: 10,
        y: height - config.fontSize,
        size: config.fontSize,
        color: rgb(config.red / 255, config.green / 255, config.blue / 255),
        maxWidth: firstPage.getSize().width - 24,
      });
      resolve(await pdfDoc.save());
    }),
  decode: async (source, config) => {
    const content = await textFromPdf(source);
    const h = escapeRegExp(config.hash);
    const match = content.match(new RegExp(`${h}(.*)${h}`));
    return match?.[1] ?? "No message detected";
  },
};
