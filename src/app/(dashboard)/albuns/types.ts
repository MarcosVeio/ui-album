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

export interface CoverImageProps {
  readonly imageId: string;
  readonly imgUrl: string;
}

export interface Album {
  readonly albumId: string;
  readonly title: string;
  readonly description: string;
  readonly coverImage: CoverImageProps;
  readonly cover: string;
}
