import {Router} from "express";
import Track from "../models/Track";
import {TrackTypes} from "../types";
import mongoose from "mongoose";

const tracksRouter = Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    const tracks = await Track.find();

    const albumIdParam = req.query.album as string;

    if (albumIdParam) {
      res.send(tracks.filter(track => track.album.toString() === albumIdParam));
    }

    res.send(tracks);
  } catch (err) {
    next(err);
  }
});

tracksRouter.post('/', async (req, res, next) => {
  try {
    const trackData: TrackTypes = {
      album: req.body.album,
      name: req.body.name,
      duration: req.body.duration,
    }

    const track = new Track(trackData);
    await track.save();

    return res.send(track);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(err);
    }

    next(err);
  }
});

export default tracksRouter;