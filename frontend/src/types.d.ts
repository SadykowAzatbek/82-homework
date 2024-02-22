export interface ArtistsTypes {
  _id: string;
  name: string;
  image: string | null;
  info: string;
}

export interface AlbumsTypes {
  _id: string;
  artist: string;
  name: string;
  release: string;
  image: string | null;
}