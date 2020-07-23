import React, { useEffect } from "react";
import { useAuth0 } from "./contexts/auth0-context";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Landing from "././components/login/Landing";
import { Navigation } from "./components/Navigation";
import Callback from "./components/Callback";
import MessageList from "./components/MessageList";
import MessageForm from "./components/MessageForm";

import "bootswatch/dist/cosmo/bootstrap.min.css";

//import auth from "./contexts/Auth";

function App() {
   const { isLoading, user, loginWithRedirect, logout, accessToken } = useAuth0();

   if (isLoading) return <div>LOADING</div>;

   console.log("user: ", user);
   if (!user) {
      return <Landing />;
   } else {
      console.log(accessToken);
      return (
         <Router>
            <Navigation />
            <div className="container p-4">
               <Switch>
                  <Route exact path="/" component={MessageList} />
                  <Route exact path="/new-message" component={MessageForm} />
               </Switch>
            </div>
         </Router>
      );
   }

   /*
   console.log("Authenticated: ", auth.isAuthenticated());
   let isLoading = false;
   if (isLoading) {
      return (
         <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
               <span className="sr-only">Loading...</span>
            </div>
         </div>
      );
   } else {
      return (
         <>
            {!auth.isAuthenticated() ? (
               <Router>
                  <div className="container p-4">
                     <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/callback" component={Callback} />
                     </Switch>
                  </div>
               </Router>
            ) : (
               <Router>
                  <Navigation />
                  <div className="container p-4">
                     <Switch>
                        <Route exact path="/" component={MessageList} />
                        <Route exact path="/new-message" component={MessageForm} />
                        <Route exact path="/callback" component={Callback} />
                     </Switch>
                  </div>
               </Router>
            )}
         </>
      );
   }
*/
}

export default App;
