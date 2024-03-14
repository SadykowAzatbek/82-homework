import {Model} from "mongoose";

export interface ArtistTypes {
  name: string;
  image: string | null;
  info: string;
  isPublished: boolean;
}

export interface AlbumTypes {
  artist: string;
  name: string;
  release: string;
  image: string | null;
  isPublished: boolean;
}

export interface TrackTypes {
  album: string;
  name: string;
  duration: string;
  number: number;
  isPublished: boolean;
}

export interface UserTypes {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string;
  googleID: string;
}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserTypes, {}, UserMethods>;