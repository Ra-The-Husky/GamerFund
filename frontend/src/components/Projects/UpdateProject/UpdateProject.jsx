import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  editProject,
  getAllProjects,
  getOneProject,
} from "../../../store/projects";
import { useNavigate, useParams } from "react-router-dom";
import countryListAllIsoData from "../../../countries";
import dateHelper from "../../../dateHelper";
import genres from "../../../genres";
import "../AddProject/AddProject.css";

function EditProject() {
  const { projectId } = useParams();
  const projectInfo = useSelector((state) => state.projects?.project);
  const projects = useSelector((state) => state.projects?.projects);
  const projectNames = projects && projects?.map((project) => project.name);
  const [name, setName] = useState(projectInfo?.name);
  const [description, setDescription] = useState(projectInfo?.description);
  const [genre, setGenre] = useState(projectInfo?.genre);
  const [country, setCountry] = useState(projectInfo?.country);
  const [release, setRelease] = useState(projectInfo?.release);
  const [allowedDeadline, setAllowedDeadline] = useState();
  const [deadline, setDeadline] = useState(projectInfo?.deadline);
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
      setDescription(project?.description);
      setGenre(project?.genre);
      setRelease(project?.release);
      setDeadline(project?.deadline);
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

    setErrors(errs);

    const edits = {
      name,
      description,
      genre,
      release,
      deadline,
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

        <h3 className="newProjectHeader">Country</h3>
        <div className="subheader">
          Your game is being published from somewhere else now?
        </div>
        <div className="fields">
          <select
            className="addCountry"
            onChange={(e) => setCountry(e.target.value)}
          >
            <option selected disabled hidden>
              Country
            </option>
            {countryListAllIsoData &&
              countryListAllIsoData.map((country2) => (
                <option
                  key={country2.number}
                  selected={country2.name === country}
                  value={country2.name}
                >
                  {country2.name}
                </option>
              ))}
          </select>
        </div>
        {Object.keys(errors) && !country && (
          <div className="errors">{errors.country}</div>
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
