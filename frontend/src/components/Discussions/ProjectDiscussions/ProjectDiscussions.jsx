import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { disliked, getAllDiscussions, liked } from "../../../store/discussions";
import { useParams, useNavigate } from "react-router-dom";
import { getOneProject } from "../../../store/projects";
import OpenModalAdd from "../../OpenModal/OpenModalAdd";
import OpenModalEdit from "../../OpenModal/OpenModalEdit";
import OpenModalDestroy from "../../OpenModal/OpenModalDestroy";
import CreateDiscussionModal from "../CreateDiscussions/CreateDiscussionsModal";
import EditDiscussionsModal from "../EditDiscussions/EditDiscussionModal";
import DeleteDiscussionsModal from "../DeleteDiscussions/DeleteDiscussionsModal";
import ProjectNavBar from "../../Projects/ProjectNavBar/ProjectNavBar";
import "../ProjectDiscussions/ProjectDiscussions.css";

function AllDiscussions() {
  const { projectId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
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
    `Currently ${discussions?.length} Vestor Posts and Counting!`,
  ];

  useEffect(() => {
    dispatch(getOneProject(projectId));
    dispatch(getAllDiscussions(projectId));
  }, [dispatch, projectId]);

  return (
    <div className="ProjectDiscussions">
      <div className="projectHeader">
        <div className="projectBio">
          <h1 className="projectTitle">{projectDeets?.name}</h1>
          <div className="mediaContainer">
          <img src={projectDeets?.imgUrl} className="detailsMedia" />
        </div>
          <div className="projectDescription">
            <div>{projectDeets?.description}</div>
            <div className="projectDemographics">
              <div>Genre: {projectDeets?.genre} </div>
              <div>
                Deadline:{" "}
                {projectDeets?.deadline.split("T").splice(0, 1).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="projectNavBar">
        <ProjectNavBar
          projectId={projectDeets?.id}
          discussionCount={discussions?.length}
        />
      </div>
      <h2 className="boardMessages">
        {boardMsgs[Math.floor(Math.random() * boardMsgs.length)]}
      </h2>
      <div className="discussionControls">
        {!sessionUser ? (
          <div>Log In to Contribute to the Board!</div>
        ) : (
          <div className="plus">
            <OpenModalAdd
              modalComponent={<CreateDiscussionModal projectId={projectId} />}
            />
            Contribute to the Board
          </div>
        )}
      </div>
      <div className="discussionBoard">
        <div className="discussions">
          {discussions &&
            discussions?.map((discussion) => (
              <div key={discussion?.id} className="discussionTile">
                <div className="discussion">
                  <div onClick={() => alert("Discussion Modal Coming Soon!")}>
                    <div className="postHeader">
                      <div className="title-author">
                        <div className="postTitle">{discussion?.title}</div>
                        {/* <div className="author">
                          {discussion.Users &&
                            discussion.Users?.find((user) => user.id === discussion?.userId)}
                        </div> */}
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
                        {discussion?.flag === "REMOVED" ? (
                          <div className="removed-flag">{discussion?.flag}</div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    {discussion?.flag === "REMOVED" ? (
                      <div className="removedPost">
                        The Post has been flag for deletion by the developer(s).
                        Comment has been redacted for [insert reason]
                      </div>
                    ) : (
                      <div className="discussionPost">{discussion?.post}</div>
                    )}
                  </div>
                  <div className="control-votes">
                    <div className="votes">
                      <div className="likes">
                        <i
                          className="fa-solid fa-arrow-up"
                          onClick={() =>
                            dispatch(
                              liked(discussion.id, {
                                likes: discussion.likes,
                                dislikes: discussion.dislikes,
                              })
                            )
                          }
                        ></i>
                        Likes: {discussion?.likes}
                      </div>

                      <div className="dislikes">
                        <i
                          className="fa-solid fa-arrow-down"
                          onClick={() =>
                            dispatch(
                              disliked(discussion.id, {
                                likes: discussion.likes,
                                dislikes: discussion.dislikes,
                              })
                            )
                          }
                        ></i>
                        Dislikes: {discussion?.dislikes}
                      </div>
                    </div>
                    <div className="edit-delete">
                      {discussion?.userId === sessionUser?.id ? (
                        <>
                          <div className="edit">
                            <OpenModalEdit
                              modalComponent={
                                <EditDiscussionsModal
                                  discussionId={discussion.id}
                                  discussion={discussion}
                                />
                              }
                            />
                          </div>
                          <div className="deleteContainer">
                            <div className="delete">
                              <OpenModalDestroy
                                modalComponent={
                                  <DeleteDiscussionsModal
                                    discussionId={discussion.id}
                                  />
                                }
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="rulebox">
          <div className="rules">
            Discussion Rules: Will be added in the future!
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllDiscussions;
