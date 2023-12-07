export function saveByteArray(filename: string, byte: ArrayBuffer) {
  var blob = new Blob([byte], { type: "application/pdf" });
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  var fileName = filename;
  link.download = fileName;
  link.click();
}
