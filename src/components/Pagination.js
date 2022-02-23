import React from "react";
import { useDispatch } from "react-redux";
import { listUsers } from "../redux/actions/UserListAction";
import ReactPaginate from "react-paginate";
import api from "../api/Userapi";

const Pagination = (props) => {
  const dispatch = useDispatch();

  const fetchComments = async (currentPage) => {
    try {
      const res = await api.get(`users?page=${currentPage}`);
      // console.log("pagination", res.data);
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    const commentsFormServer = await fetchComments(currentPage);
    dispatch(listUsers(commentsFormServer));
  };

  return (
    <div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={props.count}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"paginationBttns"}
        pageLinkClassName={"previousBttn"}
        previousLinkClassName={"previousBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

export default Pagination;
