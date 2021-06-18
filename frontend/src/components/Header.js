import NavIcon from '../assets/icons/navicon.svg'
import { useHistory } from 'react-router-dom';


function Header() {
  
  let history = useHistory();
  
  

  return (
    <div className="Header">
      <div className="NavIcon">
        <img onClick={() => {
          history.push('/navigation')
        }} src={NavIcon} alt="NavIcon" className='MenuIcon'/>
      
      </div>
      </div>
      
  );
}

export default Header;