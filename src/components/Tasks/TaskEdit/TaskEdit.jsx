import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../providers/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";

const TaskEdit = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id: taskId } = useParams();
  const [taskData, setTaskData] = useState(null);

  //first get the task details
  useEffect(() => {
    // Make the API call when the component is mounted
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("task-token")}`,
    };
    fetch(`http://localhost:5000/tasks/view/${taskId}`, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => setTaskData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [taskId]);

  if (!taskData) {
    return (
      <div className="text-center min-h-[40vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>;
      </div>
    );
  }

  const onSubmit = (data) => {
    console.log(data);
    data.priority = +data.priority;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("task-token")}`,
      "Content-Type": "application/json", // Add this line to set the Content-Type header
    };
    fetch(`http://localhost:5000/tasks/edit/${taskId}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Task was updated successfully
          // You can add code to handle success, e.g., redirect or display a success message
          // console.log("success");
          navigate("/tasks");
        } else {
          // Handle errors here, e.g., show an error message
          console.error("Error:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className=" ">
      <div className="">
        <h1 className="text-4xl font-semibold text-center my-10">Task Edit</h1>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-emerald-200 pb-4 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                {...register("tasktitle")}
                type="text"
                defaultValue={taskData?.tasktitle}
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
                defaultValue={taskData?.description}
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
                defaultValue={taskData?.author}
                placeholder="email"
                className="input input-bordered"
                readOnly
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                {...register("status")}
                className="select select-bordered w-full max-w-xs"
                defaultValue={taskData?.status}
              >
                <option value={"Pending"}>Pending</option>
                <option value={"Completed"}>Completed</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              <select
                {...register("priority")}
                className="select select-bordered w-full max-w-xs"
                defaultValue={taskData.priority}
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

export default TaskEdit;
