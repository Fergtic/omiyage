import Skeleton from "react-loading-skeleton"
import {useState, useEffect} from 'react';
import Proptypes from 'prop-types'
import {getSuggestedProfiles } from '../../services/firebase'
import SuggestedProfile from "./suggest-profile";


export default function Suggestions({userId, following, loggedInUserDocId}){
    const [profiles, setProfiles] = useState(null)
    useEffect(() => {
        async function suggestedProfiles(){
            const response = await getSuggestedProfiles(userId, following);
            setProfiles(response)
        }
        if (userId){
            suggestedProfiles();
        }
        console.log("profiles", profiles)
    }, [userId])


    return !profiles ? (
        <Skeleton count={1} height={150} className='mt-5'/>
    ) : profiles.length > 0 ? (
        <div className='round flex flex-col'>
            <div className='text-sm flex items-center algin-items justify-between mb-2'>
                <p>Users</p>
            </div>
            <div className='mt-4 grid gap-5'>
                {profiles.map((profile) =>(
                    <SuggestedProfile
                    key={profile.docId}
                    spDocId={profile.docId}
                    username ={profile.username}
                    profileId={profile.userId}
                    userId = {userId}
                    loggedInUserDocId = {loggedInUserDocId} />
                ))}
            </div>
        </div>
    ):null;


} 


Suggestions.propTypes = {
    userId: Proptypes.string,
    following: Proptypes.array,
    loggedInUserDocId: Proptypes.string
}