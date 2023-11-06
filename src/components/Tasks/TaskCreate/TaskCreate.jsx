import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";

const TaskCreate = ({ closeDialog, setUpdateList }) => {
  const { register, resetField, handleSubmit } = useForm();
  const { user } = useContext(AuthContext);
  //   console.log(closeDialog);
  const onSubmit = (data) => {
    data.status = "Pending";
    data.priority = +data.priority;
    // Define the options for the fetch request, including the method and headers
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("task-token")}`,
      "Content-Type": "application/json", // Add this line to set the Content-Type header
    };
    const options = {
      method: "POST", // Use the POST method
      headers: headers,
      body: JSON.stringify(data), // Convert the data object to a JSON string
    };

    // Send the POST request
    fetch("http://localhost:5000/tasks/create", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((responseData) => {
        // Handle the response data from the server
        // console.log("Response Data:", responseData);
        if (responseData.insertedId) {
          // resetField("title");
          // resetField("description");
          setUpdateList(Math.floor(Math.random() * 100));
          closeDialog();
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch request
        console.error("Error:", error);
      });
  };
  return (
    <div className=" ">
      <div className="">
        <h1 className="text-4xl font-semibold text-center mb-10">
          Create Task
        </h1>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-emerald-200 pb-4 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                {...register("tasktitle")}
                type="text"
                placeholder="task title"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register("description")}
                type="text"
                placeholder="Description"
                className="textarea input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Author</span>
              </label>
              <input
                {...register("author")}
                type="email"
                defaultValue={user?.email}
                placeholder="email"
                className="input input-bordered"
                readOnly
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              <select
                {...register("priority")}
                className="select select-bordered w-full max-w-xs"
              >
                <option value={1}>Low</option>
                <option value={2}>Medium</option>
                <option value={3}>High</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-success">Create Task</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskCreate;
