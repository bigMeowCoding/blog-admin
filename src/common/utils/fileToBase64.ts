export function fileToBase64(image: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);
    fileReader.onload = function (e) {
      if (typeof fileReader.result === "string") {
        resolve(fileReader.result);
      } else {
        resolve("类型不对");
        console.error(fileReader.result);
      }
    };
    fileReader.onerror = function (error) {
      reject(error);
    };
  });
}
