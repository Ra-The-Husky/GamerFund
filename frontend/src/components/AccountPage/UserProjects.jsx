import { getUserProjects } from "../../store/projects";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../AccountPage/UserProjects.css";
import OpenModalButton from "../OpenModal/OpenModalDestroy";
import DestroyProjectModal from "../../components/Projects/DestroyProject/DestroyProjectModal";

function UserProjects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProjects = useSelector((state) => state.projects.projects);

  useEffect(() => {
    dispatch(getUserProjects());
  }, [dispatch]);

  return (
    <div className="Account">
      <h1>Your Active Projects</h1>
      <div className="userProjects">
        {userProjects &&
          userProjects.map((project) => (
            <div className="userProjectContainer">
              <div key={project.id} className="userProjectInfo">
                <div
                  className="userProjectTile"
                  onClick={() => navigate(`/${project.id}`)}
                >
                  <div className="userProjectTitle">{project.name}</div>
                  <div className="userProjectDescription">
                    {project.description}
                  </div>
                  <div className="userProjectDemographic">
                    <div>{project.genre}</div>
                    <div>
                      {project.deadline.split("T").splice(0, 1).join("")}
                    </div>
                  </div>
                </div>
                <div className="iconContainer">
                  <div className="icons">
                    <i
                      className="fa-regular fa-pen-to-square"
                      onClick={() => navigate(`/${project.id}/edit`)}
                    ></i>
                    <OpenModalButton
                      modalComponent={
                        <DestroyProjectModal projectId={project.id} />
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserProjects;
