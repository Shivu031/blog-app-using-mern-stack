import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Post from '../post/Post';
import axios from 'axios';
import { useAuth } from '../../store/auth';

const SearchPosts = () => {
    const [posts, setPosts] = useState([]);
    const {users} = useAuth();
    const location = useLocation();
    console.log(useLocation())
    const query = new URLSearchParams(location.search).get('q');
    console.log(query)

    useEffect(() => {
        const getSearchPosts = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:5000/api/posts/search/q?query=${query}`);
                setPosts(res.data);
            } catch (error) {
                console.error('Failed to get search results:', error);
            }
        };

        if (query) {
            getSearchPosts();
        }
    }, [query]);

  return (
    <>
      <div className="posts">
        {posts.length ? (
            posts.map((p) => (
            <Post
            key={p._id}
            post={p}
            authorDetails={users.find((u) => u._id === p.author)}
            />
        ))
        ): (
            <h2>No results found for {query}</h2>
        )}
      </div>
    </>
  )
}

export default SearchPosts
