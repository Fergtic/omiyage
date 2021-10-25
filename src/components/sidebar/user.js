import PropTypes from 'prop-types';
import {memo } from 'react';
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';
import { useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage"



export default function User({username, fullName}){
    const storage = getStorage();
    const [imageUrl, setUrl] = useState('')
    getDownloadURL(ref(storage, `images/${username}/profilePic`))
    .then((url) => {
        console.log("url: ", url)
        setUrl(url)
    })

    if (!username || !fullName ){
        return <Skeleton count={1} height={61} />
    } else{
        return(
            <Link to={`/p/${username}`} className='grid grid-cols-4 gap-4 mb-6 items-center'>
            <div className='flex items-center justify-between col-span-1'>
                <img
                className="w-16  h-16 flex mr-3 rounded-full"
                src={imageUrl}
                alt=''>
                </img> 
    
            </div>
            <div className='cols-span-3'> 
                <p className='font-bold text-sm'> {fullName}</p> 
                <p className='text-sm'> {username}</p> 
            </div>
         </Link>   
        )
    }
}



User.propTypes= {
    username: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired
}