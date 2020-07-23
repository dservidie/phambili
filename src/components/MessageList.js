import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useAuth0 } from "../contexts/auth0-context";

const GET_MESSAGES = gql`
   {
      Features {
         _id
         campaignID
         title
         description
      }
   }
`;

const MessageList = () => {
   const { isLoading, user, loginWithRedirect, logout, accessToken } = useAuth0();

   const { loading, error, data } = useQuery(GET_MESSAGES);
   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error}</p>;
   console.log(data);
   return (
      <div className="row">
         <div className="col-md-6 offset-md-3">
            {data.Features.map(({ _id, title, description }) => (
               <div className="card-body" key={_id}>
                  <h4>{title}</h4>
                  <p>{description}</p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default MessageList;
