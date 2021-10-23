import { useState, useContext } from "react"
import FirebaseContext from "../../context/firebase"
import PropTypes from 'prop-types'
import UserContext from "../../context/user"
import { collection, getDocs, query, where, QuerySnapshot, limit, updateDoc, doc, arrayRemove, arrayUnion } from 'firebase/firestore'


export default function AddComment({docId, comments, setComments, commentInput}){
    const [comment, setComment] = useState('')
    const { firebase, FieldValue} = useContext(FirebaseContext)
    const{
        user: {displayName},

    } = useContext(UserContext)

    const handleSubmitComment = (event) => {
        event.preventDefault();

        setComments([{displayName, comment}, ...comments])
        console.log(comments)
        setComment('')
        const result = doc(FieldValue, 'photos', docId)
        return(
            updateDoc(result, {
                comments: arrayUnion({displayName, comment})
            })
        )
    }

    return(
        <div className = 'border-t border-gray-primary'>
            <form className = ' flex justify-between pl-0 pr-5' method='POST' onSubmit={(event) => comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()}>
                <input
                aria-label='Add a comment'
                autoComplete='off'
                className='text-sm text-gray-base w-full mr-3 py-5 px-4'
                type = 'text'
                name= 'Add a comment'
                placeholder='Add a comment here'
                value={comment}
                onChange = {({target}) => setComment(target.value)}
                ref={commentInput}
                />
                <button 
                className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
                type='button'
                disabled={comment.length < 1}
                onClick={handleSubmitComment}>
                        Post
                </button>
            </form> 

        </div>
    )
}

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired,
}