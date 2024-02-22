import {Model} from "mongoose";

export interface ArtistTypes {
  name: string;
  image: string | null;
  info: string;
}

export interface AlbumTypes {
  artist: string;
  name: string;
  release: string;
  image: string | null;
}

export interface TrackTypes {
  album: string;
  name: string;
  duration: string;
  number: number;
}

export interface UserTypes {
  username: string;
  password: string;
  token: string;
}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserTypes, {}, UserMethods>;