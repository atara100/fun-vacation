import { createContext, useEffect, useState } from "react";
import Panel from "../../components/Panel";
import Title from "../../components/Title";
import { deleteRequest, getRequest } from "../../services/apiService";
import AddForm from "./AddForm";
import TableRows from "./TableRows";
 
export interface IVacation{
    _id:number;
    date:string;
    location:string;
    price:number;
}

//context:
export const VacationContext = createContext<Array<IVacation>>([]);

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
     <VacationContext.Provider value={vacations}>
       <Title main= "Vacations" sub="manage vacation packages"/>

       {
        vacations.length === 0 &&
         <div className="alert alert-info m-5">No vacations</div>
       }

      <Panel>
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
            <TableRows delVacation={delVacation}/>
            }
        </tbody>
      </table> 
     </Panel>
    </VacationContext.Provider>

     );
}

export default Vacations;