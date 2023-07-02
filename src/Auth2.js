import { withRouter, Route, Switch } from "react-router-dom";

import { useState, useEffect } from "react";
import api from "./api/users";

const Auth2 = (props) => {
  const INITIAL_STATE = {
    id: "",
    username: "",
    password: "",
    checked: false,
  };
  const [form, setForm] = useState(INITIAL_STATE);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const VALIDATION = {
    username: [
      {
        isValid: (value) => !!value,
        message: "Is required.",
      },
      {
        isValid: (value) => /\S+@\S+\.\S+/.test(value),
        message: "Needs to be an email.",
      },
    ],
    password: [
      {
        isValid: (value) => !!value,
        message: "Is required.",
      },
    ],
  };

  const getErrorFields = (form) =>
    Object.keys(form).reduce((acc, key) => {
      if (!VALIDATION[key]) return acc;

      const errorsPerField = VALIDATION[key]
        // get a list of potential errors for each field
        // by running through all the checks
        .map((validation) => ({
          isValid: validation.isValid(form[key]),
          message: validation.message,
        }))
        // only keep the errors
        .filter((errorPerField) => !errorPerField.isValid);
      console.log(errorsPerField);
      console.log(acc);
      return { ...acc, [key]: errorsPerField };
    }, {});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hasErrors = Object.values(errorFields).flat().length > 0;
    if (hasErrors) return;

    console.log(form.username + " " + form.password);
    try {
      const response = await api.get("/users/filter/" + form.username);
      console.log(response.data);
      console.log(response);
      console.log(response.data[0].username);

      console.log(response.data[0].id);
      props.history.push("/home/", { state: response.data[0].id });
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  const errorFields = getErrorFields(form);
  console.log(errorFields);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Email</label>
        <input
          id="username"
          type="text"
          value={form.username}
          onChange={handleChange}
        />
        {errorFields.username?.length ? (
          <span style={{ color: "red" }}>
            {errorFields.username[0].message}
          </span>
        ) : null}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        {errorFields.password?.length ? (
          <span style={{ color: "red" }}>
            {errorFields.password[0].message}
          </span>
        ) : null}
      </div>
      <div>
        <label htmlFor="checked">Checked</label>
        <input
          id="checked"
          type="checkbox"
          value={form.checked}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default withRouter(Auth2);
