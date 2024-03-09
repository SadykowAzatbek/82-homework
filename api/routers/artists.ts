import {Router} from "express";
import Artist from "../models/Artist";
import mongoose, {Types} from "mongoose";
import {ArtistTypes} from "../types";
import {imageUpload} from "../multer";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const artistsRouter = Router();

artistsRouter.get('/', async (_req, res, next) => {
  try {
    const results = await Artist.find();

    return res.send(results);
  } catch (err) {
    next(err);
  }
});

artistsRouter.post('/', auth, imageUpload.single('image'),  async (req, res, next) => {
  try {
    const artistData: ArtistTypes = {
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      info: req.body.info,
      isPublished: req.body.isPublished,
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

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    let _id: Types.ObjectId;

    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(422).send({error: 'Wrong objectId!'});
    }

    const artist = await Artist.findByIdAndDelete(_id);

    if (!artist) {
      return res.status(403).send({error: `artist not found!`});
    }

    return res.send({message: 'Artist deleted!'});
  } catch (err) {
    return next(err);
  }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    let _id: Types.ObjectId;

    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(422).send({error: 'Wrong objectId!'});
    }

    const artist = await Artist.findById(_id);

    if (!artist) {
      return res.status(403).send({error: `Artist not found!`});
    }

    await artist.updateOne({isPublished: !artist.isPublished});
    await artist.save();

    return res.send(artist);

  } catch (err) {
    return next(err);
  }
});


export default artistsRouter;