import { connect } from "react-redux";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Album } from "../model/Album";
import { fetchAlbumPhoto } from "../store/album/action";
import { AppState } from "../store/app.state";

const queryString = (key: string) => {
    let location = useLocation();
    let x = new URLSearchParams(location.search);
    return x.get(key);
}

interface Props {
    doFetchAlbumPhoto(albumId: number): void,
    loading: boolean,
    error: string | null,
    albums: Album[] | null
}



const AlbumPhotoList: React.FunctionComponent<Props> = (props: Props) => {
    let navigate = useNavigate();
    const params = useParams();
    const albumId = parseInt(params["albumId"]!);

    useEffect(() => {
        console.log(albumId);
        let album = props.albums?.find(x => x.albumId == albumId)!;
        if (album) {
            props.doFetchAlbumPhoto(albumId);
        } else {

        }
    }, [location]);

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
                            <a target="_blank" href={i.photoUrl} title={i.photoTitle}>
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
        doFetchAlbumPhoto: (albumId: number) => dispatch(fetchAlbumPhoto(albumId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AlbumPhotoList);
