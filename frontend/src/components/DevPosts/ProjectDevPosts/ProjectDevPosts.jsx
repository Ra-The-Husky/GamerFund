import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { disliked, getAllDevPosts, liked } from "../../../store/devPosts";
import { useParams } from "react-router-dom";
import { getOneProject } from "../../../store/projects";
import ProjectNavBar from "../../Projects/ProjectNavBar/ProjectNavBar";
// import "../../ProjectDiscussions/ProjectDiscussions.css";

function AllDevPosts() {
  const { projectId } = useParams();
  // const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const projectDeets = useSelector((state) => state.projects?.project);
  const devPosts = useSelector((state) => state.devPosts?.devPosts);
  const discussions = useSelector((state) => state.discussions?.discussions);

  const boardMsgs = ["Straight from the devs mouth."];

  useEffect(() => {
    dispatch(getOneProject(projectId));
    dispatch(getAllDevPosts(projectId));
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
      {!devPosts.length ? (
<div className="noPosts">The Developers of this project hasn't posted anything...yet. Stay Tuned!!
</div>
      ) : (

<div className="discussionBoard">
        <div className="discussions">
          {devPosts &&
            devPosts?.map((devPost) => (
              <div key={devPost?.id} className="discussionTile">
                <div className="discussion">
                  <div onClick={() => alert("Discussion Modal Coming Soon!")}>
                    <div className="postHeader">
                      <div className="title-author">
                        <div className="postTitle">{devPost?.title}</div>
                        {/* <div className="author">
                          {discussion.Users &&
                            discussion.Users?.find((user) => user.id === discussion?.userId)}
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="discussionPost">{devPost?.post}</div>
                  <div className="control-votes">
                    <div className="votes">
                      <div className="likes">
                        <i
                          className="fa-solid fa-arrow-up"
                          onClick={() =>
                            dispatch(
                              liked(devPost.id, {
                                likes: devPost.likes,
                                dislikes: devPost.dislikes,
                              })
                            )
                          }
                        ></i>
                        Likes: {devPost?.likes}
                      </div>

                      <div className="dislikes">
                        <i
                          className="fa-solid fa-arrow-down"
                          onClick={() =>
                            dispatch(
                              disliked(devPost.id, {
                                likes: devPost.likes,
                                dislikes: devPost.dislikes,
                              })
                            )
                          }
                        ></i>
                        Dislikes: {devPost?.dislikes}
                      </div>
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
      )}
    </div>
  );
}

export default AllDevPosts;
