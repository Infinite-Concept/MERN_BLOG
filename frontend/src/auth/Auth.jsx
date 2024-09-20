import React, {useState, useEffect, createContext, useContext} from 'react'
import Cookies from "js-cookie";
import axios from 'axios';

const AuthContext = createContext()

function AuthProvider({children}) {
    const [user, setUser] = useState({
        is_user_logged: false,
        user: null
    })
    const [isOpen, setIsOpen] = useState(false);
    const baseURL = 'http://localhost:3057/'; 

    const loginUser = async (token, user, navigate) => {
        Cookies.set("author_token", token)
        setUser({
            is_user_logged: true,
            user: user
        })
        navigate('/')
    }

    const logout = async(navigate) => {
        Cookies.set("author_token", user)
        setUser({
            is_user_logged: false,
            user: null,
        })
        navigate('/')
    }

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

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
    <AuthContext.Provider value={{user, setUser, loginUser, logout, baseURL, closeModal, openModal, isOpen} }>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)