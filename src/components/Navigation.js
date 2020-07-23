import React from "react";
import { useAuth0 } from "../contexts/auth0-context";
import { Link } from "react-router-dom";
import auth from "../contexts/Auth";
export const Navigation = () => {
   const { isLoading, user, loginWithRedirect, logout, accessToken } = useAuth0();
   /*
   const logout = () => {
      auth.logout();
      this.props.history.replace("/");
   };

   const user = { name: "", picture: "" };
*/
   return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
         <Link className="navbar-brand" to="#">
            Revamping
         </Link>
         <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
         >
            <span className="navbar-toggler-icon" />
         </button>
         <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
               <li className="nav-item">
                  <Link className="nav-link" to="/">
                     Messages
                  </Link>
               </li>
               <li className="nav-item">
                  <Link className="nav-link" to="/new-message">
                     New Message
                  </Link>
               </li>
               <li className="nav-item">
                  <button
                     className="btn btn-outline-success my-2 my-sm-0"
                     onClick={async () => {
                        const apiURL = `http://localhost:5000/`;
                     }}
                     className="button is-small is-dark"
                  >
                     TEST
                  </button>
               </li>
            </ul>
            <button
               className="btn btn-outline-success my-2 my-sm-0"
               onClick={() => logout()}
               className="button is-small is-dark"
            >
               {user && user.name}
               {user && user.picture && (
                  <img
                     src={user.picture}
                     alt="My Avatar"
                     style={{ maxHeight: "40px", maxWidth: "auto", borderRadius: "50%" }}
                  />
               )}
            </button>

            <button
               className="btn btn-outline-success my-2 my-sm-0"
               onClick={() => logout()}
               className="button is-small is-dark"
            >
               Logout
            </button>
         </div>
      </nav>
   );
};
