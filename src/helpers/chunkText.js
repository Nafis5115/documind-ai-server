// export function chunkText(text, chunkSize = 200) {
//   const words = text.split(" ");
//   const chunks = [];

//   for (let i = 0; i < words.length; i += chunkSize) {
//     chunks.push(words.slice(i, i + chunkSize).join(" "));
//   }

//   return chunks;
// }

export function chunkText(text, chunkSize = 200) {
  const words = text.split(" ");
  const chunks = [];

  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(" "));
  }
  return chunks;
}
