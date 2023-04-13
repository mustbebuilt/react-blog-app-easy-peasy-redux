import {createContext, useState, useEffect} from 'react';
import {Routes, Route, Link, useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import api from '../api/posts';
const DataContext = createContext({});

export const DataProvider = ({ children}) =>{

    const [posts, setPosts] = useState([  ])
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
        const fetchPosts = async () => {
          try{
            const response = await api.get("/posts")
            setPosts(response.data)
          }catch (err){
            console.dir(err)
        }
        }
        fetchPosts()
    }, [])
  
    useEffect(() => {
      const filteredResults = posts.filter((post) =>
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase()));
  
      setSearchResults(filteredResults.reverse());
    }, [posts, search])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id, title: postTitle, datetime, body: postBody };
        try{
          const response = await api.post("/posts", newPost)
        const allPosts = [...posts, newPost];
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
        navigate('/');
        } catch(err){
          console.dir(err)
        }
      }
    
    const handleEdit = async (id) =>{
      const datetime = format(new Date(), 'MMMM dd, yyyy pp');
      const updatedPost = { id, title: editTitle, datetime, body: editBody };
      try{
        const response = await api.put(`/posts/${id}`, updatedPost)
        // map to create an array where if the post id === current id from endpoint read in all via spread or leave as post
      setPosts(posts.map(post => post.id === id ? {...response.data} : post));
      setEditTitle('')
      setEditBody('')
      navigate('/');
      } catch(err){
        console.dir(err)
      }
    }
    
      const handleDelete = async (id) => {
        try{
          await api.delete(`posts/${id}`)
        const postsList = posts.filter(post => post.id !== id);
        setPosts(postsList);
        navigate('/');
        } catch(err){
          console.dir(err)
        }
      }
  
    return (<DataContext.Provider value={{search, setSearch, posts, handleSubmit, postTitle, setPostTitle, postBody, setPostBody, handleEdit, editBody, setEditBody, editTitle, setEditTitle, handleDelete

}}>
        {children}
        </DataContext.Provider>
        )
}

export default DataContext;

