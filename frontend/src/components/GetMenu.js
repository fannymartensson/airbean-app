import add from '../assets/icons/add.svg'
import { useEffect } from 'react';
import axios from 'axios';
import { addTodo, setQuantity, setCartAmount} from '../actions/menuAction';
import {  useDispatch } from 'react-redux';
import { useState } from 'react';


function GetMenu() {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(1)
  const quantity = 1


   

  useEffect(() => {
    axios.get(`http://localhost:3001/api/coffee`)
      .then(res => {
        setMenu(res.data);
      })
  }, 
    [])
  
    useEffect(() => {
      
  }, )

  const addToCart = (menu) => {
    setCart([...cart, menu])
    dispatch(addTodo([...cart, menu]));
    dispatch(setQuantity(quantity))
    setAmount(amount + 1)
    dispatch(setCartAmount(amount))
    }
  
  return (
    
    <div className='menu'>
          <h1>Meny</h1>

          <div className="beans">
        {menu &&
          menu.map((menu, index) => {
            
            return (
              <div className="bean" key={index}>
                <div className="details">
                  <div className='menu-title'>
                    <img onClick={() => addToCart(menu)} src={add} alt='add' ></img>
                    <h1 className='itemtitle'>{menu.title}</h1>
                    <p className='dottedline menu'></p>  
                  <p className='menuprice'>{menu.price}kr</p>                
                </div>
                <p className='itemdesc '>{menu.desc}</p>
                </div>
                 </div>
            );
              
          })}
            </div>
        </div>
  )
}

export default GetMenu;