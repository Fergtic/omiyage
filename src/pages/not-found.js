import { useEffect } from 'react';


export default function(NotFound){

    useEffect(() => {
        document.title = 'Omiyage - Page Not Found'
    })

    return(
        <div className= 'bg-gray-background'>
            <div className="jsutify-content align-center">
                <p className="text-center text-2xl"> "Not Found!" </p>
            </div>
        </div>
    )
}