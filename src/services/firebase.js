import { collection, getDocs, query, where, QuerySnapshot, limit, updateDoc, doc, arrayRemove, arrayUnion } from 'firebase/firestore'
import { FieldValue } from '../lib/firebase';




export async function doesUsernameExist(username) {
    const result = collection(FieldValue, 'users')
    const q = query(result, where('username', '==', username.toLowerCase() ))
    const results = await getDocs(q)
    return results.docs.length === 0;
  }

  export async function doesPhotoIdExist(photoId) {
    const result = collection(FieldValue, 'photos')
    const q = query(result, where('photoId', '==', photoId ))
    const results = await getDocs(q)
    return results.docs.length === 0;
  }


export async function getUserByUserId(userId){
    const result = collection(FieldValue, 'users')
    const q = query(result, where('userId', '==', userId))
    const results = await getDocs(q)
    const user = results.docs.map((item) => ({
      ...item.data(),
      docId: item.id
    }));


    return user;

  }


export async function getSuggestedProfiles(userId, following){
  const result = collection(FieldValue, 'users')
  const q = query(result, limit(5));
  const results = await getDocs(q)
  if (following.length > 0){
    return results.docs
      .map((user) => ({ ...user.data(), docId: user.id}))
      .filter((profile) => profile.userId !== userId && !following.includes(profile.userId))
  } else{
    return results.docs
    .map((user) => ({ ...user.data(), docId: user.id}))
    .filter((profile) => profile.userId !== userId)
  }
  
}

export async function updateLoggedInUserFollowing(loggedInUserDocId, profileId, isFollowingProfile){
  const result = doc(FieldValue, 'users', loggedInUserDocId)
  if (isFollowingProfile){
    await updateDoc(result,{
      following: arrayRemove(profileId)
    })
  } else{
    await updateDoc(result, {
      following : arrayUnion(profileId)
    })
  }
  
}



export async function updateFollowedUserFollowers(spDocId, userId, isFollowingProfile){
  const result = doc(FieldValue, 'users', spDocId)
  if (isFollowingProfile){
    await updateDoc(result,{
      following: arrayRemove(userId)
    })
  } else{
    await updateDoc(result, {
      followers : arrayUnion(userId)
    })
  }
}


export async function getPhotos(userId, following){
  const result = collection(FieldValue, 'photos')
  const q = query(result, where('userId', 'in', following))
  console.log("following", following)
  const results = await getDocs(q)
  const userFollowedPhotos = results.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  })) ;

  const photoWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async(photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)){
        userLikedPhoto = true
      }
      const user = await getUserByUserId(photo.userId)
      const { username } = user[0] 
      return {username, ...photo, userLikedPhoto}
    })

    
  );
  return photoWithUserDetails
}