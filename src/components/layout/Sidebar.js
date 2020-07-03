import React from "react";
import { Link } from "react-router-dom";
import { BsFillPersonPlusFill } from "react-icons/bs";

export default () => {
  return (
    <Link to="/client/add" className="btn btn-success btn-block">
      <BsFillPersonPlusFill /> New
    </Link>
  );
};
