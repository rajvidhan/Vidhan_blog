import { BrowserRouter, Routes , Route, ScrollRestoration } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"

import Header from "./components/Header"
import  FooterComponent  from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import OnlyAdmin from "./components/OnlyAdmin"
import CreatePost from "./pages/CreatePost"
import UpdatePost from "./pages/UpdatePost"
import Postpage from "./pages/Postpage"
import ScrollToUp from "./components/ScrollToUp"

function App() {
 
  return (
   
  <BrowserRouter>
  <ScrollToUp />
   <Header />
   <Routes>
    <Route path="/" element={<Home />}  />
    <Route path="/about" element={<About />}  />
  

    
    <Route  element={<PrivateRoute />}  >
      
    <Route path="/dashboard" element={<Dashboard />}  />

    </Route>

    
    <Route  element={<OnlyAdmin />}  >

       <Route path="/create-post" element={<CreatePost />}></Route>
       <Route path="/update-post/:postId" element={<UpdatePost />}></Route>

    </Route>






    
    <Route path="/signup" element={<SignUp />}  />
    <Route path="/login" element={<Login />}  />

    <Route path="/post/:postId" element={<Postpage />}  />


   </Routes>
   <FooterComponent />
</BrowserRouter>
      
      
  )
}

export default App
