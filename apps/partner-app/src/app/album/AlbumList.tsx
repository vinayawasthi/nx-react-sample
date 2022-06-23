import { connect, useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { AppState } from "../store/app.state";
import { fetchAlbum } from "../store/album/action";
import { Album } from "../model/Album";

import { Link, Outlet } from "react-router-dom";

const LoadAlbumList = (albums: Album[]): JSX.Element => {
    var rows: JSX.Element[] = [];
    for (var i = 0; i < albums.length; i++) {
        let album: Album = albums[i];
        rows.push(<li key={album.albumId}>
            <Link key={album.albumId} to={"/album/" + album.albumId + "?qs1=100"}>{album.albumTitle}</Link>
        </li>);
    }
    return (<ul>{rows}</ul>)
}

interface Props {
    doFetchAlbum(): void,
    loading: boolean,
    error: string | null,
    albums: Album[] | null
}

const AlbumList: React.FunctionComponent<Props> = (props: Props) => {
    // const _dispatch = useDispatch();
    // const loading = useSelector<AlbumState, boolean>(state => state.loading);
    // const error = useSelector<AlbumState, string | null>(state => state.error);
    // const albums = useSelector<AlbumState, Album[] | null>(state => state.albums);

    useEffect(() => {
        if (!(props.albums && props.albums.length > 0))
            props.doFetchAlbum();
    }, [props.doFetchAlbum]);

    return (
        <div>
            {props.loading ? (<div>loading album</div>)
                : props.error ? (<div>Error occured : {props.error}</div>)
                    : (props.albums && props.albums.length > 0) ? LoadAlbumList(props.albums)
                        : "No Album Found"
            }
        </div>
    )
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
        doFetchAlbum: () => dispatch(fetchAlbum()),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);
