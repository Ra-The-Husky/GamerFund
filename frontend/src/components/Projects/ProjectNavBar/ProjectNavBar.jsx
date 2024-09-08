import { useNavigate } from "react-router-dom";
import "../ProjectNavBar/ProjectNavBar.css";

function ProjectNavBar({ projectId, discussionCount }) {
  const navigate = useNavigate();

  return (
    <div className="navigator">
      <div className="bar">
        <div className="projectNav">
          <div onClick={() => navigate(`/${projectId}`)}>The Project</div>
        </div>
        <div className="devPostNav">
          <div onClick={() => navigate(`/${projectId}/devPosts`)}>DevPosts</div>
        </div>
        <div className="milestoneNav">
          <div onClick={() => navigate(`/${projectId}/milestones`)}>Milestones</div>
        </div>
        <div className="incentiveNav">
          <div onClick={() => alert("Feature Coming Soon!")}>Vestor Incentives</div>
        </div>
        <div className="discussionsNav">
          <div onClick={() => navigate(`/${projectId}/discussions`)}>
            Vestor Discussions
          </div>
          <div className="discussionNum">{discussionCount}</div>
        </div>
      </div>
    </div>
  );
}

export default ProjectNavBar;
