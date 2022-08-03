export function getBase64(file){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
}

export function checkFile(file){
  return file && file['type'].split('/')[0] === 'image';
}