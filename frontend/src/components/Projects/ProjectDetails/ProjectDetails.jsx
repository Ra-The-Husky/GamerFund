import { getOneProject } from "../../../store/projects";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalDestroy from "../../OpenModal/OpenModalDestroy";
import ProjectNavBar from "../ProjectNavBar/ProjectNavBar";
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
                numquam aliquid, vero culpa itaque illum quod consequatur
                nesciunt earum quisquam amet repudiandae corrupti accusantium
                nam aliquam qui obcaecati rerum exercitationem?
              </div>
              <div className="infoSection">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
                mollitia ullam dicta minima corrupti nulla accusantium, tempora
                consequuntur libero! Quia maiores nihil ea earum suscipit
                praesentium quibusdam officiis blanditiis. Doloribus!
              </div>

              <div className="infoSection">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                magni eum tempore, eaque iusto alias nam, quos commodi nesciunt
                dolorum similique, voluptatem esse! Eum doloremque veniam
                inventore, porro sed unde. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Distinctio mollitia veniam, enim
                saepe magni eius quod natus consequuntur debitis expedita modi
                optio reprehenderit est eligendi, dignissimos praesentium aut
                perspiciatis assumenda. Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Architecto sequi iste impedit natus id
                exercitationem vitae laboriosam labore, dolore illum, iusto,
                sint accusamus eaque? Similique, obcaecati? Nostrum quos
                distinctio quia! Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Alias quisquam non at dignissimos beatae sunt,
                minus libero voluptas earum molestiae? Delectus aliquam
                veritatis accusamus et repellendus eligendi debitis inventore
                quasi?
              </div>
              <div className="infoSection">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
                numquam aliquid, vero culpa itaque illum quod consequatur
                nesciunt earum quisquam amet repudiandae corrupti accusantium
                nam aliquam qui obcaecati rerum exercitationem?
              </div>
              <div className="infoSection">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
                mollitia ullam dicta minima corrupti nulla accusantium, tempora
                consequuntur libero! Quia maiores nihil ea earum suscipit
                praesentium quibusdam officiis blanditiis. Doloribus!
              </div>

              <div className="infoSection">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                magni eum tempore, eaque iusto alias nam, quos commodi nesciunt
                dolorum similique, voluptatem esse! Eum doloremque veniam
                inventore, porro sed unde. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Distinctio mollitia veniam, enim
                saepe magni eius quod natus consequuntur debitis expedita modi
                optio reprehenderit est eligendi, dignissimos praesentium aut
                perspiciatis assumenda. Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Architecto sequi iste impedit natus id
                exercitationem vitae laboriosam labore, dolore illum, iusto,
                sint accusamus eaque? Similique, obcaecati? Nostrum quos
                distinctio quia! Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Alias quisquam non at dignissimos beatae sunt,
                minus libero voluptas earum molestiae? Delectus aliquam
                veritatis accusamus et repellendus eligendi debitis inventore
                quasi?
              </div>
            </div>
          </div>
          <div className="milestonesContainer">
            <div className="milestonesTitle">Milestones</div>
            {!projectDeets?.Milestones.length ? (
              <div className="noMilestones">No Milestones...yet</div>
            ) : (
              <div className="milestones">
                {projectDeets?.Milestones &&
                  projectDeets.Milestones.map((milestone) => (
                    <div key={milestone.id} className="milestoneTile">
                      <div className="milestoneName">
                        <div>{milestone.name}</div>
                      </div>
                      <div className="milestoneDescription">
                        <div>{milestone.description}</div>
                      </div>
                      <div className="milestoneAnalytics">
                        {!milestone.achieved ? (
                          <div className="milestoneBar">
                            <label for="progress">
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
