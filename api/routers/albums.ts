import {Router} from "express";
import Album from "../models/Album";
import mongoose, {mongo, Types} from "mongoose";
import {AlbumTypes} from "../types";
import {imageUpload} from "../multer";

const albumsRouter = Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    const results = await Album.find();

    const artistIdParam = req.query.artist as string;

    if (artistIdParam) {
      res.send(results.filter(album => album.artist.toString() === artistIdParam));
    }

    return res.send(results);
  } catch (err) {
    next(err);
  }
});

albumsRouter.post('/',imageUpload.single('image'), async (req, res, next) => {
  try {
    const albumData: AlbumTypes = {
      artist: req.body.artist,
      name: req.body.name,
      release: req.body.release,
      image: req.file ? req.file.filename : null,
    };

    const album = new Album(albumData);

    await album.save();
    return res.send(album);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(err);
    }

    if (err instanceof mongo.MongoServerError && err.code === 11000) {
      return res.status(422).send({message: 'Album name should be unique'});
    }

    next(err);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;

    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(422).send({error: 'Wrong objectId!'});
    }

    const albums = await Album.findById(_id).populate('artist');

    if (!albums) {
      return res.status(422).send({error: 'Not found!'});
    }

    res.send(albums);
  } catch (err) {
    next(err);
  }
});

export default albumsRouter;