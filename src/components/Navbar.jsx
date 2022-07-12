import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { signOut } from "firebase/auth";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import db, { auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Navbar = () => {
  const [{ user }, dispatch] = useStateValue();
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        dispatch({
          type: "SET_USER",
          user: null,
        });
        navigate("/login");
      })
      .catch((error) => alert(error));
  };

  const createPost = (e) => {
    e.preventDefault();
    addDoc(collection(db, "posts"), {
      caption,
      imageURL,
      userName: user?.userName,
      photoURL: user?.photoURL === null ? "./user.png" : user?.photoURL,
      timeStamp: serverTimestamp()
    });
    alert('Post creado😃')
    setCaption('');
    setImageURL('');
    setOpenDialog(false);
  };

  return (
    <Container>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        style={{ textAlign: "center" }}
      >
        <DialogTitle>Crear Post</DialogTitle>
        <DialogContent>
          <CreatePostForm>
            <InputContainer>
              <input
                type="text"
                placeholder="URL de la imagen"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <textarea
                type="text"
                placeholder="Texto para tu post..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </InputContainer>
          </CreatePostForm>
        </DialogContent>
        <DialogActions>
          <PostCTAButtons>
            <button
              className="cancel-button"
              onClick={() => setOpenDialog(false)}
            >
              Cancelar
            </button>
            <button className="post-button" onClick={createPost}>
              Publicar
            </button>
          </PostCTAButtons>
        </DialogActions>
      </Dialog>
      <Logo>
        <Link to='/'><img src="./logo.png" alt="PatryGram" /></Link>
      </Logo>
      <SearchBar>
        <input type="text" placeholder="Buscar..." />
      </SearchBar>
      <Icons>
        <Icon title="Inicio">
          <Link to="/">
            <img src="./41-home.svg" alt="Home" />
          </Link>
        </Icon>
        <Icon title="Publicar">
          <img
            src="./40-add-card.svg"
            alt=""
            onClick={() => setOpenDialog(true)}
          />
        </Icon>
        <Icon>
          <img src="./47-chat.svg" alt="Chat" />
        </Icon>
        <Icon>
          <img
            src={user?.photoURL === null ? "./user.png" : user?.photoURL}
            alt=""
            onClick={() => setOpenMenu(!openMenu)}
            className="user-img"
          />
          <Menu openMenu={openMenu}>
            <MenuElement onClick={() => navigate("/profile")}>
              Perfil
            </MenuElement>
            <MenuElement onClick={logOut}>Salir</MenuElement>
          </Menu>
        </Icon>
      </Icons>
    </Container>
  );
};

const Container = styled.div`
  height: 60px;
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: 1px solid lightgray;
  background-color: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;

  @media only screen and (max-width: 768px) {
    justify-content: space-around;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  img {
    width: 100%;
    height: 40px;
  }
`;

const SearchBar = styled.div`
  height: 30px;
  width: 268px;
  padding: 3px 16px 3px 16px;
  min-height: auto;
  min-width: auto;
  background-color: #efefef;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    border: none;
    background-color: transparent;
    outline: none;
    line-height: 18px;
    font-size: 14px;
    width: 90%;
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  width: 180px;
  justify-content: space-evenly;
  height: 40px;
`;

const Icon = styled.div`
  width: 35px;
  height: 35px;
  cursor: pointer;
  img {
    width: 25px;
    height: 25px;
  }
  .user-img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

const Menu = styled.div`
  position: relative;
  bottom: -8px;
  display: ${(props) => (props.openMenu ? "block" : "none")};
  background: #fff;
  width: 100px;
  border: 1px solid lightgray;
  border-radius: 5px;
`;

const MenuElement = styled.div`
  height: 20px;
  color: gray;
  font-size: 14px;
  font-weight: 900;
  border-bottom: 1px solid lightgray;
  padding: 10px;
  &:hover {
    background-color: #e4e4e4;
  }
`;

const CreatePostForm = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  align-items: center;
  height: 300px;
`;

const InputContainer = styled.div`
  width: 90%;
  height: 33px;
  margin-bottom: 20px;
  input {
    width: 100%;
    height: 100%;
    border: 1px solid lightgrey;
    padding: 5px;
    outline: none;
  }
  textarea {
    width: 100%;
    height: 200px;
    resize: none;
    border: 1px solid lightgrey;
    padding: 5px;
    outline: none;
  }
`;

const PostCTAButtons = styled.div`
  button {
    width: 100px;
    height: 33px;
    margin-right: 10px;
    cursor: pointer;
    border: none;
    outline: none;
    color: #fff;
    font-weight: 900;
    border-radius: 5px;
  }
  .cancel-button {
    background-color: gray;
  }
  .post-button {
    background-color: #000;
  }
`;

export default Navbar;
