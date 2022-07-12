import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  query,
  collection,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import db, { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();

  const createAccount = async (e) => {
    e.preventDefault();
    const username_query = await query(
      collection(db, "users"),
      where("userName", "==", userName)
    );
    const username_exists = await getDocs(username_query);
    if (username_exists.docs.length === 0) {
      if (userName.length > 0 && email.length > 0 && password.length > 0) {
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            updateProfile(userCredential.user, {
              displayName: userName,
              photoURL: photoURL,
            });
            await setDoc(doc(db, "users", userCredential.user.uid), {
              email,
              userName,
              photoURL,
            });
            setEmail("");
            setPassword("");
            setPhotoURL("");
            setUserName("");
            alert("Tu cuenta ha sido creada!👌😃");
            navigate('/login')
          })
          .catch((err) => alert(err));
      } else {
        alert("Por favor, complete todos los campos");
      }
    } else {
      alert("El usuario ya está registrado🤔");
    }
  };

  return (
    <Container>
      <Main>
        <Form onSubmit={createAccount}>
          <Logo>
            <img src="./logo.png" alt="PatryGram" />
          </Logo>
          <InputContainer>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <input
              type="text"
              placeholder="Usuario"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <input
              type="text"
              placeholder="PhotoURL(foto de perfil opcional)"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </InputContainer>
          <button type="submit">Crear cuenta</button>
        </Form>
        <SignUpContainer>
          <p>
            ¿Ya tienes una cuenta? <Link to="/login">Entar</Link>
          </p>
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
  p {
    font-size: 14px;
    a {
      color: #000;
      font-weight: 900;
      text-decoration: none;
    }
  }
`;

export default Signup;
