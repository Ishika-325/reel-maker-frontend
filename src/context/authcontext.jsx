import { useNavigate } from 'react-router-dom';
import {useState ,createContext, useContext } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
const [isAuthenticated, setIsAuthenticated] = useState(
  !!localStorage.getItem("user")
);
const navigate = useNavigate();

const userRegistration = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log("Registration successful!");
      setIsAuthenticated(true);
      navigate("/home");
    } catch (error) {
      console.log(error.response?.data?.message || "Registration failed");
    }
}


const userLogin = async (formData) => {
    
    try{
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
        usernameOrEmail: formData.email,
        password: formData.password},{ withCredentials: true })

      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log("Login successful!");
      setIsAuthenticated(true);
      navigate("/home");
      
    }catch (error) {
      console.log(error.response?.data?.message || "Login failed");
    }
}

const logout = async () => {
  try {
    navigate('/');
    await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`, {}, { withCredentials: true });
    
    
  }catch (error){
    console.log("something went wrong during logout");
  }finally{
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    
  }
}

 return (
    <AuthContext.Provider value={{  isAuthenticated, userLogin, userRegistration, logout }}>
      {children}
    </AuthContext.Provider>
  )
}


export  const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}