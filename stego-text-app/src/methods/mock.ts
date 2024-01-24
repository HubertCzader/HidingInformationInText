import { Method } from "../types";
import { textFromPdf } from "../utils/file";
import { escapeRegExp } from "../utils/regex";
import { PDFDocument, rgb } from "pdf-lib";

interface SpaceCipher {
  fontSize: number;
  hash: string;
}

// function replaceAt(originalString: string, index: number, replacement: string): string {
//   if (index >= originalString.length) {
//       return originalString;
//   }
//   return originalString.substring(0, index) + replacement + originalString.substring(index + 1);
// }


export const mockMethod: Method<SpaceCipher> = {
  name: "Space Cipher",
  defaultCover: "Cover text",
  defaultStego: "Stego text",
  config: {
    hash: "^",
    fontSize: 10,
  },
  execute: (source, stego, config) => 
    new Promise(async (resolve) => {
      const pdfDoc = await PDFDocument.load(source);
      const firstPage = pdfDoc.getPage(0);
      const textContent = await textFromPdf(source);
      const length = textContent.length;
      const maxWidth = firstPage.getSize().width - 24;
      let xPos = 10;
      let yPos = firstPage.getSize().height - 24; 
      let stegoIndex = 0;
      for (let i = 0; i < length; i++) {
        let letter = textContent[i];
        const stegoLetter = stego[stegoIndex];
        let color = rgb(0, 0, 0);

        if (letter === " ") {
          const replacement = config.hash + stegoLetter;
          color = rgb(1, 1, 1);
          letter = replacement;
          // textContent = replaceAt(textContent, i, replacement);
          stegoIndex++;
        }
      
        firstPage.drawText(letter, {
          x: xPos,
          y: yPos,
          size: config.fontSize,
          color: color,
          maxWidth: maxWidth,
        });

        xPos += 6; 
        if (xPos >= maxWidth) {
          xPos = 10;
          yPos -= 14;
          if (yPos <= 0) {
            console.log("Not enough space in the pdf to hide all massage.");
            break;
          }
        }

        if (stegoIndex === stego.length) {
          console.log("Stego text hidden successfully.");
          firstPage.drawText(textContent.substring(i + 1), {
            x: xPos,
            y: yPos,
            size: config.fontSize,
            color: rgb(0, 0, 0),
            maxWidth: maxWidth,
          });
          break;
        }

      }
    resolve(await pdfDoc.save());
  }),
  decode: async (source, config) => {
    const content = await textFromPdf(source);
    const h = escapeRegExp(config.hash);
    const matches = [...content.matchAll(new RegExp(`${h}(.)$`, 'g'))]
    const resultmatch = matches.map(match => match[1]).join('');
    return resultmatch || "No message detected";
  },
};




