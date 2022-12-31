import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { UserContext } from "../UserContext/UserProvider";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import axios from "axios";
import styles from "./styles.module.css";

export const shareProfile = (event, url) => {
  event.preventDefault();
  copy(url);
  toast.success("Copied to clipboard!", { autoClose: 1500 });
};

const SendMessage = () => {
  const params = useParams();
  const { setLoading, users } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const findUserIndex = users.findIndex(
      (userElement) => userElement._id === params.id,
    );
    setUser(users[findUserIndex]);
  }, []);

  const submitMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.post(`http://localhost:3000/api/v1/message/${params.id}`, {
      text,
    });
    setLoading(false);
    setText("");
    toast.success("Message sent successfully!", { autoClose: 2500 });
  };
  return (
    <React.Fragment>
      <div>
        <div className="container text-center py-5 my-5 text-center">
          <div className="card py-5 mb-5">
            <a href data-toggle="modal" data-target="#profile">
              <img src="/assets/images/avatar.png" className="avatar " alt />
            </a>
            <h3 className="py-2">{user?.userName}</h3>
            <div className="container w-50 m-auto">
              <form action method="post">
                <textarea
                  className={"form-control px-3 py-2 " + styles.sendMessageBox}
                  name
                  id
                  cols={10}
                  rows={9}
                  placeholder="What's on your mind?"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                />
                <button
                  className="btn btn-outline-success btn-container mt-3"
                  onClick={submitMessage}
                >
                  <i className="far fa-paper-plane" /> Send
                </button>
              </form>
            </div>
          </div>
          <button
            data-toggle="modal"
            data-target="#share"
            className="btn btn-default-outline share "
            onClick={(e) => shareProfile(e, window.location)}
          >
            <i class="fas fa-share-alt" aria-hidden="true"></i> Share Profile
          </button>
        </div>
        {/*  Share profile Modal */}
        {/* <div
          className="modal fade"
          id="share"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Share Profile
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>host/messages/id</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div> */}
        {/* /modal */}
      </div>
    </React.Fragment>
  );
};

export default SendMessage;
