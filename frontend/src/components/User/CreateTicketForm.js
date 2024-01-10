import React, { useState } from "react";
import axios from "axios";
import "./CreateTicketForm.css"; // Import CSS file
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTicketForm = (props) => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [notification, setNotification] = useState(null);
  const createdBy=props.userId
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCreateTicket = async () => {
    try {
      
      await axios.post(
        "http://localhost:5000/ticket/create",
        {
          description,
          createdBy,
        },
      );
      toast.success("Ticket created successfully!");

      // Wait for some time (e.g., 2000 milliseconds or 2 seconds)
      setTimeout(() => {
        // Navigate after waiting
        navigate("/user");
      }, 2500);

      // Clear the form after successful submission
      setDescription("");
    } catch (error) {
      // Set notification state to error message
      setNotification({
        type: "error",
        message: "Error creating ticket. Please try again.",
      });
    }
  };

  // Function to close the notification
  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="create-ticket-container2">
      <div className="create-ticket-container">
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Apply CSS class to the main container */}
        <h1>Create Ticket</h1>
        <label>
          Description:
          <textarea value={description} onChange={handleDescriptionChange} />
        </label>
        <br />
        <button onClick={handleCreateTicket}>Create Ticket</button>

        {/* Display notification if it exists */}
        {notification && (
          <div style={{margin:'2% auto'}} className={`notification ${notification.type}`}>
            {notification.message}
            <button style={{padding:'1px 5px'}} onClick={closeNotification}>&times;</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTicketForm;