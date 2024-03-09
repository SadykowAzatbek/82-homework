import {Schema, model, Types} from "mongoose";
import Artist from "./Artist";

const AlbumSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value);

        return Boolean(artist);
      },
      message: 'Artist does not exist!',
    },
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  release: {
    type: Number,
    required: true,
  },
  image: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const Album = model('Album', AlbumSchema);
export default Album;