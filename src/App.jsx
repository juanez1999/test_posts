import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { initializeApp } from 'firebase/app';
import {firebaseConfig} from './utils/baseConfig';
import { Provider } from 'react-redux'
import store from './redux/store'
import { Home } from "./pages/Home";
import { CreatePost } from "./pages/CreatePost";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import {setUser} from './redux/actions/setUser'
import { useNavigate  } from "react-router-dom";

const app = initializeApp(firebaseConfig);

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const setNewUser = userId => dispatch(setUser(userId));
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if(user) {
  //       setNewUser(user.uid);
  //       return navigate('/post');
  //     };    
  //   })
  // }, []);
  
  return (
    <div className="App">
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />}>
            </Route>
            <Route element={<Login />} exact path="/login">
            </Route>
            <Route element={<Register />} exact path="/register" >
            </Route>
            <Route element={<Home/>} exact path="/post" >
            </Route>
            <Route element={<CreatePost />} path='/post/new' />
          </Routes>
        </Provider>
    </div>
  );
}

export default App;
