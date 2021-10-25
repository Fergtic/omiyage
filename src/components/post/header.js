import PropTypes from 'prop-types'
import { useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import {Link} from 'react-router-dom'

export default function Header ({ username, extra }){

    const storage = getStorage();
    const [imageUrl, setUrl] = useState('')
    console.log("username", username)
    getDownloadURL(ref(storage, `images/${username}/profilePic`))
    .then((url) => {
        console.log("url: ", url)
        setUrl(url)
    })
    if(extra === true){
        return(
            <div className='flex border-b border-gray-primary h-4 p-4 py-8'>
                <div className='flex mx-auto'>
                    <Link to={`/p/${username}`} className='flex items-center'>
                        <img 
                        className="rounded-full h-8 w-8 flex mr-3"
                        src={imageUrl}
                        alt={`${username} profile pfp`} 
                        />
                        <p className="font-bold"> {username} </p>
    
                    </Link>
                </div>
    
            </div>
        )
    } else{
    return(
        <div className='flex border-b border-gray-primary h-4 p-4 py-8'>
            <div className='flex items-center'>
                <Link to={`/p/${username}`} className='flex items-center'>
                    <img 
                    className="rounded-full h-8 w-8 flex mr-3"
                    src={imageUrl}
                    alt={`${username} profile pfp`} 
                    />
                    <p className="font-bold"> {username} </p>

                </Link>
            </div>

        </div>
    )
    }
}


Header.protoTypes = {
    username: PropTypes.string.isRequired
}