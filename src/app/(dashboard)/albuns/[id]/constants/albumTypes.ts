export interface AlbumImage {
  imageId: string;
  imgUrl: string;
}

export interface Album {
  albumId: string;
  title: string;
  description: string;
  cover: string;
  images: AlbumImage[];
}
