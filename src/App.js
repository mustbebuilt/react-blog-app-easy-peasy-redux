import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import About from "./About";
import Missing from "./Missing";
import {Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';
import { DataProvider } from "./context/DataContext";

function App() {
  

  return (
    <div className='App'>
<DataProvider>
        <Routes>
        <Route path='/' element={<Layout />}>
       <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/post/:id' element={ <PostPage  />} />
            <Route path='/edit/:id' element={<EditPost />} />
          </Route> 
          <Route path='/post' element={<NewPost />} />
          
          <Route path='/*' element={<Missing />} />
        </Routes>
        </DataProvider>
    </div>
  );
}

export default App;
