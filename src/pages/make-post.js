import {useState, useEffect, useContext} from 'react'
import { collection, addDoc, getDocs, query, where, QuerySnapshot, limit, updateDoc, doc, arrayRemove, arrayUnion } from 'firebase/firestore'
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import { useHistory } from 'react-router';
import { doesPhotoIdExist } from '../services/firebase';
import usePhotos from '../hooks/use-photos'
import * as ROUTES from '../constants/routes'
import * as fs from 'fs'

import useAuthListener from "../hooks/use-auth-listener";
import { getStorage, ref, uploadBytes } from "firebase/storage";


export default function CreatePost(){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null)
    const isInvalid = title === '' || content === '' || image === null;
    const history = useHistory();
    const storage = getStorage()
    const {
        user: {uid: userId= '' }
    } = useContext(UserContext)
    
    
    const { user } = useAuthListener();
    console.log("user", {user})
    const { firebase, FieldValue} = useContext(FirebaseContext)


    const createPhotoId = () => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    
    const handleChange = e => {
        if (e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handlePost = async (event) => {
        event.preventDefault()
        var photoId = createPhotoId()
        var idExists = await doesPhotoIdExist(photoId)
        console.log('id exists out side of the loop', idExists)
        while (idExists === false){
            photoId = createPhotoId()
            idExists = await doesPhotoIdExist(photoId)
            console.log("id inside the loop", idExists)
        }
        console.log("username", user.displayName)
        const metadata = {
            photoId: photoId
        }
        const uploadTask = ref(storage, `images/${user.displayName}/posts/${image.name}`, metadata)
        uploadBytes(uploadTask, image)
        return(
            addDoc(collection(FieldValue, 'photos'), {
                dateCreated: Date.now(),
                userId: userId,
                mesContent: content,
                title: title,
                imageSrc: `images/${user.displayName}/posts/${image.name}`,
                photoId: photoId,
                likes: [],
                comments: []
                
            }),
            history.push(ROUTES.DASHBOARD)
       )

       


    }

    return(
        <div className className='container flex mx-auto max-w-screen-md justify-center items-center h-screen'>
            <div className='flex flex-col'>
                <div className='flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded'>
                    <form onSubmit={handlePost} method='POST'>
                        <input
                        aria-label='Enter your post title'
                        type='text'
                        placeholder='Please enter the title of your post here'
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-1 border border-gray-primary rounded mb-2"
                        onChange={({ target }) => setTitle(target.value)}
                        value={title}
                        />
                        <input
                        aria-label='Enter your post content'
                        type='text'
                        placeholder='Please enter the content of your post here'
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-1 border border-gray-primary rounded mb-2"
                        onChange={({ target }) => setContent(target.value)}
                        value={content}
                        />
                        <input
                        aria-label='Enter your post photo'
                        type='file'
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-1 border border-gray-primary rounded mb-2"
                        onChange={handleChange}
                        />
                        <button 
                        disabled={isInvalid}
                        type="submit"
                        className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}>
                        Make Post
                    </button>
                    </form>
                </div>

            </div>
        </div>
    )
}