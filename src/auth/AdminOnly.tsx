import { useContext } from "react";
import { AppContext } from "../App";

function AdminOnly() {

        const context=useContext(AppContext);

        if(context && context.isAdmin){
            return(
            <h2 className="text-center">Welcome to admin page!</h2>
            )
        }
        
        return(
            <div className="text-danger">
                Forbidden!!! this page only for admin!
            </div>
        );
     
}

export default AdminOnly;