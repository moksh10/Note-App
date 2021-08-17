import React from 'react'
import Footer2 from '../Footer/Footer2'
import Header from '../Header/Header'
import { useState } from 'react'
import './signup.css'
import API from '../../API/API'
import Alertbox from '../Alertbox/Alertbox'
import { isNameValid,isEmail,isPasswordValid,confirmPassword } from '../../validators/validators'
import { useHistory } from 'react-router'
function SignUp() {
    const history = useHistory()
    const [userInfo,setUserInfo] = useState({name:"",email:"",password:"",confirmPassword:""}) 
    const [isDisabled,setDisabled] = useState(true)
    const [alert,setAlert] = useState({type:"",message:""})
    const handleChange=(event)=>{ 

      setUserInfo({...userInfo, [event.target.name] :event.target.value})
      if(isNameValid(userInfo.name)&&isEmail(userInfo.email)&&isPasswordValid(userInfo.password)&&confirmPassword(userInfo.password,userInfo.confirmPassword))
        {
            setDisabled(false)
            return
        }
        setDisabled(true)


    }
    const handleSubmit=() =>{
        API.post('/signup',userInfo,{headers:{"Content-Type":"application/json"}})
        .then((res)=>{
            if(res.data.created)
            {
                
            setAlert({type:"success",message:`Account created`})
            
            setUserInfo("")
            setTimeout(()=>{setAlert({type:"success",message:`Account created`})
        },2000)
            setTimeout(()=>history.push('/login'),2000)
            
            }
        })
        .catch((error)=>{
            setAlert({type:"error",message:`${error.response.data.message}`})
            setTimeout(()=>{setAlert({type:"",message:""})
        },4000)
            return
               
          

        })
    }
    
    return (
        <>
        <Header />
        <Alertbox alert={alert}/>
        <div className="register-main-box">
            <div className="register-container" data-aos="fade-up">
            <h1>Register yourself!</h1>
                <div className="register-form" data-aos="fade-up" >
                    <div>
                    <label>Name</label><br />
                    <input type="text" name="name" placeholder="3-20 characters" value={userInfo.name} onKeyUp={handleChange} onpaste={handleChange}  oncut={handleChange} oninput={handleChange}  onChange={handleChange}/>
                    </div>
                    <div>
                    <label>Email</label><br />
                    <input type="text" name="email" placeholder="example@email.com" value={userInfo.email} onKeyUp={handleChange}onpaste={handleChange}  oncut={handleChange} oninput={handleChange} onChange={handleChange}/><br />
                    </div>
                    <div><label>Password </label><br />
                    <input type="password" name="password" placeholder="minimum 8 characters" value={userInfo.password} onKeyUp={handleChange} onpaste={handleChange}  oncut={handleChange} oninput={handleChange}onChange={handleChange}/><br /></div>
                    <div>
                    <label>Confirm Password </label><br />
                    <input type="password" name="confirmPassword" value={userInfo.confirmPassword} onKeyUp={handleChange}onpaste={handleChange}  oncut={handleChange} oninput={handleChange} onChange={handleChange}/><br />
                    </div>
                    <button className="register-submit" onClick={handleSubmit} disabled={isDisabled}>SIGN UP</button>
                </div>
          </div>
          </div>      
        <Footer2 />
        
                    
                    
    </>
    )
}

export default SignUp
