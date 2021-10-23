import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Header from '../components/header'
import Image from '../components/post/Image'
import Content from '../components/post/content'
import Title from '../components/post/Title'
import Actions from '../components/post/actions'
import Comments from '../components/post/comments'
import {formatDistance } from 'date-fns'
import {Link}  from 'react-router-dom'
import usePhotos from '../hooks/use-photos'

export default function MainPost(){
    const { photos } = usePhotos();
    const { content } = photos.map()
    const Comments = ({ content, docId, comments: allComments, dateCreated, commentInput }) => {
        const [comments, setComments] = useState(allComments);
        return(
            <>
            <div className = 'pl-5  pt-2 pb-3'>
                {comments.length >= 1 && (
                    <p className='text-sm font-bold text-gray-base mb-1 cursor-pointer'>
                        View all comments
                    </p>
                
                )}
                {comments.map((item) => (
              <p key={`${item.comment}-${item.displayName}`} className="mb-1">
                <Link to={`/p/${item.displayName}`}>
                  <span className="mr-1 font-bold">{item.displayName}</span>
                </Link>
                <span>{item.comment}</span>
              </p>
            ))}
            <p className="text-gray-base uppercase text-xs mt-2">
              {formatDistance(dateCreated, new Date())} ago
            </p>
            </div>
            </>
        )
    }
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


MainPost.propTypes = {
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