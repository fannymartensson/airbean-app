import ProfileImg from '../assets/icons/profile.svg'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function ProfileValues() {

  const [profile, setProfile] = useState([]);
  const username = useSelector((state) => state.user.name);
  const email = useSelector((state) => state.email);

  useEffect(() => {

    async function fetchProfile() {
      const response = await axios.get(
        `http://localhost:3001/api/order/${username}`
      );
      setProfile(response.data);
  };
  fetchProfile()
},[username] );

    const TotalOrderValue =
      profile.reduce(function (prev, cur) {
        return prev + cur.total;
      }, 0);

 
  return (
    <div>
        <div className='profilevalues'>
          <img src={ProfileImg}
            alt='profileimg'></img>
          <h1>{username}</h1>
          <p>{email}</p>
        </div>
        <div className="orders">
        <h1>Orderhistorik</h1>  
        {profile &&
          profile.map((profile, index) => {
            return (
              <div className="order" key={index}>
                    <div className='profile-details'>
                     <div className='id'><p><span>#</span>{profile.id}</p><p>{profile.eta}</p></div>
                  <div className='total'><p>Total ordersumma:</p><p>{profile.total}kr</p></div>
                  <div className='line'></div>  
                </div>          
                </div>             
            );
          })}
        </div>
        <div>      
        <div className='brightline'></div>
        <div className='summery'><p>Totalt spenderat</p> <p>{TotalOrderValue} kr</p></div>        
          </div>    
    </div>
  )
}

export default ProfileValues;