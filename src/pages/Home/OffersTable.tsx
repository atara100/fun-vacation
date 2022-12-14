import { useEffect, useState } from "react";
import { getToken } from "../../auth/tokenMgmt";
import { formatPrice } from "../../utils/utils";
import { IVacation } from "../Vacations/Vacations";

enum SortDirection{
    asc='asc', //A-Z
    desc='desc' //Z-A
}


function OffersTable() {
    const [offers,setOffers]=useState<Array<IVacation>>([]);
    const [search,setSearch]=useState<string>('');
    const [sort,setSort]=useState<SortDirection>(SortDirection.asc);

    function fetchOffers(){
        fetch('http://localhost:3000/vacations/',{
          method:'GET',
          headers:{
            'x-auth-token': getToken()
          }
        })
            .then(res=>res.json())
            .then(json=>{
                setOffers(json)
            })
    }

    useEffect(fetchOffers,[])


    function handleSort(value:string){
        const direction = value as  SortDirection;
        setSort(direction);
        
        let result = [...offers];
        if(direction===SortDirection.desc){        
         result.sort((a, b) =>
           a.location > b.location ? -1 :
             a.location < b.location ?  1 :
               0
          )}
          else{
            result.sort((a, b) =>
           a.location < b.location ? -1 :
             a.location > b.location ?  1 :
               0
            );
          }
         setOffers(result);
    }

    function handleSearch(value:string){
      setSearch(value);
      const term=value.toLowerCase();
       let result=[...offers];
       if(term.length>0){
        result=[...offers].filter(offer=>offer.location.toLowerCase().includes(term));
       }
       setOffers(result);
      
    }

    return ( 
    <>
     <div className="d-flex px-4 w-50 my-5 bg-light">
        <input type="text"placeholder="Search"className="form-control me-4"
            value={search} onChange={(e)=>handleSearch(e.target.value)}/>
         <select className="form-select"
                 value={sort} onChange={(e)=>handleSort(e.target.value)}>
          <option value={SortDirection.asc}>Location A-Z</option>
          <option value={SortDirection.desc}>Location Z-A</option></select>
      </div>

      {
        offers.length === 0  ?
        <div className="text-danger m-5">
          Error: no offers are available.
        </div>
        :
        (
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="w-25">Date</th>
            <th className="w-25">Location</th>
            <th className="w-50">Price</th>
          </tr>
        </thead>
        
        <tbody>
          {
            offers.map((offer:IVacation)=>
              <tr key={offer._id}>
                <td>{offer.date}</td>
                <td>{offer.location}</td>
                <td>{ formatPrice(offer.price)}</td>

              </tr>
            )
            }
        </tbody>
      </table>  
        )
      }
       
    </> 
    );
}

export default OffersTable;