import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../components/Title";
import { postRequest } from "../services/apiService";

interface ISignupData{
    name:string;
    email:string;
    password:string;
}

function SignUp() {

const navigate=useNavigate();
 const [name,setName]=useState<string>('');
 const [email,setEmail]=useState<string>('');
 const [password,sePassword]=useState<string>('');
 //const [error,setError]=useState<string>('');

 function submit(){
    const schema = Joi.object().keys({
            name: Joi.string().required().min(2).max(56),
            email: Joi.string().required().min(6).max(255).email({tlds:{allow:false}}),
            password: Joi.string().required().min(6).max(30)
        });

        const { error, value } = schema.validate({
            name,
            email,
            password
        });

        if (error) {
            // setError(error.message);
            console.log(error.message);
            
            return;
        }

      register(value);
 }

 function register(data: ISignupData) {
       const res=postRequest('users/signup',data,false)
        if(!res) return;
            res.then(response => response.json())
            .then(json => {

                if (json.error) {
                    toast.error(json.error, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    return;
                }

               navigate('/login')
            })
    }

    return ( 
        <>
        <div className="p-3 form-max-w m-aotu">
           <Title main="Sign Up"
                  sub="register to the application"
            />

            <div className="mb-3">
               <input className="form-control" type="text" placeholder="Name"
                value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>

            <div className="mb-3">
               <input className="form-control" type="email" placeholder="Email"
               value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>

            <div className="mb-3">
               <input className="form-control" type="password" placeholder="Password"
               value={password} onChange={(e)=>sePassword(e.target.value)} />
            </div>

            <button onClick={submit} className="btn btn-primary btn-lg">
                Sign Up
            </button>

        </div>
        </>
     );
}

export default SignUp;