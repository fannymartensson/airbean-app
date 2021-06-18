import Logo from '../assets/icons/Logo.png'
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { setUsername, addEmail, addTodo, setArrival} from '../actions/menuAction';
import { useDispatch } from 'react-redux';



function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [values, setValues] = useState({
      username: "",
      password: "",
      email: ""
    
  })

  function handle(e) {
    const newvalues = { ...values }
    newvalues[e.target.id] = e.target.value
    setValues(newvalues)
    console.log(newvalues)
    dispatch(setArrival([]));
  }

  const CreateAccount = async () => {
    try {
      const resp = await axios.post('http://localhost:3001/api/account', {
        username: values.username,
        password: values.password,
        email: values.email
      });
      console.log(resp.data);
      dispatch(setUsername(values.username));
      dispatch(addEmail(values.email));
      dispatch(addTodo([]));
      
      history.push('/menu');
    } catch (err) {
      // Handle Error Here
      console.error(err);
      if (values.username === "") {
        console.log('Fyll i användarnamn')
      }
      if (values.password === "") {
        console.log('Fyll i lösenord')
      }
      if (values.email === "") {
        console.log('Fyll i email')
      }

    }
  }
  return (
     <div className='form'>
      <img className='logo' alt='logo' src={Logo}/>
        <h1 className='headline'>Välkommen till AirBean-familjen!</h1>
        <p className='p'>Genom att skapa ett konto nedan kan du spara och se din orderhistorik.</p>
  <div className='name'>
          <div className='label'>Namn</div>
        <input className='input' type="text" name="username" onChange={(e) => handle(e)} id='username' value={values.username}
      />
      </div>
      <div className='password'>
          <div className='label'>Password</div>
        <input className='input' type="text" name="password" onChange={(e) => handle(e)} id='password' value={values.password}
      />
        </div>
      <label className='email'>
        <div className='label'>Epost</div>
        <input className='input' type="text" name="email" onChange={(e) => handle(e)} id='email' value={values.email}
      />
        <div className='gdpr'><input type="radio"  id="checkbox" />
    <label>GPDR Ok!</label></div>
      </label>
      <input className='login' type="submit" value="Logga in" onClick={ CreateAccount }/>
      
</div>
  )
}

export default Form;