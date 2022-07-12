import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Container>
    </Router>
  );
}

const Container = styled.div`
  /* ... */
`;


export default App;
