import React, { useState, useEffect } from 'react';
import PostList from './PostList/PostList';
import axios from 'axios';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    
    const request = axios.get("http://localhost:4000/posts");
    request.then((response)=> {
    console.log(response.data);
    setPosts(response.data)
    // const dado = [...posts, response.data];
    // setPosts(dado)
  }
    )
    request.catch(()=> console.log("erro")
    ) }
  , []);

  return (
    <PostList name="Daily stories" posts={posts} />
  );
}
