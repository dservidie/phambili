import React, { useEffect } from "react";

import auth from "../contexts/Auth";
import "bootswatch/dist/cosmo/bootstrap.min.css";
import { useHistory } from "react-router-dom";

export default () => {
   let history = useHistory();
   /*
   useEffect(() => {
      try {
         console.log("auth.handleAuthentication");
         auth.handleAuthentication().then(() => {
            this.props.history.replace("/");
         });
      } catch (err) {
         if (err.error === "login_required") return;
         console.log(err.error);
      }
   }, []);
*/

   auth.handleAuthentication().then(() => {
      console.log("auth.handleAuthentication(): ", auth.isAuthenticated());
      console.log("auth: ", auth);
      /*      auth0.client.userInfo(authResult.accessToken, function (err, user) {
         console.log("user: ", user);
      });
*/
      //props.history.replace("/");
      history.goBack();
   });

   return (
      <div className="d-flex justify-content-center">
         <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
         </div>
      </div>
   );
};
