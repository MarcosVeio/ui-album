export interface AlbumModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly onSave: (form: {
    title: string;
    description: string;
    coverImage: string;
    file?: File | null;
  }) => void;
  readonly initialData?: {
    title: string;
    description: string;
    coverImage: string;
  };
  readonly isEdit?: boolean;
}

export interface CoverImage {
  imageId: string;
  imgUrl: string;
}

export interface AlbumById {
  albumId: string;
  title: string;
  description: string;
  coverImage: CoverImage;
}

export type Album = AlbumById;

export interface ImageByAlbumId {
  imageId: string;
  imgUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

export type ImagesByAlbumId = ImageByAlbumId[];
export type Albuns = Album[];
