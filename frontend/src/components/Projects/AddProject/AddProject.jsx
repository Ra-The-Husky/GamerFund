import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addProject } from "../../../store/projects";
import { useNavigate } from "react-router-dom";
import countryListAllIsoData from "../../../countries";
import dateHelper from "../../../dateHelper";
import genres from "../../../genres";
import "../AddProject/AddProject.css";

function AddProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [country, setCountry] = useState("");
  let allowedDeadline = new Date();
  allowedDeadline.setDate(allowedDeadline.getDate() + 1);
  allowedDeadline = allowedDeadline
    .toISOString()
    .split("T")
    .splice(0, 1)
    .join("");
  const [deadline, setDeadline] = useState(allowedDeadline);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const testGame = () => {
    setName("New Game Project!");
    setDescription(
      "Sweet new description for test game with the necessary length to pass validations."
    );
    setGenre("Action")
    setCountry(countryListAllIsoData[45].name)
    setDeadline(dateHelper(new Date("12-24-2024")));
  };

  const submitProject = async (e) => {
    e.preventDefault();
    const errs = {};

    if (!name) {
      errs.name = "Name of your game is required";
    }
    if (!description || description.length < 25) {
      errs.description =
        "A description with a minimum length of 25 characters is required";
    }
    if (!genre) {
      errs.genre =
        "Please select a genre that is closely associated with your game";
    }
    if (!country) {
      errs.country = "Country of game origin is required";
    }
    if (deadline === new Date()) {
      errs.deadline = "Vestor deadline cannot be current day";
    }
    setErrors(errs);

    const project = {
      name,
      description,
      genre,
      country,
      deadline,
    };

    if (Object.values(errors).length) {
      return console.log(errors);
    } else {
      await dispatch(addProject(project)).then((newProject) => navigate(`/${newProject.id}`));
    }
  };

  return (
    <div className="newProjectPage">
      <h1 className="pageTitle">Add Your Game</h1>
      <form className="newProjectForm" onSubmit={submitProject}>
        <h3 className="newProjectHeader">Title of Your Game</h3>
        <div className="subheader">
          <div>Your game has a name right? Write that here</div>
          <div className="hint">
            If your game's name is still a work in progress, add "WIP" in the
            title too
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
        {Object.keys(errors) && !name && <div className="errors">{errors.name}</div>}

        <h3 className="newProjectHeader">Game Description</h3>
        <div className="subheader">
          Add a quick description for your game. Make it short and sweet, but
          catchy and interesting.
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
        {Object.keys(errors) && !description && <div className="errors">{errors.description}</div>}

        <h3 className="newProjectHeader">Genre</h3>
        <div className="subheader">
          Please select the genre that is closely associated with your game
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
              genres.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
          </select>
        </div>
        {Object.keys(errors) && !genre && (
          <div className="errors">{errors.genre}</div>
        )}

        <h3 className="newProjectHeader">Country</h3>
        <div className="subheader">
          Select the country your game is being published from
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
              countryListAllIsoData.map((country) => (
                <option key={country.number} value={country.name}>
                  {country.name}
                </option>
              ))}
          </select>
        </div>
        {Object.keys(errors) && !country && <div className="errors">{errors.country}</div>}

        <div>
          <h3 className="newProjectHeader">Vestor Deadline</h3>
          <div className="subheader">
            How long do potential vestors have before you stop accepting
            contributions?
          </div>
          <div className="fields">
            <input
              className="addDeadline"
              selected={deadline}
              type="date"
              min={allowedDeadline}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            ></input>
          </div>
        </div>
        {Object.keys(errors) && deadline && <div className="errors">{errors.deadline}</div>}

        <div className="submitLine">
          Everything set? Then there is only one thing left to do...
        </div>
        <div className="buttonContainer">
          <button className="button" type="submit">
            Add This Game?
          </button>
          <button className="button" onClick={testGame}>
            Test Game
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
