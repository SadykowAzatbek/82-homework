import {Router} from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import mongoose from "mongoose";

const trackHistoryRouter = Router();

trackHistoryRouter.post('/', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');

    if (!headerValue) {
      return res.status(401).send({error: 'No authorization header present!'});
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.status(401).send({error: 'No token present!'});
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.status(401).send({error: 'Wrong token!'});
    }

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