import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllMilestones } from "../../../store/milestones";
import { useParams } from "react-router-dom";
import { getOneProject } from "../../../store/projects";
import ProjectNavBar from "../../Projects/ProjectNavBar/ProjectNavBar";
import "./ProjectMilestones.css";

function AllMilestones() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.user);
  const milestones = useSelector((state) => state.milestones?.milestones);
  const projectDeets = useSelector((state) => state.projects?.project);
  const completed =
    milestones && milestones.filter((milestone) => milestone.achieved === true);
  const inProgress =
    milestones &&
    milestones.filter((milestone) => milestone.achieved === false);

  useEffect(() => {
    dispatch(getOneProject(projectId));
    dispatch(getAllMilestones(projectId));
  }, [dispatch, projectId]);

  return (
    <div className="ProjectMilestones">
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
          discussionCount={projectDeets?.numDiscussions}
        />
      </div>
      {!milestones?.length ? (
        <div className="noMilestones">No Milestones Yet</div>
      ) : (
        <div className="milestonesContainers">
          <div className="completed">
            <div className="milestonesTitle">Completed</div>
            <div className="milestones">
              {completed &&
                completed.map((milestone) => (
                  <div className="milestoneTile" key={milestone.id}>
                    <div className="milestone">
                      <div className="milestoneName">
                        <div>{milestone.name}</div>
                      </div>
                      <div className="milestoneDescription">
                        <div>{milestone.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="inProgress">
            <div className="milestonesTitle">In Progress</div>
            <div className="milestones">
              {inProgress &&
                inProgress.map((milestone) => (
                  <div className="milestoneTile" key={milestone.id}>
                    <div className="milestone">
                      {" "}
                      <div className="milestoneName">
                        <div>{milestone.name}</div>
                      </div>
                      <div className="milestoneDescription">
                        <div>{milestone.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

        <div className="addMilestone">
        <i
          className="fa-solid fa-square-plus"
          onClick={() => navigate("/new-milestone")}
        ></i>
        <div className="addText">Add Milestone</div>
      </div>

      <div className="grantsContainer">
        <div className="milestonesTitle">Grants</div>
        <div className="grants">Grants awarded to projects coming soon...</div>
      </div>
    </div>
  );
}

export default AllMilestones;
