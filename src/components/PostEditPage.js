import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { useHistory, useParams } from 'react-router-dom';
import PostManipulation from './PostManipulation/PostManipulation';

export default function PostEditPage() {
  const { postId } = useParams();
  const [post, setPost] = useState('');
  const [title, setTitle] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [content, setContent] = useState('');
  const [isSaveButtonDisabled, setSaveButtonDisable] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const request = axios.get(`http://localhost:4000/posts/${postId}`);
    request.then((response)=> {
      
    console.log(response.data,"edit");
    setPost(response.data);
    setContent(response.data.content);
    setTitle(response.data.title);
    setCoverUrl(response.data.coverUrl);
    console.log(response.data,"edit");
    console.log(response.data.title)
    }
    )
    request.catch(()=> console.log("erro")
    )
    
  }, [postId]);

  function onPostSaveButtonClick() { // querems atualizar com o que foi editado
    
    const body = {
      title: title,
      coverUrl: coverUrl,
      content: content
 }
 const request = axios.put("http://localhost:4000/posts/:postId", body);
 request.then((response) => 
 {console.log("deu certo :D", response.data);
 setSaveButtonDisable(true);});
 request.catch(() => console.log("DEU RUIM"));  }

 
 if (!post) return <Spinner />; //se o contante no if funciona
  return (
    <PostManipulation
      title={title}
      onTitleChange={(newTitle) => setTitle(newTitle)}
      coverUrl={coverUrl}
      onCoverUrlChange={(newCoverUrl) => setCoverUrl(newCoverUrl)}
      content={content}
      onContentChange={(newContent) => setContent(newContent)}
      onPostSaveButtonClick={onPostSaveButtonClick}
      postId={postId}
    />
  );
}
