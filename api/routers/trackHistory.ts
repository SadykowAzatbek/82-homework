import {Router} from "express";
import TrackHistory from "../models/TrackHistory";
import mongoose from "mongoose";
import auth from "../middleware/auth";

const trackHistoryRouter = Router();

trackHistoryRouter.post('/', auth, async (req, res, next) => {
  try {
    const trackHistory = new TrackHistory({
      user: req.body.user,
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