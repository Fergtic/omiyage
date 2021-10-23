import {useState} from 'react'
import {PropTypes} from 'prop-types'
import {formatDistance } from 'date-fns'
import {Link}  from 'react-router-dom'
import AddComment from './add-comment'

export default function Comments({ content, docId, comments: allComments, dateCreated, commentInput }){
    
    const [comments, setComments] = useState(allComments);
    
    if (comments === undefined){
      console.log("it was undefined")
      return(
        <AddComment
        docId ={docId}
        comments = {comments}
        setComments = {setComments}
        commentInput={commentInput}/>
      )
    }else{
      
      return(
        <>
        <div className = 'pl-5  pt-2 pb-3'>
            {comments.length >= 1 && (
                <p className='text-sm font-bold text-gray-base mb-1 cursor-pointer'>
                    View all comments
                </p>
            
            )}
            {comments.slice(0, 1).map((item) => (
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
        <AddComment
        docId ={docId}
        comments = {comments}
        setComments = {setComments}
        commentInput={commentInput}/>
        </>
        
    )
    }
    
}

Comments.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired,
}