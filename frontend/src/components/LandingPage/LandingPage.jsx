import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProjects } from "../../store/projects";
import { useNavigate } from "react-router-dom";
import "../LandingPage/LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allProjects = useSelector((state) => state.projects.projects);
  const phrases = [
    "It All Starts Here, With You",
    "Turning Passion Into Progress",
    "Many Contributions Made, MANY Games Played",
    "Powering Creativity One Vestor At A Time",
    "A Great Idea Today, A Great Product Tomorrow",
    'Stop Saying "One Day", Today Is Day One',
    "Go Make Games!",
    "Turn Dreams Into Reality",
  ];

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  return (
    <div className="all">
      <div className="phrases">
        <h1 className="phrase">
          {phrases[Math.floor(Math.random() * phrases.length)]}
        </h1>
      </div>
      <div>
        <h2>Games That Are Being Made As We SPEAK...</h2>
      </div>
      <div>
        <div className="projects">
          {allProjects &&
            allProjects.map((project) => (
              <div
                className="project"
                key={project.id}
                onClick={() => navigate(`/${project.id}`)}
              >
                <div className="projectTitle">{project.name}</div>
                <div className="projectDescription">{project.description}</div>
                <div className="projectGenre">{project.genre}</div>
                <div className="dropdown-content">
                  <div className="projectDemographic">
                    <div>{project.country}</div>
                    <div>
                      Deadline:{" "}
                      {project.deadline.split("T").splice(0, 1).join("")}
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

export default LandingPage;
