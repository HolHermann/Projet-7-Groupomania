import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";
import { loginContext } from "../AppContext";

const LikeBtn = ({ post }) => {
	const [liked, setLiked] = useState(false);
	const uId = useContext(loginContext);
	const dispatch = useDispatch();
	const like = () => {
		dispatch(likePost(post.id));
		setLiked(true);
	};
	const unlike = () => {
		dispatch(unlikePost(post.id));
		setLiked(false);
	};

	useEffect(() => {
		if (post.Likes.find((like) => like.userId === uId)) {
			setLiked(true);
		} else {
			setLiked(false);
		}
	}, [uId, post.Likes, liked]);
	return (
		<div className="like-container">
			{uId && liked === false && (
				<i
					tabIndex={0}
					className="fas fa-heart"
					onClick={like}
					onKeyPress={like}
					title="Like"
				></i>
			)}
			{uId && liked && (
				<i
					onKeyPress={unlike}
					tabIndex={0}
					className="fas fa-heart heart-checked"
					onClick={unlike}
					title="Like"
				></i>
			)}
			<span>{post.Likes.length}</span>
		</div>
	);
};

export default LikeBtn;
