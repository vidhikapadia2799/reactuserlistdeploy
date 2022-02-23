import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { listUsers } from "../redux/actions/UserListAction";
import UserInfo from "./UserInfo";
import Pagination from "./Pagination";
import api from "../api/Userapi";

const UserList = () => {
  const users = useSelector((state) => state.allUsers.users);
  const dispatch = useDispatch();

  const [userStatus, setUserStatus] = useState("Active");
  const [userOwner, setUserOwner] = useState("Owner");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [userInfo, setUserInfo] = useState({
    id: 1,
    first_name: "vidhi",
    email: "v@gmail.com",
    avatar: "../images/avatar2.jpg",
  });

  const handleChangeStatus = (e) => {
    setUserStatus(e.target.value);
  };
  const handleChangeOwner = (e) => {
    setUserOwner(e.target.value);
  };
  const handleMouseOver = (params) => {
    console.log("ID", params.id);
    setUserInfo(params);
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("users?page=${1}");
      setPageCount(response.data.total);
      dispatch(listUsers(response.data.data));
    } catch (error) {
      setHasError(true);
      if (error.response.status === 404) {
        setErrorMessage("Internal Server Error");
      } else if (error.response.status === 401) {
        setErrorMessage("You are not authorized to view this page");
      } else {
        setErrorMessage("Something went wrong");
      }
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  console.log("Users", users);

  return (
    <div className="parent_div">
      {!hasError ? (
        <div>
          <div className="main_div">
            <div className="userlist">
              <table>
                <thead>
                  <tr style={{ textAlign: "left" }}>
                    <th style={{ width: "40%" }}>Name</th>
                    <th style={{ width: "30%" }}>Status</th>
                    <th style={{ width: "30%" }}>Owner</th>
                    {/* <th style={{ width: "10%" }}>Icon</th> */}
                  </tr>
                </thead>
                {users.map((user, index) => {
                  return (
                    <tbody key={user.id}>
                      <tr onMouseEnter={() => handleMouseOver(user)}>
                        <td>
                          <div className="user_name">
                            <img src={user.avatar} alt="avatar" />
                            <div className="user_fullname">
                              <div>{user.first_name}</div>
                              <div>{user.email}</div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="user_status">
                            {index === 0 ? (
                              <div
                                style={{ color: "green", fontWeight: "bold" }}
                              >
                                Active
                              </div>
                            ) : (
                              <select onChange={handleChangeStatus}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                            )}
                          </div>
                        </td>

                        <td>
                          <div className="user_owner">
                            {index === 0 ? (
                              <div>Manager</div>
                            ) : (
                              <select onChange={handleChangeOwner}>
                                <option value="Owner">Owner</option>
                                <option value="Manager">Manager</option>
                                <option value="Read">Read</option>
                              </select>
                            )}
                          </div>
                        </td>

                        <td>
                          <div className="user_icon">
                            {index === 0 ? (
                              <i className="fa fa-lock" />
                            ) : (
                              <i className="fa fa-trash-o" />
                            )}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>

            <div className="userinfo">
              <UserInfo info={userInfo} />
            </div>
          </div>
          <div className="pagination">
            <Pagination count={pageCount} />
          </div>
        </div>
      ) : (
        <div>
          <h1>{errorMessage}</h1>
        </div>
      )}
    </div>
  );
};

export default UserList;
