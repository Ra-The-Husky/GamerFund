import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { cancelDiscussion } from "../../../store/discussions";
import "../DiscussionModal.css";

function RemoveDiscussion({ discussionId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const destroyDiscussion = (e) => {
    e.preventDefault();

    dispatch(cancelDiscussion(discussionId))
    closeModal()
  }

  return (
    <div className="modal">
      <div className="deleteModal">
        <h1 className="destroyTitle">Remove Discussion</h1>
      </div>
      <div className="warningMsgs">
        <div className="warning">Warning: This action is irreversible!</div>
        <div className="">Are you sure you wish to delete this post?</div>
      </div>
      <div className="destroyButtons">
        <button
          className="destroyButton"
          onClick={destroyDiscussion}
        >
          Yea, Toss It! (Confirm)
        </button>
        <button className="declineButton" onClick={() => closeModal()}>
          Nevermind, keep it there. (Cancel)
        </button>
      </div>
    </div>
  );
}

export default RemoveDiscussion;
