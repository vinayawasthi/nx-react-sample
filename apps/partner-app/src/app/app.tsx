// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { Provider } from 'react-redux';
import configureStore from './store/app.store';
import AlbumList from './album/AlbumList';
import AlbumPhotoList from './album/AlbumPhotoList';
import { Link, Outlet, Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <Provider store={configureStore()}>
      <>
        {/* START: routes */}
        {/* These routes and navigation have been generated for you */}
        {/* Feel free to move and update them to fit your needs */}

        <div role="navigation">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/album">Album</Link>
            </li>
          </ul>
        </div>
        <Outlet />
        <Routes>
          <Route path="/album" element={<AlbumList />} />
          <Route path="/album/:albumId" element={<AlbumPhotoList />} />
          <Route path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
        {/* END: routes */}
      </>
    </Provider>
  );
}

export default App;
