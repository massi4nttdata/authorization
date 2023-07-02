import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withRouter, Route, Switch } from "react-router-dom";
import api from "./api/users";
const Home = (props) => {
  const [user, setUser] = useState([]);
  /*{
      id: "",
      checked: false,
      username: "",
      password: "",
    });*/
  useEffect(() => {
    try {
      //console.log(props.match.params.id);
      console.log(props.location.state);

      async function fetchData() {
        // You can await here
        //const response = await MyAPI.getData(someId);
        const response = await api.get("/users/" + props.location.state.state);
        return response;
        // ...
      }
      fetchData().then((res) => {
        console.log(res.data);

        setUser({
          id: res.data.id,
          checked: Boolean(res.data.checked),
          username: res.data.username,
          password: res.data.password,
        });
        console.log(user);
      });
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }, [props.location.state]);

  return (
    <>
      <header>welcome to user:{user.username}</header>
      <footer>
        <Link to={"/auth2/"}>Logout</Link>
      </footer>
    </>
  );
};
export default withRouter(Home);
