import './App.css';
import { useState,useEffect } from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function App() {

  //useStates are used to know the input values and for the validation of input data
  
  const [name,setName] = useState('');
  const [age,setAge] = useState('');
  const [phno,setPhno] = useState('');
  const [email,setEmail] = useState('');
  const [gender,setgender] = useState('');
  const [timing,settiming] = useState('');
  const [formerrors,setformerrors] = useState({});
  const [issubmit,setissubmit]=useState(false);
  const [disable,setdisable]=useState(0);

  // below handlesubmit function is used to submit the form if all validations are satisfied

  const handlesubmit = async (e)=>{
    
    e.preventDefault();
    setformerrors(validate(name,age,phno,email));
    setissubmit(true);
    setdisable(true);
    axios.post("https://yoga-admission-api.onrender.com/api/post",{
        name,
        age,
        gender,
        phno,
        email,
        timing
      }).then(()=>{
        setAge("");
        setName("");
        setPhno("");
        setEmail("");
        setgender("");
        settiming("");
      })
    
      
}

  // Used to print the data on the cosole afer successful validation of data

  useEffect(()=>{
    console.log(formerrors);
    if (Object.keys(formerrors).length === 0 && issubmit){
      console.log(name,email,phno,age,gender,timing);
    }

  },[formerrors])

  // Below validate function is used to check for the validation pf  data

  const validate=(name,age,phno,email)=>{

    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    //Name validations

    if (!name){
      errors.name="Full Name is required!";
    }

    //Phone number validations

    if (!phno){
      errors.phno="Phone number is required!";
    }
    else if(String(phno).length != 10 ){
      errors.phno="Phone NUmber must be 10 numbers";
    }

    //Age validation 18 to 65

    if (!age){
      errors.age="Age is required!";
    }
    else if(age < 18){
      errors.age="Age must be greater than equal to 18!";
      
    }
    else if(age > 65){
      errors.age="Age must be less than equal to 65!";
      
    }

    //Email Validation
    
    if (!email){
      errors.email="Email is required!";
    }
    else if(!regex.test(email)){
      errors.email = "Invalid emal!";

    }

    //Gender

    if (!gender){
      errors.gender="required!";
    }

    //Session timings

    if (!timing){
      errors.timing="required";
    }
    return errors

  }

  return(
       
    //Div tag with class all for the whole form
    //Onchange is used to get the data from the input type field and set the target values
     
    <div className='all'>
    
    <form  className='forum' onSubmit={handlesubmit}>
      <p className="register">Registration Form for Yoga Classes</p>

      <p>Name:   <input type="text" placeholder="Enter Your Name"  value={name} onChange={e=>setName(e.target.value)}></input><p className='nameerr'>{formerrors.name}</p></p>
      <p>Age:<input type="number" placeholder="Enter Your Age" value={age} onChange={e=>setAge(e.target.value)}></input><p className='ageerr'>{formerrors.age}</p></p>
      <p>PhNo:  <input type="number" placeholder="Enter Your Phone Number" value={phno} onChange={e=>setPhno(e.target.value)} ></input><p className='phnoerr'>{formerrors.phno}</p></p>
      <p>Email:  <input type="text" placeholder="Enter Your Email" value={email} onChange={e=>setEmail(e.target.value)} ></input><p className='emailerr'>{formerrors.email}</p></p>

      <p className="gen">Gender:
      Male<input type="radio" name="gender" id="Male" value="Male" checked={gender == "Male"} onChange={e=>setgender(e.target.value)} ></input>
      Female<input type="radio" name="gender" id="Female" value = "Female" checked={gender == "Female"} onChange={e=>setgender(e.target.value)}></input>
      Other<input type="radio" name="gender" id="Other" value = "Other" checked={gender == "Other"} onChange={e=>setgender(e.target.value)}></input><p className='fmerr'>{formerrors.gender}</p>
      </p>

      <p className="Session">
        <p className="sessiontitle">Choose Session Timings</p>
        <p className='terr'>{formerrors.timing}</p>
        <p className="six-to-seven"><input type="radio" name="session" id="67" value="6-7" checked={timing == "6-7"} onChange={e=>settiming(e.target.value)}></input>6 to 7 AM</p>
        <p className="seven-to-eight"><input type="radio" name="session" id="78" value="7-8" checked={timing == "7-8"} onChange={e=>settiming(e.target.value)}></input>7 to 8 AM</p>
        <p className="eight-to-nine"><input type="radio" name="session" id="89" value="8-9" checked={timing == "8-9"} onChange={e=>settiming(e.target.value)}></input>8 to 9  AM</p>
        <p className="five-to-six"><input type="radio" name="session" id="56" value="5-6" checked={timing == "5-6"} onChange={e=>settiming(e.target.value)} ></input>5 to 6  PM</p>
        </p>

      <p className="btn"><input type="submit" value="Submit" disabled={disable}></input></p>      
    </form>
</div>
  );
}

export default App;
