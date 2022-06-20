import { Reducer } from "redux";
import { Photo } from "../../model/Album";
import {
    AlbumAction,
    AlbumPhotoAction,
    AlbumState,
    ALBUM_FAIL,
    ALBUM_PHOTO_FAIL,
    ALBUM_PHOTO_REQUEST,
    ALBUM_PHOTO_SUCESS,
    ALBUM_REQUEST,
    ALBUM_SUCESS
} from "./actionType";

const initial: AlbumState = {
    loading: false,
    error: "",
    albums: []
}

export const albumReducer: Reducer<AlbumState, AlbumAction | AlbumPhotoAction> = (state = initial, action: AlbumAction | AlbumPhotoAction): AlbumState => {
    console.log(action);
    switch (action.type) {
        case ALBUM_REQUEST:
            return { ...state, loading: true, error: null, albums: [] } as AlbumState
        case ALBUM_SUCESS:
            return { ...state, loading: false, error: null, albums: action.payload } as AlbumState
        case ALBUM_FAIL:
            return { ...state, loading: false, error: action.payload, albums: [] } as AlbumState
        case ALBUM_PHOTO_REQUEST:
            return { ...state, loading: true, error: null } as AlbumState
        case ALBUM_PHOTO_SUCESS:
            let a = action as AlbumPhotoAction;
            const album = state.albums?.find(x => x.albumId == a.albumId);
            if (album) {
                album.photos = action.payload as Photo[];
            }
            // console.log(action.payload);
            // console.log(album);
            return { ...state, loading: false, error: null } as AlbumState
        case ALBUM_PHOTO_FAIL:
            return { ...state, loading: false, error: action.payload } as AlbumState
        default: return state;
    }
}

// export default albumReducer;