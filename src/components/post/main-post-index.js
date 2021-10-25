import { useParams, useHistory, } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getPostByPostId } from '../../services/firebase';
import Header from './header';
import Image from './Image';
import Content from './content';
import Title from './Title';
import Actions from './actions';
import Comments from './comments';
import useAuthListener from '../../hooks/use-auth-listener';
import { getUserByUserId } from '../../services/firebase';

export default function MainPostIndex ({content}){
    const commentInput = useRef(null);
    const { user } = useAuthListener();
    const [userLiked, setUserLiked] = useState(false)
    const [displayName, setDisplayName]= useState('')
    const handleFocus = () => commentInput.current.focus();
    useEffect(() => { 
        async function getUserName(){
            const username = await getUserByUserId(content.userId)
            setDisplayName(username[0].username)
            document.title = `${username[0].username}'s post - Omiyage`;
        }
        getUserName()
        console.log("userId", user.uid)
        console.log("username in the index", displayName)
        console.log("content", content)
        if(content.likes.includes(user.uid)){
            setUserLiked(true)
        }else{
            setUserLiked(false)
        }
        
    }, [user, content])
    console.log("userLiked", userLiked)
    return(
        <div className='rounded col-span-4 border bg-white border-rounded border-gray-primary mb-8'>
            <Header username={displayName} extra={true}/>
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-start h-full ">
                  <div className="text-gray-700 text-center flex items-center align-items cursor-pointer  w-3/12">
                    <h1 className="flex justify-center w-full pt-2 ">
                    <Image src={content.imageSrc} title={content.title}/>
                    </h1>
                  </div>
                  <div className=' col-span-1 w-9/12 pl-2'>
                        <h1 className="text-gray-700 text-center flex align-items font-bold text-xl pt-1">
                        <Title title={content.title}/>
                        </h1>
                        <Actions 
                        docId = {content.docId}
                        totalLikes = {content.likes.length}
                        likedPhoto = {userLiked}
                        handleFocus = {handleFocus}/>
                        <div className=''>
                             <Content className = ''mesContent={content.mesContent}/>
                        </div>
                       
                        
                  </div>
                    
                </div>
                <Comments
                        content = {content}
                        docId = {content.docId}
                        comments = {content.comments}
                        dateCreated = {content.dateCreated}
                        commentInput = {commentInput}
                        photoId = {content.photoId}
                        showExtra = {true}/>
                
    
                
            </div>
              
        </div>
            
    )
    
}