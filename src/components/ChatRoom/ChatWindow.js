import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import "./ChatWindow.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ChatWindow({ memberCount, onUserAdded }) {
  const { group_Id } = useParams();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [groupInfo, setGroupInfo] = useState({ groupName: "", memberCount: 0 });
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleAddMember = async () => {
    const token = sessionStorage.getItem("token");
    if (token && group_Id && username) {
      try {
        const response = await fetch(
          `https://localhost:7186/api/GroupMembers/add-people`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ group_Id, username }),
          }
        );

        if (response.ok) {
          const contentType = response.headers.get("Content-Type");
          if (contentType && contentType.includes("application/json")) {
            const newUser = await response.json();
            if (onUserAdded) {
              onUserAdded(newUser);
            }
            setUsername("");
            setError(""); // Clear any previous error
          } else {
            console.warn("Expected JSON response but got", contentType);
          }
        } else {
          const errorData = await response.json();
          if (errorData && !errorData.isSuccess && errorData.errors) {
            setError(errorData.errors || "Failed to add member.");
          } else {
            setError("Failed to add member.");
          }
        }
      } catch (error) {
        console.error("Error adding member:", error);
        setError("An error occurred while adding member.");
      }
    } else {
      console.warn("No token found in sessionStorage or groupId is missing.");
    }
  };

  const handleSendMessage = async () => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");
    if (token && group_Id && newMessage) {
      try {
        const response = await fetch(
          `https://localhost:7186/api/Message/send-message`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              group_Id,
              messageContent: newMessage,
              user_Id: userId,
            }),
          }
        );

        if (response.ok) {
          const message = await response.json();
          setMessages((prevMessages) => [...prevMessages, message]);
          setNewMessage("");
        } else {
          const errorData = await response.json();
          setError(errorData.errors || "Failed to send message.");
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setError("An error occurred while sending message.");
      }
    } else {
      console.warn("No token found in sessionStorage or message is empty.");
    }
  };

  const fetchGroupInfo = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `https://localhost:7186/api/GroupMembers/info/${group_Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setGroupInfo(data);
      } else {
        setError("Failed to fetch group information.");
      }
    } catch (error) {
      console.error("Error fetching group information:", error);
      setError("An error occurred while fetching group information.");
    }
  }, [group_Id]);

  const fetchMessages = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `https://localhost:7186/api/Message/get-messages/${group_Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        setError("Failed to fetch messages.");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError("An error occurred while fetching messages.");
    }
  }, [group_Id]);

  useEffect(() => {
    if (group_Id) {
      fetchGroupInfo();
      fetchMessages();
    }
  }, [group_Id, fetchGroupInfo, fetchMessages]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMessages(); // Fetch messages every 5 seconds
    }, 100);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [fetchMessages]);

  useEffect(() => {
    setGroupInfo((prevGroupInfo) => ({
      ...prevGroupInfo,
      memberCount,
    }));
  }, [memberCount]);

  const safeFormatDate = (date) => {
    try {
      return format(new Date(date), "hh:mm a");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div>
          <div className="row">
            <div className="col-md-9">
              <h3>{groupInfo.groupName || "Room Name"}</h3>
              <p>{groupInfo.memberCount} thành viên</p>
            </div>
            <div className="col-md-3">
              <button
                className="btn btn-primary btn-add-people mt-2"
                data-bs-toggle="modal"
                data-bs-target="#addPeopleModal"
              >
                Add People
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="addPeopleModal"
        tabIndex="-1"
        aria-labelledby="addPeopleModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addPeopleModal">
                Search user
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="friendName" className="form-label">
                  Name
                </label>
                {error && <div className="alert alert-danger">{error}</div>}
                <input
                  type="text"
                  className="form-control"
                  id="friendName"
                  placeholder="Input your friend name"
                  value={username}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddMember}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="chat-content">
        <div className="message-container">
          {messages.map((message) => (
            <div
              key={message.messageId}
              className={`message ${
                message.user_Id === sessionStorage.getItem("userId")
                  ? "message-right"
                  : "message-left"
              }`}
            >
              <div className="message-body">
                <div>
                  <p className="message-info">
                    <span>{safeFormatDate(message.sentAt)}</span> -{" "}
                    <i>{message.username}</i>
                  </p>
                </div>
                <p className="message-content">{message.messageContent}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="input-field">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={handleMessageChange}
        />
        <button type="button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

{
  /* <div className='message message-left'>
    <div className='message-body'>
        <div>
            <p className='message-info'>
                <span>15:00 PM</span> - <i>Username</i>
            </p>
        </div>
        <p className='message-content'>I'm good, thanks! How about you?</p>
    </div>
</div>
<div className='message message-right'>
    <div className='message-body'>
        <div>
            <p className='message-info'>
                <span>15:00 PM</span> - <i>Username</i>
            </p>
        </div>
        <p className='message-content'>I'm good, thanks! How about you?</p>
    </div>
</div> */
}
