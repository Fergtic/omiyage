import { useParams, useHistory, } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getPostByPostId } from '../../services/firebase';
import Header from './header';
import Image from './Image';
import Content from './content';
import Title from './Title';
import Actions from './actions';
import Comments from './comments';
import MainPostIndex from './main-post-index';
import useUser from '../../hooks/use-user';

export default function MainPost(){

  const {user} = useUser();
  const { photoId } = useParams();
  const [content, setPost] = useState();
  const history = useHistory();


  
  useEffect(() => {
    async function checkPostExists() {
      const postRequest = await getPostByPostId(photoId);
      if(postRequest.length > 0){
        setPost(postRequest[0])
      }
    }

    checkPostExists();
  }, [photoId, history, setPost]);
  console.log("content: ", content)
  

  return content?.photoId ? (
    <div className='bg-gray-background'>
      <MainPostIndex content={content}/>
    </div>
  ) : null ;

  
}


