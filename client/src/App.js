import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import FormData from './components/FormData';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/form/:type" element={<Form/>} />
        <Route path='/data' element={<FormData/>}/>
        </Routes>
    </Router>
  );
};

export default App;
