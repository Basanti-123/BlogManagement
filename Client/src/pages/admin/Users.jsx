import React from "react";
import { Button, ButtonGroup, ButtonToolbar, Table } from "react-bootstrap";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listUsers } from "../../slices/userSlice";
import dateFormatter from "../../utils/date";
export const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users, page, limit, total } = useSelector((state) => state.users);
  const [name, setName] = useState("");

  const initFetch = useCallback(() => {
    dispatch(listUsers({ limit, page, name }));
  }, [dispatch, limit, page, name]);

  useEffect(() => {
    initFetch();
  }, [initFetch, name]);

  return (
    <div className="container">
      <div className="flex d-flex justify-content-between">
        <div>
          <h2>Users</h2>
        </div>
        <div className="search py-2 cobntain">
          <div className="input-group  ">
            <span
              className="input-group-text btn button border bg-dark text-white"
              id="basic-addon1"
            >
              <i className="fa fa-search "></i>
            </span>
            <input
              type="text"
              className="form-control "
              placeholder="Search User By Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, idx) => {
                  return (
                    <tr key={user?.slug}>
                      <td>{idx + 1}</td>
                      <td>{user?.name}</td>
                      <td>{user?.email}</td>
                      <td>{user?.phone}</td>
                      <td>{user?.roles}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No Blogs
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};
