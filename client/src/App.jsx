import './App.css';
import { Routes, Route, useNavigate, Redirect, useParams, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Tvseries from './pages/Tvseries';
import Movie from './pages/Movie';
import Profile from './pages/Profil';
import Pay from './pages/Pay';
import AddEpisode from './admin/AddEpisode';
import AddFilm from './admin/AddFilm';
import Detailfilm from './pages/Detail';
import ListFilmAdmin from './admin/ListFilm';
import MainMenu from './pages/MainMenu';
import ListTransaksi from './admin/ListTransaksi';

import { connect } from 'react-redux';
import {useContext, useEffect} from 'react'
import {UserContext} from './context/UserContext'
import DetailAdmin from './admin/DetailAdmin';
import {API, setAuthToken} from './config/api'
import ModalLogin from './Components/ModalLogin';
import Cardtv from './Components/CardTvSeries';
import DetailfilmAdmin from './pages/Detail';
import CardFilm from './admin/CardFilm';
import { MdConnectWithoutContact } from 'react-icons/md';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const PrivateRoute = ({ children, role, user, isLogin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin && role.includes(user) ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

function App(props) {
  
  const {user, isLogin} = props

  let navigate = useNavigate();
  let { id } = useParams();
  const [state, dispatch] = useContext(UserContext);
  console.clear();
  // console.log(state);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }  
    
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
  
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }
  
      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;
  
      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (localStorage.token) {
      checkUser();}
  }, []);

  
  return (
    <>
  
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movie />} />
      <Route path="/tv-series" element={
      
          <Tvseries />
       
      
      } />
      <Route path='/profile' element={<Profile />} />
      <Route path='/pay' element={<Pay />}/>
      <Route path='/add-episode' element={<AddEpisode />}/>
      <Route path='/add-film' element={<AddFilm />}/>
      <Route path='/list-film' element={<ListFilmAdmin />}/>
      <Route path='/home' element={<MainMenu />}/>
      <Route path='/list-transaction' element={<ListTransaksi />}/>
      <Route path='/login' element={<ModalLogin />}/>


      {/*  */}

      
      <Route path='/card/:id' element={<CardFilm />}/>
      <Route path='list-film/detail-film-admin/:id' element={<DetailAdmin />}/>


      {/*  */}


      <Route path='/detail-film/:id' element={<Detailfilm />}/>
      <Route path='/card-tv/:id' element={<Cardtv />}/>
    </Routes>   
    </>
  );
}

const mapStateToProps = (state) =>{
  return{
  isLogin: state.authReduce.isLogin,
  user: state.authReduce.user
}
}

export default App;
