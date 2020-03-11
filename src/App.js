import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { axiosWithAuth } from './utils/axiosWithAuth';
import { useLocalStorage } from './components/CustomHooks';
import { ToastContainer, toast } from "react-toastify";
import Dashboard from "./components/Dashboard";
import Register from "./components/Onboarding/Register";
import Login from "./components/Onboarding/Login";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";


const App = () => {

  const [ plants, setPlants ] = useState([]); //All the plants for the user
  const [ isLoading, setLoadingIndicator ] = useState(false); //Loading Indicator
  const [ isModalOpen, setModalOpen ] = useState(false); //Modal Toggle
  const [ isAuthenticated, setIsAuthenticated ] = useLocalStorage('isAuthenticated', false); //Is User Authenticated (for private routes)
  const [ currentUser, setCurrentUser ] = useLocalStorage('username', ''); //Current Logged In User
  const [ currentUserID, setCurrentUserID ] = useLocalStorage('userID', ""); //UserID for current loggedIn user. Used to post requests
  const [ token, setToken ] = useLocalStorage('token', ''); //User Token. Set to local storage during log in
  const [ newPlant, setNewPlant ] = useState(null); //Object to detect if a new plant is added and what should happen after


  const addCurrentUser = (user) => {
    setCurrentUser(user);
  }

  const addToken = (token) => {
    setToken(token);
  }

  const toggleAuthentication = () => {
    setIsAuthenticated(!isAuthenticated)
  }

  const toggleLoading = (bool) => {
    setLoadingIndicator(bool);
  }

  const showModal = (e) => {
    e.preventDefault();
    setModalOpen(!isModalOpen);
  }

  const notify = (msg, type) => {
    toast[`${type}`](msg, {
      position: "top-right"
    });
  }

  const addPlant = ( newPlant ) => {
    axiosWithAuth()
      .post("api/plants", newPlant)
      .then(res => {
        setNewPlant(res.data);
        toggleLoading(false);
        notify('New Plant Added', 'success')
      })
      .catch(err => notify('Unsuccessful! Try Again', 'error'))
  }

  const deletePlant = (plantid) => {
    toggleLoading(true);
    axiosWithAuth()
      .delete(`api/plants/${plantid}`)
      .then(res => {
        toggleLoading(false);
        notify('Plant Deleted', 'success')
      })
      .catch(err => notify('Unsuccessful! Try Again', 'error'))
  }

  const userID=localStorage.getItem("userID")
  
  useEffect(() => {
    if(currentUser !== '') {
      axios
        .get(`https://api-watermyplants.herokuapp.com/api/users/${userID}/plants`)
        .then(res => {
          setPlants(res.data)
          console.log(res)
          toggleLoading(false);
        })
        .catch(err => notify('Unsuccessful! Refresh page', 'error'))
    }
  }, [currentUser, newPlant])



  return (   
    <>   
      <Switch>
        <Route 
          path="/register" 
          render={(props) => <Register
            notify={notify} 
            isLoading={isLoading}
            toggleLoading={toggleLoading}
            {...props} 
          />}
        />

        <Route 
          path="/login" 
          render={(props) => <Login 
            notify={notify}
            addToken={addToken} 
            isLoading={isLoading}
            toggleLoading={toggleLoading}
            toggleAuthentication={toggleAuthentication} 
            addCurrentUser={addCurrentUser} 
            currentUser={currentUser} {...props} 
          />}
        />

        <Route path="/" render={
              props => isAuthenticated ? (
                  <Dashboard
                    {...props}
                    notify={notify}
                    plants={plants}
                    addPlant={addPlant}
                    deletePlant={deletePlant}
                    currentUser={currentUser}
                    currentUserID={currentUserID}
                    isLoading={isLoading}
                    toggleLoading={toggleLoading}
                    isModalOpen={isModalOpen}
                    showModal={showModal}
                    toggleAuthentication={toggleAuthentication}
                  />
                ) : (
                  <Redirect to={{ pathname: "/login" }} />
                )
            }
          />
      </Switch>
      <ToastContainer />
    </>
  );
}

export default App;

