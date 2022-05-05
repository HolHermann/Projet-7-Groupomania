import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.actions";
import { loginContext } from "../AppContext";

import Card from "../Post/Card";

import { isEmpty } from "../../utils/utils";

const ProfilUser = () => {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(6);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const userId = userData.id;
  const posts = useSelector((state) => state.postReducer);
  const uId = useContext(loginContext);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };
  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 6);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, count, dispatch, userId]);

  return (
    <main id="UserPost">
      {uId ? (
        <>
          <h2>Vos Publications</h2>
          <ul className="post-list">
            {!isEmpty(posts[0]) && // on affiche les posts de l'utilisateur
              posts
                .filter((post) => post.userId === userData.id)
                .map((post) => {
                  return <Card post={post} key={post.id} />;
                })}
          </ul>
        </>
      ) : (
        <p>Connectez-vous !</p>
      )}
    </main>
  );
};

export default ProfilUser;
