import { useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"
import * as ROUTES from '../constants/routes'
import {getAuth, signOut} from '@firebase/auth'

export default function Header(){
    const { firebase } = useContext(FirebaseContext)
    const { user } = useContext(UserContext)
    const auth = getAuth();
    const history = useHistory()
    

    return(
        <header className='h-16 bg-whte border-b border-b border-gray-primary mb-8'>
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-between h-full">
                  <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
                    <h1 className="flex justify-center w-full">
                        <Link to={ROUTES.DASHBOARD} aria-label="Omiyage logo">
                            <img src="/images/OMIYAGE-logo.png" alt="Omiyage" className="mt-2 w-6/12" />
                        </Link>
                    </h1>
                  </div>
                  <div className="text-gray-700 text-center flex items-center align-items">
                    {user ? (
                        <>
                        <Link to={ROUTES.MAKE_POST} aria-label='Make a post'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 mr-6 text-black-light cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg> 
                        </Link>
                        <Link to={ROUTES.DASHBOARD} aria-label='Dashboard'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 mr-6 text-black-light cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        </Link>
                        <button
                        type='button'
                        title='Sign Out'
                        onClick={() =>{
                            signOut(auth).then(() =>{
                                history.push(ROUTES.DASHBOARD)
                                
                            }).catch((error) =>{
                                console.log(error.code)
                            });
                        }} 
                        onKeyDown={(event) => {
                            if (event.key === 'Enter'){
                                signOut(auth).then(() =>{
                                    history.push(ROUTES.DASHBOARD)
                                }).catch((error) => {
                                    console.log(error.code)
                                })
                            }
                        }}
                        >  
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 mr-6 text-black-light cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        
                        
                        </button> 
                        </>
                    ) : (
                        <>
                            <Link to={ROUTES.LOGIN}>
                                <button 
                                type = 'button'
                                className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"> LOGIN </button>
                            </Link>
                            <Link to={ROUTES.SIGN_UP}>
                                <button 
                                type = 'button'
                                className = "font-bold text-sm rounded text-blue-medium w-20 h-8"> SIGNUP </button>
                            </Link>
                        </>
                    )}
                       
                    </div>
                </div>
            </div>

        </header>
    )
    
}