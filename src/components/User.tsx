import { useEffect, useState } from "react";

function User() {
   
    const [name,setName]=useState('');
    
    useEffect(()=>{
       const nameLocalstorage=localStorage.getItem('user');


    },[])

    return ( 
        <>
        {
            !name ? null : (<div > Hello {name} </div>)
        }
        </>
       
     );
}

export default User;