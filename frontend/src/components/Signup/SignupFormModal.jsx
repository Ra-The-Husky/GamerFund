import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import countryListAllIsoData from "../../countries";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [developer, setDeveloper] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false)
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setErrors({});

      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
          country,
          developer,
          companyName,
          image,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="formInput"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {errors.firstName && <p>{errors.firstName}</p>}

        <input
          className="formInput"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {errors.lastName && <p>{errors.lastName}</p>}

        <input
          className="formInput"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p>{errors.email}</p>}

        <input
          className="formInput"
          type="text"
          placeholder="Desired Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {errors.username && <p>{errors.username}</p>}

        <input
          className="formInput"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p>{errors.password}</p>}

        <input
          className="formInput"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

        <select
          className="formInput"
          onChange={(e) => setCountry(e.target.value)}
        >
          <option selected disabled hidden>
            Please Select Your Country
          </option>
          {countryListAllIsoData &&
            countryListAllIsoData.map((country) => (
              <option
                className="country"
                key={country.code}
                value={country.name}
              >
                {country.name}
              </option>
            ))}
        </select>

        <label>
          <div className="signupTitles">Are you a Dev? </div>
          <div className="devBox">
            <div className="formHelper">Yes, I&apos;m def a dev</div>
            <input
              type="checkbox"
              value={developer}
              onChange={(e) => setDeveloper(e.target.value) && setChecked(true)}
            ></input>
          </div>
        </label>

        <label className="companyInfo">
          <div className="signupTitles">
            What is your gaming company or team&apos;s name?
          </div>
          <div className="companyBox">
            <div className="formHelper">
              This information can be entered later if not available now
            </div>
            <input
              className="formInput"
              placeholder="Your Company/Team's Name Here"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            ></input>
          </div>
        </label>

        <label className="avatarInfo">
          <div className="signupTitles">Add an Avatar</div>

          <div className="avatarBox">
            <div className="formHelper">
              This isn&apos;t required and can be added/changed later on
            </div>
            <input type="file" onChange={updateFile} />
          </div>
        </label>
        <button className="signupButton" type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
