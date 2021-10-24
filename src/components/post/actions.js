import { useState, useContext } from 'react';
import PropTypes from 'prop-types'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'
import { collection, getDocs, query, where, QuerySnapshot, limit, updateDoc, doc, arrayRemove, arrayUnion } from 'firebase/firestore'


export default function Actions({ docId, totalLikes, likedPhoto, handleFocus }){
    const {
        user: {uid: userId= '' }
    } = useContext(UserContext)

    console.log("in theactions", likedPhoto)

    const [toggleLiked, setToggledLiked] = useState(likedPhoto);
    const [likes, setLikes] = useState(totalLikes);
    const { firebase, FieldValue } = useContext(FirebaseContext);

    const handleToggleLiked = async () => {
        setToggledLiked((toggleLiked) => !toggleLiked);

        const result = doc(FieldValue, 'photos', docId)
            if (toggleLiked) {
                await updateDoc(result, {
                    likes: arrayRemove(userId)
                })
            } else{
                console.log("hello")
                await updateDoc(result, {
                    likes: arrayUnion(userId)
                })
            }
        
            
        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1))
        
    };

    return(
        <>
            <div className='flex justify-between pl-1 pt-2'>
                <div className='flex'>
                    <svg onClick={handleToggleLiked} onKeyDown={(event) => {
                        handleToggleLiked()
                    }} xmlns="http://www.w3.org/2000/svg" className={`w-8 mr-4 select-none cursor-pointer focus:outline-none ${toggleLiked ? 'fill-red text-red-primary' : 'text-black-light'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <svg
                        onClick={handleFocus}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            handleFocus();
                          }
                        }}
                        className="w-8 text-black-light select-none cursor-pointer focus:outline-none"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        tabIndex={0}
                        >         
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                        </svg>
                </div>
            </div>
            <div className="pl-1 py-0">
                <p className="font-bold">{likes === 1 ? `${likes} like` : `${likes} likes`}</p>
            </div>
        </>
    )


}


Actions.propTypes = {
    docId: PropTypes.string.isRequired,
    toalLikes: PropTypes.number.isRequired,
    likedPhotos: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired,
    
}