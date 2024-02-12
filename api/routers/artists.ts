import {Router} from "express";
import Artist from "../models/Artist";
import mongoose from "mongoose";
import {ArtistTypes} from "../types";
import {imageUpload} from "../multer";

const artistsRouter = Router();

artistsRouter.get('/', async (req, res, next) => {
  try {
    const results = await Artist.find();

    return res.send(results);
  } catch (err) {
    next(err);
  }
});

artistsRouter.post('/', imageUpload.single('image'),  async (req, res, next) => {
  try {
    const artistData: ArtistTypes = {
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      info: req.body.info,
    };

    const artist = new Artist(artistData);

    await artist.save();
    return res.send(artist);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(err);
    }
    next(err);
  }
});

export default artistsRouter;