function AdminOnly() {

        const admin=localStorage.getItem('admin');

        if(admin==="true"){
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