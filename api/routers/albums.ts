import {Router} from "express";
import Album from "../models/Album";
import mongoose, {mongo, Types} from "mongoose";
import {AlbumTypes} from "../types";
import {imageUpload} from "../multer";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const albumsRouter = Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    const artistIdParam = req.query.artist as string;

    const results = await Album.find({artist: artistIdParam}).sort({release: -1});

    return res.send(results);
  } catch (err) {
    next(err);
  }
});

albumsRouter.post('/', auth, imageUpload.single('image'), async (req, res, next) => {
  try {
    const albumData: AlbumTypes = {
      artist: req.body.artist,
      name: req.body.name,
      release: req.body.release,
      image: req.file ? req.file.filename : null,
      isPublished: req.body.isPublished,
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

albumsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    let _id: Types.ObjectId;

    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(422).send({error: 'Wrong objectId!'});
    }

    const album = await Album.findByIdAndDelete(_id);

    if (!album) {
      return res.status(403).send({error: `Album not found!`});
    }

    return res.send({message: 'Album deleted!'});
  } catch (err) {
    return next(err);
  }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    let _id: Types.ObjectId;

    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(422).send({error: 'Wrong objectId!'});
    }

    const album = await Album.findById(_id);

    if (!album) {
      return res.status(403).send({error: `Album not found!`});
    }

    await album.updateOne({isPublished: !album.isPublished});
    await album.save();

    return res.send(album);

  } catch (err) {
    return next(err);
  }
});

export default albumsRouter;