import CartImg from '../assets/icons/cart.svg'
import countimg from '../assets/cart/countimg.png'
import Popup from '../components/Popup';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
/*import axios from 'axios';*/
import { useHistory } from 'react-router-dom';
import { setArrival } from '../actions/menuAction';
import { useDispatch } from 'react-redux';
import { addTodo,} from '../actions/menuAction';

function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [overlay, setOverlay] = useState('cart-dropdown cart-hide')
  const todos = useSelector((state) => { return state.todos });
  const name = useSelector((state) => state.user.name);
  /*const cartamount = useSelector((state) => { return state.cartamount });
 */
  
let orderDetails = { username: name }

const items = todos.map((todos) => { 
    return { id: todos.id, quantity: todos.quantity }
});

console.log(items);
orderDetails.items = items;
  
   

  
  const togglePopup = () => {
    setIsOpen(!isOpen);
    setOverlay('popup cart-hide');
  }
    useEffect(() => {
    if (isOpen === true) {
      setOverlay('popup cart-show');
    }
    }, [isOpen]);
  

   
const TotalPrice = todos.reduce(function(prev, cur) {
  return prev + cur.price;
}, 0); 
  
    async function PlaceOrder() {
    const response = await fetch('http://localhost:3001/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails)
    });
      const data = await response.json();
      dispatch(setArrival(data));
      dispatch(addTodo([]));
      history.push('/Status');
  }



    
  return (
    <div>
      
    <div className='cartIcon'>
          <img src={CartImg} alt="cart" className='cart' onClick={togglePopup} />
        <img className='numberbg' src={countimg} alt='countimg' /><span className='cartnumber'>{todos.length}</span>
          <div className={overlay}>
            {isOpen && <Popup
              content={<>
              <div>
                  <h1>Din beställning</h1>
                  <div className="orders">
                  {todos.map((todos, index) => {

            return (
              <div className="order" key={index}>
                <div className='flex-component'>
                  <p className='itemtitle'>{todos.title}</p><div className='dottedlineincart'></div>
                  <div className='cartamount'><i className="arrow up"></i><p className='itemnumber'>{todos.quantity}</p><i className="arrow down"></i></div>
                </div>
               <p className='itemprice'>{todos.price}kr</p>
                 </div>
            );
          })}
                </div>
                </div>
                <div className='flex-component'>
                  <h1>Total</h1>
                  <div className='dottedline'></div>
                <h2>{TotalPrice}kr</h2>
                </div>
                <p>ink moms + drönare</p>
                <div className='btnplaceorder'>
              <button onClick={PlaceOrder} className='placeorder'>Take my money!</button>
                  </div>
              </>}
              handleClose={togglePopup}
            />}
          </div>
      </div>
      </div>
  );
}

export default Cart;