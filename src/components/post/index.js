import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Image from './Image'
import Content from "../post/content";
import Title from './Title';
import Actions from './actions'
import Comments from './comments';

export default function Post( { content }){

  
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();

    return(
        <div className='rounded col-span-4 border bg-white border-rounded border-gray-primary mb-8'>
            <Header username={content.username}/>
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-start h-full ">
                  <div className="text-gray-700 text-center flex items-center align-items cursor-pointer  w-3/12">
                    <h1 className="flex justify-center w-full pt-2 ">
                    <Image src={content.imageSrc} title={content.title}/>
                    </h1>
                  </div>
                  <div className=' col-span-1 w-9/12'>
                        <h1 className="text-gray-700 text-center flex align-items font-bold text-xl pt-1">
                        <Title title={content.title}/>
                        </h1>
                        <Actions 
                        docId = {content.docId}
                        totalLikes = {content.likes.length}
                        likedPhoto = {content.userLikedPhoto}
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
                        commentInput = {commentInput}/>
                
 
                
            </div>
              
        </div>
            
    )
}


Post.propTypes = {
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.string.isRequired,
        likes: PropTypes.string.isRequired,
        comments: PropTypes.string.isRequired,
        dateCreated: PropTypes.string.isRequired,
    })
}