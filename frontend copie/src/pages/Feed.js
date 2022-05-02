import React, { useContext } from "react";
import { loginContext } from "../components/AppContext";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
const Feed = () => {
  const uId = useContext(loginContext);
  return (
    <div className="feed">
      {uId ? (
        <main className="feed-main">
          <>
            <div className="feed-post-header">
              <NewPostForm />
            </div>
            <Thread />
          </>
        </main>
      ) : (
        <div>
          <p className="info-disconnect">
            Connectez-vous pour acceder au trending !
          </p>
        </div>
      )}
    </div>
  );
};

export default Feed;
