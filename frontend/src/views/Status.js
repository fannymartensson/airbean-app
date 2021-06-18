import Drone from '../assets/graphics/drone.svg'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {  useEffect } from 'react';
function Status() {
  let history = useHistory();
  const arrival = useSelector((state) => state.arrival);


  const time = new Date();
  time.setMinutes(time.getMinutes());
  const timeNow = Date.parse(time);
  const timeLeft = Math.round(((Date.parse(arrival.eta)) - timeNow) / 60000);
  

  useEffect(() => {
    async function fetchTimeLeft() {
      if (timeLeft < 0) {
        return(<p>Hoppad det smakar!</p>)
      }
      else {
        return(timeLeft)
      }
    }
    fetchTimeLeft();
  });
  
 

  console.log('timeleft',timeLeft)
  return (
    <div className='grid-system status'>
      <div className='status-content'>
      <p>Ordernummer: #{arrival.id} </p>
        <img src={Drone} alt='drone'></img>
         {timeLeft <= 0  && (
       <h1>Din beställning är klar!</h1>
        )}
        {timeLeft > 0  && (
       <h1>Din beställing är påväg</h1>
      )}
        
          {timeLeft <= 0  && (
       <p>Ditt kaffe har anlänt!</p>
          )}
          {timeLeft > 0  && (
       <p>{timeLeft} minuter kvar!</p>
      )}
      
        <input onClick={() => {
        history.push('/menu');
      }} className='accept' type="submit" value="Ok, cool!"></input>
        </div>
    </div>
  )
}

export default Status;