import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div className="no-match">
      <h1 className="no-match__heading">Oops! 404 - Page Not Found</h1>
      <p className="no-match__text">
        Sorry, the page you are looking for does not exist, or you don't have
        access to it.
      </p>
      <p className="no-match__text">
        Please check the URL or{" "}
        <Link to="/" className="no-match__link">
          return to the homepage
        </Link>
        .
      </p>
    </div>
  );
};

export default NoMatch;
