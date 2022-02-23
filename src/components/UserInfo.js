import React from "react";
import "../App.css";

const UserInfo = (props) => {
  const { first_name, email, avatar } = props.info;

  return (
    <div className="userdetails">
      <div className="userdetails1">
        <div className="imgdetails">
          <img src={avatar} alt="avatar" />
        </div>
        <div className="namedetails">
          <h4>{first_name}&nbsp;</h4>
          <sup style={{ color: "green", fontWeight: "bold" }}>*</sup>
        </div>

        <p>{email}</p>
        <h3>Your Plan: Standard</h3>
        <button>Active User</button>
      </div>
      <div className="plandetails">
        <h4>Plan Uses</h4>
        <div className="horizontaline">
          <hr className="hr1" />
          <hr className="hr2" />
        </div>
        <div className="clicks">
          <div className="clicksrevieved">
            <h2>2,450</h2>
            <p>clicks reviewed</p>
          </div>
          <div style={{ border: "1px solid gray" }}>
            <p></p>
          </div>
          <div className="clicksrevieved">
            <h2>5,000</h2>
            <p>Monthly clicks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
