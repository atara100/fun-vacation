import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import { deleteRequest, getRequest } from "../../services/apiService";
import { formatDate, formatPrice } from "../../utils/utils";
import AddForm from "./AddForm";
 
export interface IVacation{
    _id:number;
    date:string;
    location:string;
    price:number;
}

function Vacations() {

    const [vacations,setVacations]=useState<Array<IVacation>>([]);

    function getVacations(){
       const res=getRequest('vacations');
         if(!res) return;
        res.then(res=>res.json())
            .then(json=>{
                setVacations(json)
            })
    }

    useEffect(getVacations,[])

    function addVacation(newVacation: IVacation){
      const update=[...vacations];
       update.push(newVacation)
        setVacations(update)
    }

    function delVacation(vacation: IVacation){
      const res = deleteRequest(`vacations/${vacation._id}`);
      if(!res) return;

      res.then(res=>res.json())
             .then(json=>{
              const update=[...vacations].filter(
                vaccationItem=>vaccationItem._id !== vacation._id);
                setVacations(update);
             })      
    }


    return (  
        <>
       <Title main= "Vacations" sub="manage vacation packages"/>

       {
        vacations.length === 0 &&
         <div className="alert alert-info m-5">No vacations</div>
       }

       <AddForm addVacation={addVacation}/>

      <table className="table table-hover">
        <thead>
          <tr>
            <th className="w-25">Date</th>
            <th className="w-25">Location</th>
            <th className="w-50">Price</th>
            <th></th>
          </tr>
        </thead>
        
        <tbody>
          {
            vacations.map((vacation)=>
              <tr key={vacation._id}>
                <td>{formatDate(vacation.date)}</td>
                <td>{vacation.location}</td>
                <td>{ formatPrice(vacation.price)}</td>
                <td>
                  <div className="d-flex">
                    <Link  to={`/edit/${vacation._id}`}  className="btn btn-default">
                      <i className="bi-pen"></i>
                    </Link>
                    <button onClick={()=>delVacation(vacation)} className="btn btn-default"><i className="bi-trash"></i></button>                
                  </div>
                </td>
              </tr>
            )
            }
        </tbody>
      </table> 
        </>
     );
}

export default Vacations;