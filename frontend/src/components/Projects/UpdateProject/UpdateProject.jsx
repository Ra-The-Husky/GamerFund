import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  editProject,
  getAllProjects,
  getOneProject,
} from "../../../store/projects";
import { useNavigate, useParams } from "react-router-dom";
import dateHelper from "../../../dateHelper";
import genres from "../../../genres";
import "../AddProject/AddProject.css";

function EditProject() {
  const { projectId } = useParams();
  const projectInfo = useSelector((state) => state.projects?.project);
  const projects = useSelector((state) => state.projects?.projects);
  const projectNames = projects && projects?.map((project) => project.name);
  const [name, setName] = useState(projectInfo?.name);
  const [caption, setCaption] = useState(projectInfo?.caption);
  const [description, setDescription] = useState(projectInfo?.description);
  const [genre, setGenre] = useState(projectInfo?.genre);
  const [release, setRelease] = useState(projectInfo?.release);
  const [allowedDeadline, setAllowedDeadline] = useState();
  const [deadline, setDeadline] = useState(projectInfo?.deadline);
  const [imgUrl, setImgUrl] = useState(projectInfo?.imgUrl);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let startLine = new Date();
    startLine.setDate(startLine.getDate() + 1);
    startLine = startLine.toISOString().split("T").splice(0, 1).join("");
    setAllowedDeadline(startLine);
    dispatch(getOneProject(+projectId)).then((project) => {
      setName(project?.name);
      setCaption(project?.caption);
      setDescription(project?.description);
      setGenre(project?.genre);
      setRelease(project?.release);
      setDeadline(project?.deadline);
      setImgUrl(project?.imgUrl);
    });
    dispatch(getAllProjects());
  }, [dispatch, projectId]);

  useEffect(() => {
    const errs = {};

    setErrors(errs);
  }, [name]);

  const submitEdits = async (e) => {
    e.preventDefault();
    const errs = {};
    // const formats = ["jpg", "png", "jpeg", "mp4"];

    if (!name) {
      errs.name = "Name of your game is required";
    }
    if (projectNames.includes(name) && name !== projectInfo.name) {
      errs.name = "Project Name Already Exists";
    }
    if (!description || description.length < 25) {
      errs.description =
        "A description with a minimum length of 25 characters is required";
    }
    if (!genre) {
      errs.genre =
        "Please select a genre that is closely associated with your game";
    }
    // if (!img.includes(formats)) {
    //   errs.img = "Only .jpg, .jpeg, .png, or .mp4 formats allowed";
    // }

    setErrors(errs);

    const edits = {
      name,
      caption,
      description,
      genre,
      release,
      deadline,
      imgUrl,
    };

    if (Object.values(errors).length) {
      return console.log(errors);
    } else {
      await dispatch(editProject(projectId, edits)).then(() =>
        navigate(`/${projectId}`)
      );
    }
  };

  return (
    <div className="newProjectPage">
      <h1 className="pageTitle">Update Your Game</h1>
      <form className="newProjectForm" onSubmit={submitEdits}>
        <h3 className="newProjectHeader">Title of Your Game</h3>
        <div className="subheader">
          <div>Finally settled on a name?</div>
          <div className="hint">
            If your game&apos;s title is no longer a work in progress,
            don&apos;t forget to remove the &quot;WIP&apos; from the title
          </div>
        </div>
        <div className="fields">
          <input
            className="addTitle"
            type="text"
            placeholder="Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        {Object.keys(errors) && !name && (
          <div className="errors">{errors.name}</div>
        )}

        <h3 className="newProjectHeader">Game Caption</h3>
        <div className="subheader">
          Thought of a new caption to reel in those vestors?
        </div>
        <div className="fields">
          <textarea
            className="addCaption"
            type="text"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>
        </div>
        {Object.keys(errors) && !caption && (
          <div className="errors">{errors.caption}</div>
        )}

        <h3 className="newProjectHeader">Game Description</h3>
        <div className="subheader">
          Change the description? Just don&apos;t make it too short or too
          sweet.
        </div>
        <div className="fields">
          <textarea
            className="addDescription"
            type="text"
            placeholder="Your Game's Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        {Object.keys(errors) && !description && (
          <div className="errors">{errors.description}</div>
        )}

        <h3 className="newProjectHeader">Genre</h3>
        <div className="subheader">
          The genre didn&apos;t match? Then it&apos;s time for a change.
        </div>
        <div className="fields">
          <select
            className="addGenre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option selected disabled hidden>
              Genre
            </option>
            {genres &&
              genres.map((genre2) => (
                <option
                  key={genre2.id}
                  selected={genre2.name === genre}
                  value={genre2.name}
                >
                  {genre2.name}
                </option>
              ))}
          </select>
        </div>
        {Object.keys(errors) && !genre && (
          <div className="errors">{errors.genre}</div>
        )}

        <div>
          <h3 className="newProjectHeader">Vestor Deadline</h3>
          <div className="subheader">
            So vestors have more time or less time to contribute now?
          </div>
          <div className="fields">
            <input
              className="addDeadline"
              selected={deadline?.split("T").splice(0, 1).join("")}
              type="date"
              min={allowedDeadline}
              value={deadline?.split("T").splice(0, 1).join("")}
              onChange={(e) =>
                setDeadline(dateHelper(new Date(e.target.value)))
              }
            ></input>
          </div>
        </div>
        {Object.keys(errors) && deadline && (
          <div className="errors">{errors.deadline}</div>
        )}

        <div>
          <h3 className="newProjectHeader">Est. Release Date</h3>
          <div className="subheader">
            Change of narrative direction? Someone left? Switched Engines?
            Whatever the reason, things happen. Update Vestors when to expect
            the official release.
          </div>
          <div className="fields">
            <input
              className="addRelease"
              selected={release?.split("T").splice(0, 1).join("")}
              type="date"
              min={allowedDeadline}
              value={release?.split("T").splice(0, 1).join("")}
              onChange={(e) => setRelease(e.target.value)}
            ></input>
          </div>
        </div>
        {Object.keys(errors) && release && (
          <div className="errors">{errors.release}</div>
        )}

        <div>
          <h3 className="newProjectHeader">Intro Image</h3>
          <div className="subheader">
            Got a new intro image or video to use?
          </div>
          <div className="fields">
            <input
              className="addImg"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            ></input>
          </div>
        </div>
        {Object.keys(errors) && imgUrl && (
          <div className="errors">{errors.imgUrl}</div>
        )}

        <div className="submitLine">
          Cool with your changes? Let&apos;s get it back out there!
        </div>
        <div className="buttonContainer">
          <button className="button" type="submit">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProject;
