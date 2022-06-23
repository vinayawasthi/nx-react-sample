import { connect } from "react-redux";
import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Album } from "../model/Album";
import { fetchAlbum, fetchAlbumPhoto, fetchAlbumPhotoWithAlbums } from "../store/album/action";
import { AppState } from "../store/app.state";

const queryString = (key: string) => {
    let location = useLocation();
    let x = new URLSearchParams(location.search);
    return x.get(key);
}

interface Props {    
    doFetchAlbumPhotoWithAlbums(albumId: number): void,
    doFetchAlbumPhoto(albumId: number): void,
    loading: boolean,
    error: string | null,
    albums: Album[] | null
}

const AlbumPhotoList: React.FunctionComponent<Props> = (props: Props) => {
    let navigate = useNavigate();
    const params = useParams();
    const albumId = parseInt(params["albumId"]!);
    const qs1 = queryString("qs1");
    useEffect(() => {
        console.log(qs1);
        if(props.albums && props.albums.length>0){
            let album = props.albums?.find(x => x.albumId == albumId)!;
            if (album) {
                if (!(album.photos && album.photos.length > 0))
                    props.doFetchAlbumPhoto(albumId);
            }
        }else{
            props.doFetchAlbumPhotoWithAlbums(albumId);
            // props.doFetchAlbum();   
            // const t = setTimeout(() => {
            //     props.doFetchAlbumPhoto(albumId);
            // }, 500); 
        }

    }, [props.doFetchAlbumPhoto]);

    let album = props.albums?.find(x => x.albumId == albumId)!;
    if (props.loading) {
        return (<div>loading album's photo</div>)
    } else if (props.error) {
        return (<div>error occured</div>)
    } else if (album && album?.photos) {
        return (
            <>
                {
                    album?.photos?.map((i) => {
                        return (
                            <a key={i.photoId} target="_blank" href={i.photoUrl} title={i.photoTitle}>
                                <img src={i.photoThumbnailUrl} />
                            </a>
                        )
                    })
                }
            </>
        )
    } else {
        return (<div>No photo in this album</div>)
    }
}
const mapStateToProps = (state: AppState) => {
    return {
        loading: state.album.loading,
        error: state.album.error,
        albums: state.album.albums
    }
}
const mapDispatchToProps = (dispatch: Function) => {
    return {
        doFetchAlbumPhotoWithAlbums: (albumId: number) => dispatch(fetchAlbumPhotoWithAlbums(albumId)),
        doFetchAlbumPhoto: (albumId: number) => dispatch(fetchAlbumPhoto(albumId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AlbumPhotoList);
