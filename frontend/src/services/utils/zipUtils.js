import JSZip from "jszip";

async function imagesToZipBlob(images) {
  const zip = new JSZip();
  images.forEach((image, index) => {
    zip.file(`image-${index}.png`, image);
  });
  return zip.generateAsync({ type: "blob" });
}

export { imagesToZipBlob };