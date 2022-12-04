import Joi from "joi";
import { useState } from "react";
import { toast } from "react-toastify";
import Title from "../components/Title";
import { data, Offer } from "../data/offers";


function Order() {
    
    const [vacation,setVacation]=useState<string>('');
    const [name,setName]=useState<string>('');
    const [email,setEmail]=useState<string>('');
    const [agree,setAgree]=useState<boolean>(false);
    const [error,setError]=useState<string>('');

    function handleSubmit(e:React.FormEvent){
      e.preventDefault(); //cancel the default action of the form reload the page
 
      const schema= Joi.object().keys({
        vacation:Joi.string().required(),
        name:Joi.string().required().min(2),
        email:Joi.string().allow(null,'',).optional().email({tlds:{allow:false}}),
        agree:Joi.boolean().required().equal(true)
      })

      const {error}= schema.validate({
        vacation,name,email,agree
      });

      if(error){
        setError(error.message);
        return;
      }
      setError("");
      toast.success('success! continue to checkout...');
      
    }  

    return ( 
        <>
            <Title
               main="Order Now"
               sub="quickly order a nea vacation"
            />
            {
                data.length>0 &&

                <main className="p-5">
                <h4 className="mb-3">Billing address</h4>
            <form onSubmit={handleSubmit} className="needs-validation">
                <div className="row g-3">
                    <div className="col-12">
                        <label className="form-label">Vacation Package</label>
                        <select className="form-select" name="vacation"
                                value={vacation} onChange={(e)=>setVacation(e.target.value)}>
                            <option value="">Please select...</option>
                                {                                   
                                    data.map((offer:Offer)=>
                                        <option key={offer.id} value={offer.id}>
                                            {offer.location}
                                        </option>
                                    )
                                } 
                        </select>
                    </div>

                    <div className="col-12">
                    <label className="form-label">Name</label>
                    <input type="text"className="form-control"name="name"
                           value={name} onChange={(e)=>setName(e.target.value)}
                    />
                    </div>
 
                    <div className="col-12">
                    <label className="form-label">Email <span className="text-muted">(Optional)</span> </label>
                    <input type="email"className="form-control"name="email" placeholder="your@email.com"
                           value={email} onChange={(e)=>setEmail(e.target.value)}
                    />
                    </div>

                    <div className="form-check mt-4">
                      <input type="checkbox" className="form-check-input" 
                             checked={agree} onChange={()=> setAgree(!agree)}
                      />
                      <label className="form-check-label">
                        I agree to terms...
                      </label>
                    </div>

                    <button className="w-100 btn btn-primary btn-lg mt-4" type="submit" > 
                      Continue to checkout
                    </button>
                    
                   {
                    error &&
                    <div className="text-danger">{error}</div>
                   }
                </div>
           </form>
          </main>
            }
            
        </>
     );
}

export default Order;