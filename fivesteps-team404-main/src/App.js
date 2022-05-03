import React from 'react';
import './css/bootstrap.css'; //eerst bootstrap daarna custom css
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/navbar';


//pages
import Organisations from './Components/Organisations';
import Organisation from './Components/Organisation';
import EditOrganisation from './Components/EditOrganisation';
import NotFound from './Components/NotFound';


function App() {
  return (
    <Router>
    <Navbar/>
      <div className="wrapper">
        <div className="container">
          <Routes>
            <Route index element={<main><h1>Welkom!</h1></main>}></Route>
            <Route path="/klanten">
              <Route index element={<Organisations />}></Route>
              <Route path=":organisationId" element={<Organisation />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}
//test
export default App;