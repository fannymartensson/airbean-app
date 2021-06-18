import CloseImg from '../assets/icons/close.svg'
import { useHistory } from 'react-router-dom';

function Navigation() {
 
  let history = useHistory();

 
  return (
    <div className='Navigation'>
      <div className='closenav'>
        <img onClick={() => {
        history.go(-1);
      }}  src={CloseImg} alt='closeimg'></img>
      </div>
      <div className='navtags'>
        <p onClick={() => {
        history.push('/menu');
      }}>Meny</p>
        <div className='navlines'></div>
        <p onClick={() => {
        history.push('/about');
      }}>Vårt Kaffe</p>
        <div className='navlines'></div>
        <p onClick={() => {
        history.push('/profile');
      }}>Min profil</p>
        <div className='navlines'></div>
        
       <p onClick={() => {
        history.push('/status');
      }}>Orderstatus</p>
        
      </div>
    </div>
  )
}

export default Navigation;
