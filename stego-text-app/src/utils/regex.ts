export function escapeRegExp(text: string) {
  return text.replaceAll(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
