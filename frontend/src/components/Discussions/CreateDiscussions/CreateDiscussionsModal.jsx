import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useEffect, useState } from "react";
import { addDiscussions } from "../../../store/discussions";

function AddDiscussionModal({ projectId, navigate }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [post, setPost] = useState("");
  const [flag, setFlag] = useState();
  const [errors, setErrors] = useState("");
  const flags = [
    {
      id: 0,
      name: "Question",
    },
    {
      id: 1,
      name: "Criticism",
    },
    {
      id: 2,
      name: "Praise",
    },
  ];

  useEffect(() => {
    const errs = {};
    if (!post || post.length < 5) {
      errs.post = "Discussion post must be a minimum of five characters";
    }
    setErrors(errs);
  });
  const addDiscussion = (e) => {
    e.preventDefault();

    const discussion = {
      post,
      flag,
    };

    if (Object.values(errors).length) {
      console.log(errors);
    } else {
      return dispatch(addDiscussions(projectId, discussion)).then(() => {
        closeModal();

        navigate("/projects");
      });
    }
  };

  return (
    <div className="newPostContainer">
      <div newPost>Add to the Discussion Board</div>
      <form className="newPostForm" onSubmit={addDiscussion}>
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
          <select className="flags" onChange={(e) => setFlag(e.target.value)}>
            <option selected disabled hidden>
              Flags
            </option>
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
        </div>
      </form>
    </div>
  );
}

export default AddDiscussionModal;
