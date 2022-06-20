import { Album, Photo } from "../../model/Album"

export const ALBUM_REQUEST ="ALBUM_REQUEST"
//export const ALBUM_LOADING ="ALBUM_LOAD"
export const ALBUM_SUCESS ="ALBUM_SUCESS"
export const ALBUM_FAIL ="ALBUM_FAIL"
export const ALBUM_PHOTO_REQUEST ="ALBUM_PHOTO_REQUEST"
export const ALBUM_PHOTO_SUCESS ="ALBUM_PHOTO_SUCESS"
export const ALBUM_PHOTO_FAIL ="ALBUM_PHOTO_FAIL"

export type AlbumState ={
    loading:boolean,
    error:string|null,
    albums:Album[]|null
}
export type AlbumAction = { 
    type: string; 
    payload: Album[]|string|null; 
}
export type AlbumPhotoAction = { 
    type: string; 
    albumId:number,
    payload: Photo[]|string|null; 
}