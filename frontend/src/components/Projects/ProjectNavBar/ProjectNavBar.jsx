import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
          <div onClick={() => alert("Feature Coming Soon!")}>DevPosts</div>
        </div>
        <div className="milestoneNav">
          <div onClick={() => alert("Feature Coming Soon!")}>Milestones</div>
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