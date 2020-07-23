import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const CREATE_MESSAGE = gql`
   mutation CreateMessage($title: String!, $content: String!, $author: String!) {
      createMessage(input: { title: $title, content: $content, author: $author }) {
         _id
      }
   }
`;

const MessageForm = () => {
   const [author, setAuthor] = useState("");
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [createMessage] = useMutation(CREATE_MESSAGE);

   return (
      <div className="row">
         <div className="col-md-6 offset-md-3">
            <div className="card">
               <div className="card-body">
                  <form
                     onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                           await createMessage({
                              variables: {
                                 title,
                                 content,
                                 author,
                              },
                           });
                        } catch (error) {
                           console.log("ERROR: ");
                           console.log(error);
                        }

                        window.location.href = "/";
                     }}
                  >
                     <div className="form-group">
                        <input
                           type="text"
                           placeholder="Autor"
                           className="form-control"
                           value={author}
                           onChange={(e) => setAuthor(e.target.value)}
                        />
                     </div>
                     <div className="form-group">
                        <input
                           type="text"
                           placeholder="Write a Title"
                           className="form-control"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                        />
                     </div>
                     <div className="form-group">
                        <textarea
                           placeholder="Content..."
                           className="form-control"
                           value={content}
                           onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                     </div>
                     <button className="btn btn-primary btn-block">Save</button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default MessageForm;
