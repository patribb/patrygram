import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase";
import { useStateValue } from '../StateProvider'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [{}, dispatch] = useStateValue();
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const newUser = {
        userName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        email: userCredential.user.email,
        uid: userCredential.user.uid,
      }
      dispatch({ type: 'SET_USER', user: newUser });
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/');
    })
    .catch((error) => alert(error))
  }

  return (
    <Container>
      <Main>
        <Form onSubmit={login}>
          <Logo>
            <img
              src="./logo.png"
              alt="PatryGram"
            />
          </Logo>
          <InputContainer>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </InputContainer>
          <InputContainer>
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
          </InputContainer>
          <button type='submit'>Iniciar sesión</button>
        </Form>
        <SignUpContainer>
          <p>¿Aún no tienes una cuenta? <Link to='/signup'>Crear cuenta</Link></p>
        </SignUpContainer>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main = styled.div`
  /* ... */
`;

const Form = styled.form`
  background-color: #fff;
  border: 1px solid lightgray;
  padding: 20px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  border-radius: 5px;
  button {
    height: 33px;
    width: 230px;
    background-color: #000;
    border: none;
    outline: none;
    border-radius: 5px;
    margin-top: 30px;
    font-size: 14px;
    color: white;
    cursor: pointer;
    font-weight: 900;
  }
`;

const Logo = styled.div`
  width: 250px;
  img {
    width: 100%;
  }
`;

const InputContainer = styled.div`
  height: 25px;
  width: 250px;
  margin-top: 20px;
  input {
    height: 100%;
    width: 100%;
    background-color: #fafafa;
    border: 1px solid gray;
    padding: 5px;
    outline: none;
    border-radius: 5px;
  }
`;

const SignUpContainer = styled.div`
  border: 1px solid lightgray;
  padding: 20px;
  background-color: #fff;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  p{
    font-size: 14px;
    a {
      color: #000;
      font-weight: 900;
      text-decoration: none;
    }
  }
`;


export default Login;
