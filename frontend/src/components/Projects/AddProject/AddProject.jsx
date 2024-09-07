import { useDispatch } from "react-redux";
import { useState } from "react";
import { addProject } from "../../../store/projects";
import { useNavigate } from "react-router-dom";
import dateHelper from "../../../dateHelper";
import genres from "../../../genres";
import "../AddProject/AddProject.css";

function AddProject() {
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [genre, setGenre] = useState("");
  const [release, setRelease] = useState();
  // const sessionUser = useState((state) => state.user)
  let allowedDeadline = new Date();
  allowedDeadline.setDate(allowedDeadline.getDate() + 1);
  allowedDeadline = allowedDeadline
    .toISOString()
    .split("T")
    .splice(0, 1)
    .join("");
  const [deadline, setDeadline] = useState(allowedDeadline);
  const [imgUrl, setImgUrl] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const testGame = () => {
    setName("Big City Beatdown");
    setCaption(
      "The Big Boss of the underworld mysteriously disappeared. Who will become the next Big Boss?"
    );
    setDescription(
      "A power vacuum has put Big City in a lethal civil war. With nothing to lose and everything to gain, fight, prosper, and conquer Big City's underworld and become the next Big City Boss!"
    );
    setGenre("Fighting");
    // setCountry(sessionUser.country)
    setRelease(dateHelper(new Date("01-01-2030")));
    setDeadline(dateHelper(new Date("12-24-2029")));
    setImgUrl("https://rl-gamerfund.s3.us-east-2.amazonaws.com/Big+City+Beatdown.jpg");
  };

  const submitProject = async (e) => {
    e.preventDefault();
    const errs = {};
    // const formats = ["jpg", "png", "jpeg", "mp4"];

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
    if (deadline === new Date()) {
      errs.deadline = "Vestor deadline cannot be current day";
    }
    // if (!img.includes(formats)) {
    //   errs.img = "Only .jpg, .jpeg, .png, or .mp4 formats allowed";
    // }
    setErrors(errs);

    const project = {
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
      await dispatch(addProject(project)).then((newProject) =>
        navigate(`/${newProject.id}`)
      );
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
            If your game&apos;s name is still a work in progress, add
            &quot;WIP&quot; in the title too
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
          Catch potential vestor&apos;s attention with an interesting caption for you
          game
        </div>
        <div className="fields">
          <input
            className="addCaption"
            type="text"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></input>
        </div>
        {Object.keys(errors) && !caption && (
          <div className="errors">{errors.caption}</div>
        )}

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
        {Object.keys(errors) && !description && (
          <div className="errors">{errors.description}</div>
        )}

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
        {Object.keys(errors) && deadline && (
          <div className="errors">{errors.deadline}</div>
        )}

        <div>
          <h3 className="newProjectHeader">Est. Release Date</h3>
          <div className="subheader">
            Unfortunately, projects have to end and the game needs to be
            released. What is the expect/estimated time of release for your
            game?
          </div>
          <div className="fields">
            <input
              className="addRelease"
              selected={release}
              type="date"
              min={allowedDeadline}
              value={release}
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
            Spice up your game&apos;s page with an intro image or video
          </div>
          <div className="">
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
}

export default AddProject;
