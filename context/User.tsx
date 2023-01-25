import { createContext } from "react";


const UserContext = createContext(
    {
        user: '',
        setUser: (user:string)=>{}
    }
);
export default UserContext;