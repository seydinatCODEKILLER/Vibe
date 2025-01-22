import { downloadAndSaveAudio } from "../utils/videoUtils.js";
import errorHandler from "../utils/errorHandler.js";

export const downloadAudio = async (req, res, next) => {
  const { url } = req.body;
  if (!url) {
    return next(errorHandler(400, "Veuillez entrer une URL valide."));
  }
  try {
    const downloadLink = await downloadAndSaveAudio(url);
    if (!downloadLink) {
      return next(errorHandler(404, "Aucun fichier trouvé avec cette URL."));
    }
    res.status(201).json({ downloadLink });
  } catch (error) {
    next(error);
  }
};
