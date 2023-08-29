import sharp from "sharp";
import fs from "fs";
import path from "path";
import os from "os";

const homeDir = os.homedir();
const downloadDir = path.resolve(homeDir, "Downloads");

fs.watch(downloadDir, (_, fileName) => {
  if (!fileName.match(/.png|.jpeg|.jpg/)) return;
  else if (fileName.match(/.crdownload/)) return;
  const filePath = path.resolve(downloadDir, fileName);
  const convertedImagesFolder = path.resolve(downloadDir, "Converted Images");
  if (!fs.existsSync(convertedImagesFolder)) {
    fs.mkdirSync(convertedImagesFolder);
  }

  sharp(filePath)
    .resize(1000)
    .toFile(
      path.resolve(convertedImagesFolder, fileName + ".webp"),
      (err, info) => console.log(err, info)
    );
});
