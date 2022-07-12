import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import Post from "../components/Post";
import { useStateValue } from "../StateProvider";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import db from "../firebase";

const Home = () => {
  const [{ user }] = useStateValue();
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = () => {
      const q = query(collection(db, "posts"), orderBy("timeStamp", "desc"));
      onSnapshot(q, (snapshot) => {
        setAllPosts(snapshot.docs);
      });
    };
    fetchPosts();
  }, [])
  

  return (
    <>
      <Navbar />
      <Inner>
        <Main>
          <PostContainer>
            {allPosts.map((post, idx)=>(
              <Post
              key={idx}
              userName={post.data().userName}
              photoURL={post.data().photoURL}
              caption={post.data().caption}
              imageURL={post.data().imageURL}
              postID={post.id}
            />
            ))}
          </PostContainer>
        </Main>
      </Inner>
    </>
  );
};

const Inner = styled.div`
  width: 100%;
  margin-top: 63px;
`;

const Main = styled.div`
  max-width: 935px;
  margin: 20px auto;
  height: 680px;
  display: flex;
  justify-content: space-evenly;
`;

const PostContainer = styled.div`
  max-width: 620px;
  width: 100%;
`;

export default Home;
