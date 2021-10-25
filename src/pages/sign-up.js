import { useContext, useState, useEffect } from "react";
import { useHistory, Link} from "react-router-dom"
import * as ROUTES from '../constants/routes'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doesUsernameExist } from "../services/firebase";
import { addDoc, collection } from "firebase/firestore"; 
import { FieldValue } from "../lib/firebase";
import { updateProfile } from "@firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { doesPhotoIdExist } from '../services/firebase';

export default function SignUp(){
    const history = useHistory();
    const auth = getAuth();
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState("")

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [image, setImage] = useState(null)
    const storage = getStorage()
    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === ''|| image === null;
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

    const handleSignUp = async (event) => {
        event.preventDefault();

        const usernameExists = await doesUsernameExist(username);
        console.log(usernameExists)
        if (usernameExists === true){

            try{
                const createdUserResult = createUserWithEmailAndPassword(auth, emailAddress, password)
                .then((userCredentials) => {
                    updateProfile(auth.currentUser,{
                        displayName: username
                    })
                    event.preventDefault()
                    var photoId = createPhotoId()
                    var idExists =  doesPhotoIdExist(photoId)
                    console.log('id exists out side of the loop', idExists)
                    while (idExists === false){
                        photoId = createPhotoId()
                        idExists =  doesPhotoIdExist(photoId)
                        console.log("id inside the loop", idExists)
                    }
                    const uploadTask = ref(storage, `images/${username.toLowerCase()}/profilePic`)
                    uploadBytes(uploadTask, image)
                    
                    addDoc(collection(FieldValue, 'users'), {
                        userId:  userCredentials.user.uid,
                        username: username.toLowerCase(),
                        fullName,
                        emailAddress: emailAddress.toLowerCase(),
                        following: [userCredentials.user.uid],
                        followers: [userCredentials.user.uid],
                        profilePicture: `images/avatars/${username}`,
                        dateCreated: Date.now()
                    })
                    console.log("should be pushing here")
                    history.push(ROUTES.DASHBOARD)
                })
                .catch((error) => {
                    if(error.code === 'auth/email-already-in-use'){
                        setError("Email already in use")
                        setEmailAddress('');
                    }
                    else if(error.code === 'auth/weak-password'){
                        setError("Weak Password, please use a minimum of 6")
                        setPassword('');
                    }
                    else if (error.code === 'auth/invalid-email'){
                        setError("Please use a valid email address")
                        setEmailAddress('');
                    }
                    console.log(error.code)

                })
            } catch (error){
                setFullName('');
                setEmailAddress('');
                setPassword('');
                setUsername('');
                setError(error.message);
            }
        }
        else{
            setFullName('');
            setEmailAddress('');
            setPassword('');
            setUsername('');
            setError('That username is already taken, please try another.');
        }
    }
    

    useEffect(() =>{
        document.title = 'Sign Up - Omiyage';
    }, []);
    return (
        <div className="container flex mx-auto max-w-screen-md justify-center items-center h-screen">
            <div className="flex flex-col">
            <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                {error && <p className='mb-4 text-xs text-red-primary'> {error}</p>}
                <form onSubmit={handleSignUp} method='POST'>
                    <input
                        aria-label="Enter your email address"
                        type="text"
                        placeholder="Email Address"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-1 border border-gray-primary rounded mb-2"
                        onChange={({ target }) => setEmailAddress(target.value)}
                        value={emailAddress}
                    />
                    <input
                        aria-label="Enter your username"
                        type="text"
                        placeholder="Username"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-1 border border-gray-primary rounded mb-2"
                        onChange={({ target }) => setUsername(target.value)}
                        value={username}
                    />
                    <input
                        aria-label="Enter your full name"
                        type="text"
                        placeholder="Full Name"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-1 border border-gray-primary rounded mb-2"
                        onChange={({ target }) => setFullName(target.value)}
                        value={fullName}
                    />
                    <input
                        aria-label="Enter your password"
                        type="password"
                        placeholder="Password"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-1 border border-gray-primary rounded mb-2"
                        onChange={({ target }) => setPassword(target.value)}
                        value={password}
                    />
                    <p className='text-sm text-gray-base'> Please enter your profile picture</p>
                    <input
                        aria-label='Enter your profile picture'
                        type='file'
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-1 border border-gray-primary rounded mb-2"
                        onChange={handleChange}
                        />
                    <button 
                        disabled={isInvalid}
                        type="submit"
                        className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}>
                        Sign Up
                    </button>
                </form>
            </div>
            <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
                    <p className="text-sm">Have an account? {` `}
                    <Link to="/login" className="font-bold text-blue-medium">
                        Login
                    </Link>
                    </p>
            </div>
        </div>
        </div>
    )
}

