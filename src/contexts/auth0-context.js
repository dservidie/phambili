import React, { Component, createContext, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";

// create the context
export const Auth0Context = createContext();
// export the context as useAuth0
export const useAuth0 = () => useContext(Auth0Context);

// create a provider
export class Auth0Provider extends Component {
   state = {
      auth0Client: null,
      isLoading: true,
      isAuthenticated: false,
      user: null,
      accessToken: null,
   };
   config = {
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirect_uri: window.location.origin,
      scope: "read:current_user update:current_user_metadata",
      //audience: process.env.REACT_APP_DOMAIN,
   };
   /*
   REACT_APP_DOMAIN=http://localhost:3000
   REACT_APP_AUTH0_DOMAIN=phambili.us.auth0.com
   REACT_APP_AUTH0_CLIENT_ID=syb302fCPb0G2mXWfcAUIbXaA3r0f2G8
   
   this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: `${process.env.REACT_APP_DOMAIN}/callback`,
      audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`,
      responseType: "token id_token",
      scope: "openid email",
   });
   */

   componentDidMount() {
      this.initializeAuth0();
   }

   // initialize the auth0 library
   initializeAuth0 = async () => {
      console.log(process.env);
      console.log("initializeAuth0");
      const auth0Client = await createAuth0Client(this.config);
      this.setState({ auth0Client });

      console.log("auth0Client");
      console.log(auth0Client);

      // check to see if they have been redirected after login
      if (window.location.search.includes("error=")) {
         console.log("ERROR: ", window.location.search);
      }
      if (window.location.search.includes("code=")) {
         return await this.handleRedirectCallback();
      }

      const isAuthenticated = await auth0Client.isAuthenticated();
      const user = isAuthenticated ? await auth0Client.getUser() : null;
      console.log("user: ", user);

      const accessToken = isAuthenticated ? await auth0Client.getTokenSilently() : null;
      console.log("accessToken: ", accessToken);
      localStorage.Token = accessToken;
      this.setState({ isLoading: false, isAuthenticated, user, accessToken });
   };

   // handle the authentication callback
   handleRedirectCallback = async () => {
      console.log("handleRedirectCallback");
      this.setState({ isLoading: true });
      await this.state.auth0Client.handleRedirectCallback();
      const user = await this.state.auth0Client.getUser();

      this.setState({ user, isAuthenticated: true, isLoading: false });
      window.history.replaceState({}, document.title, window.location.pathname);
   };

   render() {
      const { auth0Client, isLoading, isAuthenticated, user, accessToken } = this.state;
      const { children } = this.props;
      const configObject = {
         isLoading,
         isAuthenticated,
         user,
         accessToken,
         loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
         getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
         getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
         logout: (...p) => auth0Client.logout(...p),
      };

      return <Auth0Context.Provider value={configObject}>{children}</Auth0Context.Provider>;
   }
}
