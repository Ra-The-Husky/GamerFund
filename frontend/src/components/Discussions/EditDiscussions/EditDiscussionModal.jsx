import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useEffect, useState } from "react";
import { editDiscussion } from "../../../store/discussions";
import "../DiscussionModal.css";

function EditDiscussionModal({ discussion, discussionId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [post, setPost] = useState(discussion?.post);
  const [flag, setFlag] = useState(discussion?.flag);
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
    {
      id: 4,
      name: "REMOVED"
    }
  ];

  useEffect(() => {
    const errs = {};
    if (!post || post.length < 5) {
      errs.post = "Discussion post must be a minimum of five characters";
    }
    setErrors(errs);
  }, [post]);

  const updateDiscussion = (e) => {
    e.preventDefault();

    const edits = {
      post,
      flag,
    };

    if (Object.values(errors).length) {
      console.log(errors);
    } else {
      return dispatch(editDiscussion(discussionId, edits)).then(closeModal());
    }
  };

  return (
    <div className="modalContainer">
      <div className="post">
        <div className="postTitle">Edit Post</div>
      </div>
      <form className="postForm" onSubmit={updateDiscussion}>
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
              flag
            </option>
            {flags &&
              flags.map((flag2) => (
                <option key={flag2.id} selected={flag2.name === discussion.flag} value={flag2.name}>
                  {flag2.name}
                </option>
              ))}
          </select>
        </div>
        <div className="buttonContainer">
          <button
            className="button"
            disabled={Object.values(errors).length}
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditDiscussionModal;
