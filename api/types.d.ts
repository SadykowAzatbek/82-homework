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