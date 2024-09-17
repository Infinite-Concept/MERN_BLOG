import React, {useState, useEffect, createContext, useContext} from 'react'
import Cookies from "js-cookie";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

function AuthProvider({children}) {
    const [user, setUser] = useState({
        is_user_logged: false,
        user: null
    })

    const navigate = useNavigate()
    const baseURL = 'http://localhost:3057/'; 

    const loginUser = async (user) => {
        Cookies.set("author_token", user)
        navigate('/')
        setUser({
            ...user,
            is_user_logged: true,
        })
    }

    useEffect(() => {
        const user_token = Cookies.get("author_token");

        if(user_token){
            const verifyUser = async() => {
                try {
                    const user = await axios.get(`${baseURL}author/verifyAuthor`, {
                        headers: {
                            Authorization: `Bearer ${user_token}`
                        }
                    })
                    
                    setUser({
                        is_user_logged: true,
                        user: user.data.user
                    })

                } catch (error) {
                    console.log(error);
                    Cookies.remove("author_token")
                    setUser({
                        is_user_logged: false,
                        user: null
                    });
                }
            }

            verifyUser()
        }else{
            setUser({
                is_user_logged: false,
                user: null
            })
        }
        
    }, [])
  return (
    <AuthContext.Provider value={{user, setUser, loginUser, baseURL} }>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)