import { getOneProject } from "../../../store/projects";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../../OpenModal/OpenModalButton";
import DeleteProjectModal from "../DestroyProject/DestroyProjectModal";
// import dateHelper from "../../../dateHelper";
import "./ProjectDetails.css";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const projectDeets = useSelector((state) => state.projects.project);
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOneProject(projectId));
  }, [dispatch, projectId]);

  return (
    <div className="Project">
      <div className="projectBio">
        <h1 className="title">{projectDeets?.name}</h1>
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

      <div className="discussionBar">
        <div onClick={() => alert("Feature Coming Soon!")}>DevPosts</div>

        <div onClick={() => navigate(`/${projectId}/discussions`)}>
          Community Discussion
        </div>
      </div>
      <div className="projectInfo">
        <div className="projectContent">
          <div className="infoContainter">
            <div className="info">
              Detailed Project Information about the game will go in this space
            </div>
          </div>
          <div className="milestonesContainer">
            <div className="milestones">
              Milestones Coming Soon! Will appear on Left side
            </div>
          </div>
          <div className="tiersContainer">
            <div className="tiers">
              Vestor Tiers Coming Soon! Will appear on Right side
            </div>
          </div>
        </div>
      </div>
      {!sessionUser || sessionUser.id !== projectDeets?.ownerId ? (
        <></>
      ) : (
        <div className="buttons">
          <button onClick={() => navigate(`/${projectDeets.id}/edit`)}>
            Update Project
          </button>
          <OpenModalButton
            modalComponent={
              <DeleteProjectModal projectId={projectId} navigate={navigate} />
            }
          />
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
