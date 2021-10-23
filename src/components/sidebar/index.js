import useUser from "../../hooks/use-user"
import User from './user';
import Suggestions from './suggestions'
import Content from "../post/content";

export default function Sidebar(){
    const {
        user: { fullName, username, userId, following, docId }
    } = useUser();
    console.log("docId", docId)
    return(
        <div className='p-4'>
            <User username ={username} fullName={fullName} /> 
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/> 
        </div>
        );
}