import {Router} from "express";
import User from "../models/User";
import mongoose, {mongo} from "mongoose";

const usersRouter = Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    user.generateToken();
    await user.save();
    return res.send({message: 'ok!', user});
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(err);
    }

    if (err instanceof mongo.MongoServerError && err.code === 11000) {
      return res.status(422).send({message: 'Username should be unique'});
    }

    next(err);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({username: req.body.username});

    if(!user) {
      return res.status(422).send({error: 'Username and/or password not found!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if(!isMatch) {
      return res.status(422).send({error: 'Username and/or password not found!'});
    }

    user.generateToken();
    await user.save();

    return res.send({message: 'Username and password are correct!', user});
  } catch (err) {
    next(err);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');
    const messageSuccess = {message: 'Success!'};

    if (!headerValue) {
      return res.send(messageSuccess);
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.send(messageSuccess);
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.send(messageSuccess);
    }

    user.generateToken();
    await user.save();
    return res.send(messageSuccess);
  } catch (err) {
    return next(err);
  }
});


export default usersRouter;