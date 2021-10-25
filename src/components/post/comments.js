import {useState} from 'react'
import {PropTypes} from 'prop-types'
import {formatDistance } from 'date-fns'
import {Link, useHistory}  from 'react-router-dom'
import AddComment from './add-comment'
import usePostListener from '../../hooks/use-post-listener'
import * as ROUTES from '../../constants/routes'

export default function Comments({ content, docId, comments: allComments, dateCreated, commentInput, photoId, showExtra }){
    
    const [comments, setComments] = useState(allComments);
    const history = useHistory();
    if (comments === undefined){
      console.log("it was undefined")
      return(
        <AddComment
        docId ={docId}
        comments = {comments}
        setComments = {setComments}
        commentInput={commentInput}/>
      )
    }else if (showExtra === false){
      
      return(
        <>
        <div className = 'pl-5 pb-3'>
          
            {comments.length >= 1 && (
              <button
              className='text-sm font-bold text-gray-base mb-1 cursor-pointer'
              type='button'
              >
                <Link
                  to={{
                      pathname: `/m/${photoId}`
                       // your data array of objects
                      }}
                >
                  View all comments
                  </Link>

              </button>
            
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
    }else{
      return(
        <>
        <p className="text-gray-base uppercase text-xs mt-2 pl-5 pb-2">
          {formatDistance(dateCreated, new Date())} ago
        </p>
        <AddComment
        docId ={docId}
        comments = {comments}
        setComments = {setComments}
        commentInput={commentInput}/>
        <div className = 'pl-5  pt-2 pb-3'>
            {comments.map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        </div>
        
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