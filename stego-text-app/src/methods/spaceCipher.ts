import { Method } from "../types";
import { textFromPdf } from "../utils/file";
import { escapeRegExp } from "../utils/regex";
import { PDFDocument, RGB, StandardFonts, rgb } from "pdf-lib";

interface SpaceCipher {
  fontSize: number;
  hash: string;
  lineHeight: number;
}

export const spaceCipher: Method<SpaceCipher> = {
  name: "Space Cipher",
  defaultCover: "Cover text",
  defaultStego: "Stego text",
  config: {
    hash: "`",
    fontSize: 16,
    lineHeight: 22,
  },
  execute: (source, stego, config) =>
    new Promise(async (resolve) => {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      page.setLineHeight(config.lineHeight);
      const textContent = await textFromPdf(source);
      const pad = 24;
      const maxWidth = page.getSize().width - pad;
      let xPos = pad / 2;
      let yPos = page.getSize().height - pad;
      let stegoIndex = 0;

      const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      page.setFont(font);

      const draw = (text: string, color: RGB) => {
        page.drawText(text, {
          x: xPos,
          y: yPos,
          size: config.fontSize,
          color,
          maxWidth: maxWidth,
        });
        xPos += font.widthOfTextAtSize(text, config.fontSize);
        if (xPos >= maxWidth) {
          xPos = pad / 2;
          yPos -= config.lineHeight;
          if (yPos <= 0) {
            console.log(
              "Not enough space in the pdf to hide the whole message."
            );
            resolve(pdfDoc.save());
          }
        }
      };

      for (let i = 0; i < textContent.length; i++) {
        let letter = textContent[i];
        if (letter === " " && xPos === pad / 2) {
          continue; // don't start line with a whitespace
        }
        if (letter === " " && stegoIndex < stego.length) {
          draw(config.hash + stego[stegoIndex], rgb(1, 1, 1));
          stegoIndex++;
          continue;
        }
        if (xPos === pad / 2 && stegoIndex === stego.length) {
          draw(textContent.substring(i + 1), rgb(0, 0, 0));
          break;
        } else {
          draw(textContent[i], rgb(0, 0, 0));
        }
      }
      resolve(await pdfDoc.save());
    }),
  decode: async (source, config) => {
    const content = await textFromPdf(source);
    const h = escapeRegExp(config.hash);
    const matches = [...content.matchAll(new RegExp(`${h}(.)`, "g"))];
    const resultmatch = matches.map((match) => match[1]).join("");
    return resultmatch || "No message detected";
  },
};
