import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Shop from '../assets/SHOP.png';
import {Row,Col} from 'react-bootstrap';
import '../Components/Shopperlogin.css'; 
import Button from 'react-bootstrap/Button';

function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    },[])

    const handleLogin = async () => {
    if (email.length === 0) {
        alert('Enter email');
        return;
    }
    if (password.length < 5) {
        alert('Enter at least five characters for the password');
        return;
    }

    let countUppercase = 0;
    let countLowercase = 0;
    let specialCharacters = 0;

    for (let i = 0; i < password.length; i++) {
        let specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '<', '>', ',', '.', '/'];
        if (specialChars.includes(password[i])) {
            specialCharacters++;
        } else {
            if (password[i] === password[i].toUpperCase()) {
                countUppercase++;
            }
            if (password[i] === password[i].toLowerCase()) {
                countLowercase++;
            }
        }
    }

    if (countUppercase === 0) {
        alert('Invalid Form: No uppercase characters in the password');
        return;
    }
    if (countLowercase === 0) {
        alert('Invalid Form: No lowercase characters in the password');
        return;
    }
    if (specialCharacters === 0) {
        alert('Invalid Form: No special characters in the password');
        return;
    }

    let result = await fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    result = await result.json();
    // console.log(result);
    if (result.auth) {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', JSON.stringify(result.auth));
        navigate('/shopperhome');
    } else {
        alert('Enter correct details');
    }
}

  return (
    <div className='ss'>
    <div className='Registers'>
        <Row >
                  <Col className='img-col'>
                      <img src={Shop} style={{ height: '350px', marginLeft: '6rem' }} className='bags' />
                      <button className='but-home' onClick={()=>navigate('/')}>GOTO HOME</button>
                  </Col>
                  <Col>
                    <div className='text-col'>
                        <h4>Login and start shopping from your favourite brands. Refer a friend and save 50% OFF</h4>
                        <input type='text' placeholder='Enter Email' className='inputBox' onChange={(e) => setEmail(e.currentTarget.value)} value={email} />
                        <input type='password' placeholder='Enter Password'className='inputBox' onChange={(e) => setPassword(e.currentTarget.value)} value={password} />
                        <button onClick={handleLogin} className='appButton' type='Button'>Login</button> 
                    </div>
                  </Col>
        </Row>
    </div>
    </div>
  )
}

export default Login