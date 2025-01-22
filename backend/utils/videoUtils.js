import ytdl from "ytdl-core";
import fs from "fs";
import path from "path";

export const downloadAndSaveAudio = async (videoUrl) => {
  if (!ytdl.validateURL(videoUrl)) {
    throw new Error("Invalide youtube url");
  }
  const info = await ytdl.getInfo(videoUrl);
  const format = ytdl.chooseFormat(info.formats, { quality: "highestaudio" });
  const audioStream = ytdl(videoUrl, { format });
  const fileName = `${info.videoDetails.title}.mp3`;
  const filePath = path.join(__dirname, "../uploads/audio", fileName);
  return new Promise((resolve, reject) => {
    audioStream
      .pipe(fs.createWriteStream(filePath))
      .on("finish", () => {
        resolve(
          `${process.env.BACK_END_AUDIO_URL}/${encodeURIComponent(fileName)}`
        );
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};
