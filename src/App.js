// import logo from './logo.svg';
import './App.css';

import React from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";

const App = ()=>{


  const pageSize=6
  const apiKey = process.env.REACT_APP_NEWS_API
  
    return (
      <div>
        <Router>
        <Navbar></Navbar>
      //   {/* <LoadingBar
      //   color='#f11946'
      //   progress={10}
        
      // /> */}
        <Routes>
          <Route exact path="/"  element={<News key="general" pageSize={pageSize} apiKey={apiKey}  country="in" category="general"/>}/>
          <Route exact path="/business"  element={<News key="business" pageSize={pageSize} apiKey={apiKey} country="in" category="business"/>}></Route>
          <Route exact path="/entertainment"  element={<News key="entertainment" pageSize={pageSize} apiKey={apiKey} country="in" category="entertainment"/>}></Route>
          <Route exact path="/health"  element={<News key="health" pageSize={pageSize} apiKey={apiKey} country="in" category="health"/>}></Route>
          <Route exact path="/science"  element={<News key="science" pageSize={pageSize} apiKey={apiKey} country="in" category="science"/>}></Route>
          <Route exact path="/sports"  element={<News key="sports" pageSize={pageSize} apiKey={apiKey} country="in" category="sports"/>}></Route>
          <Route exact path="/technology"  element={<News key="technology" pageSize={pageSize} apiKey={apiKey} country="in" category="technology"/>}></Route>
          
        </Routes>
        </Router>
      </div>
    )
  }
export default App


