import {Router} from "express";
import Track from "../models/Track";
import {TrackTypes} from "../types";
import mongoose, {Types} from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const tracksRouter = Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    const albumIdParam = req.query.album as string;

    const tracks = await Track.find({album: albumIdParam}).sort({number: 1});

    return res.send(tracks);
  } catch (err) {
    next(err);
  }
});

tracksRouter.post('/', auth, async (req, res, next) => {
  try {
    const trackData: TrackTypes = {
      album: req.body.album,
      name: req.body.name,
      duration: req.body.duration,
      number: req.body.number,
      isPublished: req.body.isPublished,
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

tracksRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    let _id: Types.ObjectId;

    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(422).send({error: 'Wrong objectId!'});
    }

    const track = await Track.findByIdAndDelete(_id);

    if (!track) {
      return res.status(403).send({error: `Track not found!`});
    }

    return res.send({message: 'Track deleted!'});
  } catch (err) {
    return next(err);
  }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    let _id: Types.ObjectId;

    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(422).send({error: 'Wrong objectId!'});
    }

    const track = await Track.findById(_id);

    if (!track) {
      return res.status(403).send({error: `Track not found!`});
    }

    await track.updateOne({isPublished: !track.isPublished});
    await track.save();

    return res.send(track);

  } catch (err) {
    return next(err);
  }
});
export default tracksRouter;