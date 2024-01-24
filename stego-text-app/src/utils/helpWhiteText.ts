export const helpWhiteText = `The view can be divided into two main parts. On the left side is the control panel. It allows the selection of a method in the 
"Current method" window. For the chosen method, a range of parameters are available allowing the configuration of the method. For the "White text in pdf" method, 
the Red, Green, and Blue parameters allow for adjusting the font color by entering appropriate values from the RGB gamut. However, it should be mentioned that the 
chosen color should be consistent with the background color to make it undetectable. The default color is white. In the further part, the FontSize parameter allows 
the selection of the font in which the hidden text will be. The last field enabling the adjustment of the "White text in pdf" algorithm's operation is the hash field, 
which allows the introduction of a character sequence that will help distinguish the hidden text from the actual one. The hidden message will be preceded and followed 
by this hash. <br><br>

The main part is divided into 3 tabs. The first one offers a range of functionalities related to encrypting messages. This view allows for the use of an already existing 
pdf file by importing it through the "Choose source file" button. Then, after selecting a file, the "Encode" button becomes active. Upon pressing it, the message entered 
in the text field will be hidden, and a file with the encrypted message will appear, which can be downloaded by selecting the "Download" button. It is also possible to 
replace the ready-made file with a newly created one, by choosing the option "Use plaintext source". In this case, a text field appears in the place of the file import, 
allowing the entry of text that will appear in the resulting file in a visible form for the recipient (this is not the hidden message). The remaining steps remain 
unchanged. The second tab is responsible for decrypting messages. In this view, you need to select the encrypted file and then press the "Decode" button. Then, the 
decrypted message will be displayed on the screen. <br><br>

The last tab is the "Help" tab. You have already had the opportunity to become familiar with its functionality :).`;
