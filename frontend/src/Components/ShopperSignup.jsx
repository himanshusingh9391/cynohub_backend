import React, { useState, useEffect } from 'react'
import Bag from '../assets/BAG.png';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Alert } from 'react-bootstrap';
import '../Components/ShopperSignup1.css';
import Button from 'react-bootstrap/Button';

function SignUP() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    }, [])

const collectData = async () => {
    if (email.length === 0) {
        alert('Enter email');
        return;
    }
    if (!email.includes('@')) {
        alert('Enter a valid email');
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

    let result = await fetch('http://localhost:5000/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    navigate('/shopperhome');
}


    return (
        <>
            <div className='reg-seller'>
                <Row>
                    <Col>
                        <div> 
                            <img src={Bag} style={{marginLeft:'8rem',marginTop:'4rem'}} height='400px'/>
                        </div>
                        <Button variant="primary" onClick={()=>navigate('/')} style={{marginLeft:'12rem'}}>Go to Sellers Login</Button>
                    </Col>
                    <Col>
                        <div className='signup-reg'>
                            <h4>Login and start shopping from your favourite brands. Refer a friend and save 50% OFF</h4>
                            <input className='inputBox1' type='text' placeholder='Enter Name' onChange={(e) => setName(e.currentTarget.value)} value={name} />
                            <input className='inputBox1' type='text' placeholder='Enter Email' onChange={(e) => setEmail(e.currentTarget.value)} value={email} />
                            <input className='inputBox1' type='password' placeholder='Enter Password' onChange={(e) => setPassword(e.currentTarget.value)} value={password} />
                            <button onClick={collectData} className='appButton' type='button'>SignUp</button>
                            <h5>Already a member <Link to='/shopperlogin'><span>login here</span></Link></h5>
                        </div>
                    </Col>
                </Row>
            </div>

        </>
    )
}

export default SignUP