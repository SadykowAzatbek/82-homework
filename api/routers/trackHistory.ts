import {Router} from "express";
import TrackHistory from "../models/TrackHistory";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";

const trackHistoryRouter = Router();

trackHistoryRouter.get('/', auth, async (req, res, next) => {
  try {
    const tracksHistory = await TrackHistory.find().populate('track');

    return res.send(tracksHistory);
  } catch (err) {
    return next(err);
  }
});

trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const trackHistory = new TrackHistory({
      user: req.user?._id,
      track: req.body.track,
      datetime: req.body.datetime,
    });

    await trackHistory.save();
    return res.send(trackHistory);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(err);
    }

    next(err);
  }
});

export default trackHistoryRouter;