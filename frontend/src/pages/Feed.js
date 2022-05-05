import React, { useContext } from "react";
import { loginContext } from "../components/AppContext";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
// page du fil d'actualité
const Feed = () => {
  const uId = useContext(loginContext);
  return (
    <div className="feed">
      {uId ? ( // si l'user est connecté
        <main className="feed-main">
          <>
            <div className="feed-post-header">
              <NewPostForm />
            </div>
            <Thread />
          </>
        </main>
      ) : (
        // si l'user n'est pas connecté
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
