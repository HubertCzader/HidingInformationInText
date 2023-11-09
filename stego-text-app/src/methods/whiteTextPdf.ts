import jsPDF from "jspdf";
import { Method } from "../types";
import { lorem } from "../utils/text";

interface WhiteTextPdfMethod {
  r: number;
  g: number;
  b: number;
  fontSize: number;
}

export const whiteTextPdfMethod: Method<WhiteTextPdfMethod> = {
  name: "White text in pdf",
  defaultCover: lorem,
  defaultStego: "Attack at dawn!",
  config: { r: 0, g: 0, b: 255, fontSize: 5 },
  execute: (cover, stego, config) =>
    new Promise((resolve) => {
      const doc = new jsPDF();
      doc.setTextColor(config.r, config.g, config.b);
      doc.setFontSize(config.fontSize);
      doc.text(stego, 10, 10);
      doc.setTextColor(0);
      doc.setFontSize(13);
      doc.text(doc.splitTextToSize(cover, 180), 10, 10);
      doc.save("a4.pdf");
      resolve();
    }),
};
