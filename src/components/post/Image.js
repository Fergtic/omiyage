import PropTypes from 'prop-types'
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { useState } from 'react';
export default function Image({ src, title }){
    const storage = getStorage();
    const [imageUrl, setUrl] = useState('')
    getDownloadURL(ref(storage, src))
    .then((url) => {
        console.log("url: ", url)
        setUrl(url)
    })
    return <img src={imageUrl} alt = {title} className='object-contain h-40 w-full' />;
}


Image.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}