import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Moment from "react-moment";
import { db, auth } from '../firebaseConfig';
import useSnapshot from "../utils/useSnapshot";
import { toggleFavorite } from "../utils/fav"
import {doc, onSnapshot, updateDoc} from "firebase/firestore";
import Sold from "./Sold";
 
const AdCard = ({ ad }) => {

  // const [users, setUsers] = useState([]);

  const { val } = useSnapshot("favorites", ad.id);
 
  const adLink = `/${ad.category.toLowerCase()}/${ad.id}`;


  // useEffect(() => {
  //   const docRef = doc(db, "favorites", ad.id);
  //   const unsub = onSnapshot(docRef, (querySnapshot) => setUsers(querySnapshot.data().users) );

  //   return () => unsub();

  // }, []);

  // console.log(users);

  
  // const toggleFavorite = async () => {
  //   let isFav = users.includes(auth.currentUser.uid);

  //   await updateDoc(doc(db, "favorites", ad.id), {
  //     users: isFav 
  //     ? users.filter((id) => id !== auth.currentUser.uid)
  //     : users.concat(auth.currentUser.uid),
  //   });
  // };
 

  // console.log(users);

  return (
    <div className="card position-relative">
      {ad.isSold && <Sold />}
      <Link to={adLink}>
        <img
          src={ad.images[0].url}
          alt={ad.title}
          className="card-img-top"
          style={{ width: "100%", height: "200px" }}
        />
      </Link>
      <div className="card-body">
        <p className="d-flex justify-content-between align-items-center">
          <small>{ad.category}</small>

          {val?.users?.includes(auth.currentUser?.uid) ? (
            <AiFillHeart
              size={30}
              onClick={() =>  toggleFavorite(val.users, ad.id) }
              className="text-danger"
            />
          ) : (
            <AiOutlineHeart
              size={30}
              onClick={() =>  toggleFavorite(val.users, ad.id) }
              className="text-danger"
            />
          )}

        </p>
        <Link to={adLink}>
          <h5 className="card-title">{ad.title}</h5>
        </Link>
        <Link to={adLink}>
          <p className="card-text">
            {ad.location} - <Moment fromNow>{ad.publishedAt.toDate()}</Moment>
            <br />
            KES. {Number(ad.price).toLocaleString()}
          </p>
        </Link>
      </div>
    </div>
  );

};
 
export default AdCard;