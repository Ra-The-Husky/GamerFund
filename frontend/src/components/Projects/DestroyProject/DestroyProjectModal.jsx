import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { cancelProject } from "../../../store/projects";
// import { useNavigate } from "react-router-dom";
import "../DestroyProject/DestroyModal.css";
function DeleteProjectModal({ projectId }) {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const { closeModal } = useModal();

  const deleteMsgs = [
    "Are you really sure about this?",
    "Surely you jest?!",
    "Don't you quit on us now!",
    "Your vestors aren't going to like this.",
    "You're not actually considering this are you?",
    "We would be really, really sad if you cancel this project",
  ];
  const confirmMsgs = [
    "Yeaaaaa, I'm out",
    "The delegation has decided to cancel this game",
    "Tried my best, but it ain't working out",
    "Mission failed, we'll get'em next time",
    "I'll take the hit",
  ];
  const cancelMsgs = [
    "Nah, I changed my mind",
    "In to deep, can't stop now",
    "NO! I refuse!",
    "Let's get back to it!",
    "Penalties are too steep for me",
  ];
  const debuffMsgs = [
    "Epic Fail Aura: You'll emit an aura of failure, causing nearby allies to suffer from setbacks. Contagious bad luck!",
    "Murphy's Malady: For a couple months, everything that can go wrong, will go wrong. Stay calm and endure.",
    "Fool's Target: You'll targeted for a seemingly perpetual onslaught of pranks from all sources. Keep your head on a swivel.",
    "Empty Imagination: You won't be able to have any ideas for a couple weeks. Might need to pick up a hobby.",
    "Restless Hiatus: While not working on any projects, you won't be able to sleep for an indefinite period of time at night. Better get used to sleeping during the day.",
  ];

  const destroyProject = (e) => {
    e.preventDefault();

    return dispatch(cancelProject(projectId)).then(closeModal());
    // .then(navigate("/remove-success"));
  };

  return (
    <div className="modal">
      <div className="deleteModal">
        <h1 className="destroyTitle">Cancel Your Project</h1>
        <div className="messages">
          {deleteMsgs[Math.floor(Math.random() * deleteMsgs.length)]}
        </div>
        <div className="warning">
          <div className="warningMessage">
            WARNING!!! The cancelling of your project can incur the following
            penalties that include but are not limited to:
          </div>
          <ul className="warningList">
            <li>Cancellation Fees up to 50% of total received funds</li>
            <li>Not recieving remaining pending funds</li>
            <li>A strike or ban on your account</li>
            <li>{debuffMsgs[Math.floor(Math.random() * debuffMsgs.length)]}</li>
          </ul>
        </div>
        <div className="destroyButtons">
          <button className="destroyButton" onClick={destroyProject}>
            {confirmMsgs[Math.floor(Math.random() * confirmMsgs.length)]}{" "}
            <div>(Confirm)</div>
          </button>
          <button className="declineButton" onClick={() => closeModal()}>
            {cancelMsgs[Math.floor(Math.random() * cancelMsgs.length)]}{" "}
            <div>(Decline)</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProjectModal;
