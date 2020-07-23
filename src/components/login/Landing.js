import React, { useState } from "react";
import { useAuth0 } from "../../contexts/auth0-context";

//import auth from "../../contexts/Auth";

const StartPage = () => {
   const { isLoading, user, loginWithRedirect, logout, accessToken } = useAuth0();

   return (
      <>
         <h1>Click Below!</h1>
         <button onClick={() => loginWithRedirect()} className="button is-danger">
            Login (Module)
         </button>
      </>
   );
};
/*
         <button onClick={() => auth.login()} className="button is-danger">
            Login (Class)
         </button>
         */
export default StartPage;
