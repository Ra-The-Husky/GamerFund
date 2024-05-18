import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllMilestones } from "../../../store/milestones";
import { useParams, useNavigate } from "react-router-dom";
import { getOneProject } from "../../../store/projects";
import ProjectNavBar from "../../Projects/ProjectNavBar/ProjectNavBar";
import "./ProjectMilestones.css";

function AllMilestones() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
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
      </div>
      <div className="projectNavBar">
        <ProjectNavBar
          projectId={projectDeets?.id}
          discussionCount={projectDeets?.numDiscussions}
        />
      </div>
      <div className="milestonesContainers">
        <div className="completed">
          <div className="milestonesTitle">Completed</div>
          <div className="milestones">
            {completed &&
              completed.map((milestone) => (
                <div className="milestoneTile" key={milestone.id}>
                  <div>
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
          <div className="milestoneHeader">In Progress</div>
          {inProgress &&
            inProgress.map((milestone) => (
              <div className="milestoneTile" key={milestone.id}>
                <div>
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
      <div>
        <div className="grantsContainer">
          Grants
          <div>Grants awarded to projects coming soon...</div>
        </div>
      </div>
    </div>
  );
}

export default AllMilestones;
