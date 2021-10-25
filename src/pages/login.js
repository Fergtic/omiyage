import { useContext, useState, useEffect } from "react";
import { useHistory, Link} from "react-router-dom"
import FirebaseContext from "../context/firebase";
import * as ROUTES from '../constants/routes'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";




export default function Login(){
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext)
    const auth = getAuth();
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState("")

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleLogin = async (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, emailAddress, password)
            .then((userCredential) => {
                history.push(ROUTES.DASHBOARD)
            })
            .catch ((error) => {
                setEmailAddress('');
                setPassword('');
                setError("Invalid Email or Password");
            });
    };
    

    useEffect(() =>{
        document.title = 'Login - Omiyage';
    }, []);
    return (
        <div className="container flex mx-auto max-w-screen-md justify-center items-center h-screen">
            <div className="flex flex-col">
            <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                {error && <p className='mb-4 text-xs text-red-primary'> {error}</p>}
                <form onSubmit={handleLogin} method='POST'>
                    <input
                        aria-label="Enter your email address"
                        type="text"
                        placeholder="Email Address"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-1 border border-gray-primary rounded mb-2"
                        onChange={({ target }) => setEmailAddress(target.value)}
                        value={emailAddress}
                    />
                    <input
                        aria-label="Enter your password"
                        type="password"
                        placeholder="Password"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-1 border border-gray-primary rounded mb-2"
                        onChange={({ target }) => setPassword(target.value)}
                        value={password}
                    />
                    <button 
                        disabled={isInvalid}
                        type="submit"
                        className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}>
                        Login
                    </button>
                </form>
            </div>
            <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
                    <p className="text-sm">Don't have an account? {` `}
                    <Link to="/sign-up" className="font-bold text-blue-medium">
                        Sign Up
                    </Link>
                    </p>
            </div>
        </div>
        </div>
    )
}

