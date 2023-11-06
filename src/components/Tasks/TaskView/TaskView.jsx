import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

const TaskView = () => {
  const { id: taskId } = useParams();
  // console.log(id);
  const [taskData, setTaskData] = useState(null);

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

  console.log(taskData);

  return (
    <div className=" ">
      <div className="">
        <div className="flex justify-center items-center gap-3 my-10">
          <h1 className="text-4xl font-semibold text-center">Task Details</h1>
          <Link className="cursor-pointer" to={`/tasks/edit/${taskId}`}>
            <FiEdit className="text-2xl"></FiEdit>
          </Link>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-emerald-200 pb-4 mx-auto">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Task Title</span>
              </label>
              <input
                defaultValue={taskData?.tasktitle}
                type="text"
                readOnly
                className="textarea input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                defaultValue={taskData?.description}
                type="text"
                readOnly
                className="textarea input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Author</span>
              </label>
              <input
                type="email"
                defaultValue={taskData?.author}
                placeholder="email"
                className="input input-bordered"
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              <input
                type="text"
                defaultValue={
                  taskData.priority === 1
                    ? "Low"
                    : taskData.priority === 2
                    ? "Medium"
                    : taskData.priority === 3 && "High"
                }
                className="input input-bordered"
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <input
                type="text"
                defaultValue={taskData?.status}
                className="input input-bordered"
                readOnly
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskView;
