import { useContext } from "react";
import { Link } from "react-router-dom";
import { formatDate, formatPrice } from "../../utils/utils";
import { VacationContext } from "./Vacations";

interface Props{
    delVacation:Function
}

function TableRow({delVacation}:Props) {

    const vacations= useContext(VacationContext)

    return (
    <>
      {
        vacations.map((vacation)=>
         <tr >
                <td>{formatDate(vacation.date)}</td>
                <td>{vacation.location}</td>
                <td>{ formatPrice(vacation.price)}</td>
                <td>
                  <div className="d-flex">
                    <Link  to={`/edit/${vacation._id}`}  className="btn btn-default">
                      <i className="bi-pen"></i>
                    </Link>
                    <button onClick={()=>delVacation(vacation)} className="btn btn-default">
                        <i className="bi-trash"></i>
                    </button>                
                  </div>
                </td>
         </tr>
        )
      }         
    </>          
    );
}

export default TableRow;