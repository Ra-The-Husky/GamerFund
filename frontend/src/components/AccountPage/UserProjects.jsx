import { getUserProjects } from "../../store/projects";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
            <div
              key={project.id}
              className="projectTile"
              onClick={() => navigate(`/${project.id}`)}
            >
              <div className="projectTitle">{project.name}</div>
              <div>{project.info}</div>
              <div>{project.genre}</div>
              <div>{project.deadline.split("T").splice(0, 1).join("")}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserProjects;
