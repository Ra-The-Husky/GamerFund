import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllDiscussions } from "../../../store/discussions";
import { useParams, useNavigate } from "react-router-dom";
import { getOneProject } from "../../../store/projects";
import OpenModalItem from "../../OpenModal/OpenModalItem";
import CreateDiscussionModal from "../CreateDiscussions/CreateDiscussionsModal";
import "../ProjectDiscussions/ProjectDiscussions.css";

function AllDiscussions() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projectDeets = useSelector((state) => state.projects?.project);
  const discussions = useSelector((state) => state.discussions?.discussions);

  const boardMsgs = [
    "What Are the People Saying Today?",
    "The Voice of the Vestors",
    "Let the Vestor Voices Be Heard(Seen lol)!",
    "Giving the Devs a Piece of their Mind",
    "A Gold for Your Thoughts?",
    "Discussion Feed for your Viewing Pleasure",
    "The Latest and Greatest In Vestor Feedback",
    `What the Vestors are saying about ${projectDeets?.name}`,
  ];

  useEffect(() => {
    dispatch(getOneProject(projectId));
    dispatch(getAllDiscussions(projectId));
  }, [dispatch, projectId]);

  return (
    <div className="ProjectDiscussions">
      <div className="discussionHeader">
        <h1 className="title">{projectDeets?.name}</h1>
        <h2 className="boardMessages">
          {boardMsgs[Math.floor(Math.random() * boardMsgs.length)]}
        </h2>
      </div>
      <div className="discussionBoard">
        <div className="rulebox">
          <div className="rules">
            Discussion Rules: Will be added in the future!
          </div>
        </div>

        <div className="plus">
          <OpenModalItem
            modalComponent={
              <CreateDiscussionModal
                projectId={projectId}
              />
            }
          />
          Contribute to the Board
        </div>
        <div className="discussions">
          {discussions &&
            discussions?.map((discussion) => (
              <div key={discussion?.id} className="discussionTile">
                <div className="discussion">
                  <div onClick={() => alert("Discussion Modal Coming Soon!")}>
                    <div className="postHeader">
                      <div className="DiscussionPoster">
                        {discussion.User?.username}
                      </div>
                      <div className="flagContainer">
                        {discussion?.flag === "Comment" ? (
                          <div className="green-flag">{discussion?.flag}</div>
                        ) : (
                          <></>
                        )}
                        {discussion?.flag === "Question" ? (
                          <div className="yellow-flag">{discussion?.flag}</div>
                        ) : (
                          <></>
                        )}
                        {discussion?.flag === "Praise" ? (
                          <div className="pink-flag">{discussion?.flag}</div>
                        ) : (
                          <></>
                        )}
                        {discussion?.flag === "Criticism" ? (
                          <div className="red-flag">{discussion?.flag}</div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="discussionPost">{discussion?.post}</div>
                  </div>
                  <div className="votes">
                    <div className="likes">
                      <i
                        className="fa-solid fa-arrow-up"
                        onClick={() => alert("Upvoting coming soon!")}
                      ></i>
                      Likes: {discussion?.likes}
                    </div>

                    <div className="dislikes">
                      <i
                        className="fa-solid fa-arrow-down"
                        onClick={() => alert("Downvoting coming soon!")}
                      ></i>
                      Dislikes: {discussion?.dislikes}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AllDiscussions;
