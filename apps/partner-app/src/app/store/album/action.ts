import axios from "axios";
import { ALBUM_LIST_URL, ALBUM_PHOTO_LIST_URL } from "../../AppConstants"
import { ALBUM_REQUEST, ALBUM_FAIL, ALBUM_SUCESS, ALBUM_PHOTO_REQUEST, ALBUM_PHOTO_FAIL, ALBUM_PHOTO_SUCESS } from "./actionType"
import { Album, Photo } from "../../model/Album";

export const AlbumRequestAction = () => {
    return {
        type: ALBUM_REQUEST,
        payload: null
    }
}

export const AlbumFailAction = (error: string) => {
    return {
        type: ALBUM_FAIL,
        payload: error
    }
}

export const AlbumSucessAction = (data: Album[] | null) => {
    return {
        type: ALBUM_SUCESS,
        payload: data
    }
}

export const AlbumPhotoRequestAction = (albumId: number) => {
    return {
        type: ALBUM_PHOTO_REQUEST,
        albumId:albumId,
        payload:null
    }
}

export const AlbumPhotoFailAction = (albumId: number, error: string) => {
    return {
        type: ALBUM_PHOTO_FAIL,
        albumId: albumId,
        payload: error
    }
}

export const AlbumPhotoSucessAction = (albumId: number, data: Photo[] | null) => {
    return {
        type: ALBUM_PHOTO_SUCESS,
        albumId: albumId,
        payload: data
    }
}



export const fetchAlbum = () => {
    return (dispatch: Function): void => {
        dispatch(AlbumRequestAction());
        axios.get<{ userId: any; id: any; title: any; }[]>(ALBUM_LIST_URL)
            .then(function (response) {
                let el = response.data.map((x) => {
                    return {
                        userId: x.userId,
                        albumId: x.id,
                        albumTitle: x.title,
                        photos: undefined
                    } as Album;
                });
                dispatch(AlbumSucessAction(el));
            })
            .catch(function (error) {
                console.log(error);
                dispatch(AlbumFailAction("Unable to fetch data"));
            });
    }
}

export const fetchAlbumPhoto = (albumID: number) => {
    return (dispatch: Function): void => {
        dispatch(AlbumPhotoRequestAction(albumID));
        let url = ALBUM_PHOTO_LIST_URL.replace("{albumId}", albumID.toString());
        console.log(url);
        axios.get<{ albumId: number, id: number, title: string, url: string, thumbnailUrl: string }[]>(url)
            .then(function (response) {
                let el = response.data.map((x) => {
                    return {
                        albumId:x.albumId,
                        photoId: x.id,
                        photoTitle: x.title,
                        photoUrl: x.url,
                        photoThumbnailUrl: x.thumbnailUrl
                    } as Photo;
                });
                dispatch(AlbumPhotoSucessAction(albumID, el));
            })
            .catch(function (error) {
                console.log(error);
                dispatch(AlbumPhotoFailAction(albumID, "Unable to fetch data"));
            });
    }
}