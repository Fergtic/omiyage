import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/index";
import Timeline from "../components/timeline";
import Header from "../components/header";
import useAuthListener from "../hooks/use-auth-listener";

export default function Dashboard(){
    //const {user, setActiveUser} = useUser(loggedInUser.uid);
    const { user } = useAuthListener();
    
    const [showResults, setShowResults] = useState(false)


    useEffect(() => {
        document.title = 'Anon'
    }, [])
    if(user) {
        return(
            <div className="bg-gray-background">
                <Header/>
                <div className ="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">   
                    <Timeline/>
                    <Sidebar/>
                </div>
    
            </div>
        )
    }else{
        return(
            <div className="bg-gray-background">
                <Header/>
                <div className ="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">   
                    <Timeline/>
                </div>
    
            </div>
        )
    }

}