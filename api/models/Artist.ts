import {Schema, model} from "mongoose";

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  info: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const Artist = model('Artist', ArtistSchema);

export default Artist;