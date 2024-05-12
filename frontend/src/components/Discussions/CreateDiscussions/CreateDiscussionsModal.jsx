import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useState } from "react";
import { addDiscussion } from "../../../store/discussions";
import "../DiscussionModal.css";

function AddDiscussionModal({ projectId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [flag, setFlag] = useState();
  const [errors, setErrors] = useState("");
  const flags = [
    {
      id: 0,
      name: "Comment",
    },
    {
      id: 1,
      name: "Question",
    },
    {
      id: 2,
      name: "Criticism",
    },
    {
      id: 3,
      name: "Praise",
    },
  ];
  const testPost = (e) => {
    e.preventDefault();
    setTitle("Test Discussion Title");
    setPost(
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere ipsa saepe illo labore quam consectetur recusandae obcaecati illum nisi a ratione, sit quo expedita qui, neque rem adipisci enim amet?"
    );
  };

  const newDiscussion = (e) => {
    e.preventDefault();

    const errs = {};
    if (!post || post.length < 5) {
      errs.post = "Discussion post must be a minimum of five characters";
    }
    setErrors(errs);

    const discussion = {
      title,
      post,
      flag,
    };

    if (Object.values(errors).length) {
      console.log(errors);
    } else {
      return dispatch(addDiscussion(projectId, discussion)).then(() => {
        closeModal();
      });
    }
  };

  return (
    <div className="modalContainer">
      <div className="post">
        <div className="postTitle">Add to the Discussion Board</div>
      </div>
      <form className="postForm" onSubmit={newDiscussion}>
        <input
          className="discussionTitle"
          type="text"
          placeholder="Discussion Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <textarea
          className="addPost"
          type="text"
          placeholder="What would you like to say?"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        ></textarea>
        {Object.keys(errors) && !post && (
          <div className="errors">{errors.post}</div>
        )}
        <div className="flagSelect">
          <option selected disabled hidden>
            Flag
          </option>
          <select className="flags" onChange={(e) => setFlag(e.target.value)}>
            {flags &&
              flags.map((flag) => (
                <option key={flag.id} value={flag.name}>
                  {flag.name}
                </option>
              ))}
          </select>
        </div>
        <div className="buttonContainer">
          <button className="button" type="submit">
            Post
          </button>
          <button className="button" onClick={testPost} type="submit">
            Test Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDiscussionModal;
