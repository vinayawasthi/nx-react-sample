export interface Album {
    userId: number,
    albumId: number,
    albumTitle: string,
    photos?: Photo[];
}

export interface Photo {
    albumId: number,
    photoId: number,
    photoTitle: string,
    photoUrl: string,
    photoThumbnailUrl: string
}