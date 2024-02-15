export function fileToDataUrl (file) {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const valid = validFileTypes.findIndex(type => type === file.type);
  if (valid === -1) {
    throw Error('provided file is not a png, jpg or jpeg image.');
  }
  const reader = new FileReader();
  const urlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return urlPromise;
}
