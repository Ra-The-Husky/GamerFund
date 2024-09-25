import { getOneProject } from "../../../store/projects";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalDestroy from "../../OpenModal/OpenModalDestroy";
import ProjectNavBar from "../ProjectNavBar/ProjectNavBar";
import DeleteProjectModal from "../DestroyProject/DestroyProjectModal";
// import dateHelper from "../../../dateHelper";
import "./ProjectDetails.css";
import "animate.css";

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
        <h1 className="projectTitle">{projectDeets?.name}</h1>
        <div className="mediaContainer">
          <img src={projectDeets?.imgUrl} className="detailsMedia" />
        </div>
        <div className="projectDetails">
          <div className="projectDescription">{projectDeets?.description}</div>
          <div>Country: {projectDeets?.country}</div>
          <div>Genre: {projectDeets?.genre} </div>
          <div className="projectDemographics">
            <div>
              Deadline:{" "}
              {projectDeets?.deadline.split("T").splice(0, 1).join("")}
            </div>
            <div>
              Est. Release Date:{" "}
              {projectDeets?.release.split("T").splice(0, 1).join("")}
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

      <div className="projectInfo">
        <div className="projectContent">
          <div className="infoContainter">
            <div className="info">
              <div className="infoTitle">Project Information</div>
              <div className="infoSection">
               <div>Project Info Chapters will be here...soon!</div>
               <div>The developer should be able to create a "chapter" for their project</div>
               <div>Developers should be able to upload some kind of media (img or vid) for each chapter</div>
               <div>There should be a side chapter side navBar listing all chapters for the project</div>
               <div>Users should be able to click on a title of a chapter and be directed to that chapter within the page</div>
            </div>
          </div>
          <div className="milestonesContainer">
            <div className="milestonesTitle">Milestones</div>
            {!projectDeets?.Milestones?.length ? (
              <div className="noMilestones">No Milestones...yet</div>
            ) : (
              <div className="milestones">
                {projectDeets?.Milestones &&
                  projectDeets.Milestones.map((milestone) => (
                    <div key={milestone.id} className="milestoneTile ">
                      <div className="milestone ">
                        <div className="milestoneName">
                          <div>{milestone.name}</div>
                        </div>
                        <div className="milestoneDescription">
                          <div>{milestone.description}</div>
                        </div>
                        <div className="milestoneAnalytics">
                          {!milestone.achieved ? (
                            <div className="milestoneBar">
                              <label htmlFor="progress">
                                {milestone.progress}/{milestone.goal}:{" "}
                              </label>
                              <progress
                                className="progressBar"
                                id="progress"
                                value={milestone.progress}
                                max={milestone.goal}
                              >
                                {milestone.progress}
                              </progress>
                              <div className="progressPercentage">
                                ({(milestone.progress / milestone.goal) * 100}%)
                              </div>
                            </div>
                          ) : (
                            <div className="milestoneComplete">
                              <div className="completeNums">
                                {milestone.progress}/{milestone.goal}
                              </div>
                              <div className="completeBar"></div>
                              <div className="progressPercentage">
                                ({(milestone.progress / milestone.goal) * 100}%)
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="incentivesContainer">
            <div className="incentivesTitle">Vestor Incentives</div>
            <div className="incentives">Vestor Incentives Coming Soon!</div>
          </div>
        </div>
      </div>
      {!sessionUser || sessionUser.id !== projectDeets?.ownerId ? (
        <></>
      ) : (
        <div className="projectButtons">
          <div className="edit">
            <i
              className="fa-regular fa-pen-to-square"
              onClick={() => navigate(`/${projectDeets.id}/edit`)}
            ></i>
          </div>

          <div className="edit">
            <OpenModalDestroy
              modalComponent={
                <DeleteProjectModal projectId={projectId} navigate={navigate} />
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
