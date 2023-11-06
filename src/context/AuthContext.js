import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [loading, setLoading] = useState(true)
    let navigate = useNavigate()

    let loginUser = async ({ username, password }) => {
        const data = { username, password };
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })

        let res = await response.json()
        if(response.status === 200){
            setAuthTokens(res)
            setUser(jwt_decode(res.access))
            localStorage.setItem('authTokens', JSON.stringify(res))
            navigate('/')
        }else{
            console.log('somethin went wrong')
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let updateToken = async () => {
        console.log('updated token')
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({'refresh': authTokens.refresh})
        })

        let res = await response.json()
        if(response.status === 200){
            setAuthTokens(res)
            setUser(jwt_decode(res.access))
            localStorage.setItem('authTokens', JSON.stringify(res))
        }else{
            logoutUser()
        }

    }

    useEffect(()=>{
        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser
    }
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}