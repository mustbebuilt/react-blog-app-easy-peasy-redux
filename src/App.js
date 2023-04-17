import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import About from "./About";
import Missing from "./Missing";
import { useEffect} from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from "easy-peasy";
import {Routes, Route } from "react-router-dom";

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);

  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts])

  return (
    <div className='App'>

        <Routes>

        <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home isLoading={isLoading} />} />
            <Route path='/about' element={<About />} />
            <Route path='/post/:id' element={ <PostPage  />} />
            <Route path='/edit/:id' element={<EditPost />} />
        </Route> 
        <Route path='/post' element={<NewPost />} />
          
        <Route path='/*' element={<Missing />} />

        </Routes>
  
    </div>
  );
}

export default App;
