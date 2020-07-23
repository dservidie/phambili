import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "./contexts/auth0-context";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import auth from "./contexts/Auth";

const client = new ApolloClient({
   uri: "http://localhost:3100",
   request: (operation) => {
      console.log("#############  TOKEN", localStorage.Token);
      operation.setContext((context) => ({
         headers: {
            ...context.headers,
            authorization: `Bearer ${localStorage.Token}`,
         },
      }));
   },
});

ReactDOM.render(
   <Auth0Provider>
      <ApolloProvider client={client}>
         <App />
      </ApolloProvider>
   </Auth0Provider>,
   document.getElementById("root")
);
