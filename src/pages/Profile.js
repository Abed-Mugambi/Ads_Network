import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import {QuerySnapshot, doc, onSnapshot, orderBy, updateDoc} from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage, auth } from '../firebaseConfig';
import {FaUserAlt} from 'react-icons/fa'
import {FaCloudUploadAlt} from 'react-icons/fa'
import moment from 'moment';
import {collection, getDocs, query, where} from 'firebase/firestore';
import AdCard from '../components/AdCard';
import useSnapshot from "../utils/useSnapshot";



const monthAndYear = date => 
`${moment(date).format('MMMM').slice(0.3)} ${moment(date).format('YYYY').slice(0.3)}`

const Profile = () => {
    const { id } = useParams();
    // const [user, setUser] = useState();
    const [img, setImg]= useState("");
    const [ads, setAds] = useState([]);

    const  { val:user }= useSnapshot("users", id);

    // const getUser = async () => {
    // //   const docSnap =   await getDoc(doc(db, 'users', id))
    // //   if(docSnap.exists()) {
    // //     setUser(docSnap.data());
    // //   }
    // const unsub = onSnapshot(doc(db, 'users', id), 
    // querySnapshot => setUser(querySnapshot.data()))

    // return () => unsub();
    // };

   

    const uploadImage= async () => {
        // create img ref
        const imgRef= ref(storage, `profile/${Date.now()} - ${img.name}`);
        if(user.photoURL){
            await deleteObject(ref(storage, user.photoPath));
        }
        // upload img

        const result = await uploadBytes(imgRef, img);
        // get download url
        const url = await getDownloadURL(ref(storage, result.ref.fullPath))
        // update user doc
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            photoURL: url,
            photoPath: result.ref.fullPath
        });
        setImg("");
    };

    const getAds = async () =>{
        // create collection ref
        const adsRef = collection(db, 'ads')
        // execute query
        const q = query(adsRef, where('postedBy', '==', id), orderBy('publishedAt', 'desc'))
        // get data frm db
        const docs = await getDocs(q);
        let ads =[]
        docs.forEach(doc => {
            ads.push({...doc.data(), id: doc.id})
        });
        setAds(ads);
    }

    useEffect(() => {
        // getUser();
        if (img) {
            uploadImage();
        }
        getAds();
        // console.log(ads);
    }, [img]);

    const deletePhoto= async () => {
        const confirm= window.confirm('Delete photo permanently?')
        if(confirm) {
            await deleteObject(ref(storage, user.photoPath));
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                photoURL: "",
                photoPath:"",
            });
        }
    }
    

  return user?  (
    <div className='mt-5 container row'>
        <div className='text-center col-sm-2 col-md-3'>
            {/* display image */}
            {user.photoURL ? (
            <img
             src={user.photoURL} 
            alt={user.name} 
            style={{width: '100px', height: '100px', borderRadius: '50%'}} 
            />
            ) : (
                <FaUserAlt size={50} />
            )}

            <div className="dropdown my-3 text-center">
                <button 
                className="btn btn-secondary btn-sm dropdown-toggle" 
                type="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false">
                   EDIT
                </button>

                <ul className="dropdown-menu">
                    <li>
                        <label htmlFor='photo' className='dropdown-item btn'>
                            <FaCloudUploadAlt size={30} /> Upload Photo
                        </label>
                        <input 
                        type='file'
                        id='photo'
                        accept='image/*'
                        style={ {display: "none" }}
                        onChange={e=> setImg(e.target.files[0])}
                            />
                    </li>
                    {user.photoURL ? (

                    <li className='dropdown-item btn' onClick={deletePhoto}>
                       Remove Photo
                    </li>
                    ): null }
                    
                    
                </ul>
            </div>
            <p>Member Since {monthAndYear(user.createdAt.toDate())}</p>
        </div>

        <div className='col-sm-10 col-md-9'>
            <h3>{user.name}</h3>
            <hr />

            {ads.length ? (<h4>Published ADS</h4>) : (<h4>There are NO ads published by this user</h4>) }
            <div className='row'>
                {ads?.map(ad => <div key={ad.id} className='col-sm-6 col-md-4 mb-3'> 
                <AdCard ad={ad} />
                </div> )}
            </div>

        </div>
    
    </div>
  ): null;
};

export default Profile