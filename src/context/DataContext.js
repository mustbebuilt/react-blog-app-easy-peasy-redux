import {createContext, useState, useEffect} from 'react';
import api from '../api/posts';
const DataContext = createContext({});

export const DataProvider = ({ children}) =>{

    const [posts, setPosts] = useState([  ])
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
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


    

    

  
    return (<DataContext.Provider value={{search, setSearch, searchResults, posts, setPosts
}}>
        {children}
        </DataContext.Provider>
        )
}

export default DataContext;

