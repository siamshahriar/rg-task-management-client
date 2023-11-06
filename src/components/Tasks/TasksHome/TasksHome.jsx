import { BsFilterCircleFill, BsEyeFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaSort } from "react-icons/fa6";
import TaskCreate from "../TaskCreate/TaskCreate";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const TasksHome = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const taskCreateDialog = useRef(null);
  const [updateList, setUpdateList] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState(null); // Track the sorting criteria (e.g., "priority", "status")
  const [sortOrder, setSortOrder] = useState(null); // Track the sorting order (asc or desc)
  const componentRef = useRef(null);
  const navigate = useNavigate();
  // console.log(tasks.length);

  const fetchTotalTasks = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("task-token")}`,
      };

      const totalTasksResponse = await fetch(
        `http://localhost:5000/tasks?email=${user?.email}&searchText=${searchText}&priority=${priority}&status=${status}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      if (totalTasksResponse.ok) {
        const totalTasksData = await totalTasksResponse.json();
        setTotalTasks(totalTasksData);
      } else {
        console.error("Error fetching total tasks from the server");
      }
    } catch (error) {
      console.error("An error occurred while fetching total tasks:", error);
    }
  };

  useEffect(() => {
    fetchTotalTasks();
  }, [searchText, priority, status, updateList]);

  // console.log(totalTasks);

  // Function to calculate the number of pages
  const calculateTotalPages = () => {
    return Math.ceil(totalTasks.length / perPage);
  };

  const handleClickOnComponent = () => {
    if (componentRef.current) {
      componentRef.current.click();
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
    sendQueryToServer();
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    sendQueryToServer();
  };

  // Handle "Items per Page" change
  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  //items index number calculator

  // Generate the buttons for pagination
  const renderPaginationButtons = () => {
    const totalPages = calculateTotalPages();

    // const totalPages = 2;

    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`join-item btn ${i === currentPage ? "btn-active" : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  const closeTaskCreateDialog = () => {
    if (taskCreateDialog.current) {
      taskCreateDialog.current.close();
    }
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      // If the same field is clicked again, toggle the order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a different field is clicked, set it to ascending by default
      setSortBy(field);
      setSortOrder("asc");
    }
    sendQueryToServer();
  };

  const urlWithPagination = `http://localhost:5000/tasks?email=${user?.email}&searchText=${searchText}&priority=${priority}&status=${status}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${currentPage}&perPage=${perPage}`;

  // const sendQueryToServer = async () => {
  //   try {
  //     const response = await fetch(urlWithPagination);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setTasks(data);
  //     } else {
  //       console.error("Error fetching data from the server");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };

  const sendQueryToServer = async () => {
    try {
      const headers = {
        // Define your headers here
        Authorization: `Bearer ${localStorage.getItem("task-token")}`,
        "Content-Type": "application/json",
        // Add more headers as needed
      };

      const response = await fetch(urlWithPagination, {
        method: "GET", // or other HTTP method like POST
        headers: headers, // Include the headers object here
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error("Error fetching data from the server");
        navigate("/");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    sendQueryToServer();
  }, [searchText, priority, status, updateList, currentPage, perPage]);

  //create Task Modal
  const InfoModal = () => {
    return (
      <dialog
        id="taskCreate"
        className="modal modal-bottom sm:modal-middle"
        ref={taskCreateDialog}
      >
        <div className="modal-box ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <TaskCreate
            setUpdateList={setUpdateList}
            closeDialog={closeTaskCreateDialog}
          ></TaskCreate>
          {/* <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={closeTaskCreateDialog}>
                Close
              </button>
            </form>
          </div> */}
        </div>
      </dialog>
    );
  };

  //deleteTask handler
  const handleDeleteTask = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //fetch - DELETE operation
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("task-token")}`,
        };
        const options = {
          method: "DELETE", // Use the DELETE method
          headers: headers,
        };

        fetch(`http://localhost:5000/tasks/view/${id}`, options)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            // The resource has been successfully deleted
            // console.log("Resource deleted successfully");
            setTasks(tasks.filter((task) => task._id !== id));
            if (currentPage !== 1 && tasks.length === 1) {
              setCurrentPage(currentPage - 1);
            }
            // console.log(tasks.length);
            fetchTotalTasks();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch((error) => {
            // Handle any errors that occurred during the fetch request
            console.error("Error:", error);
            Swal.fire("Error");
          });
      }
    });
  };
  return (
    <div className="text-center">
      {/* <p className="text-2xl font-medium my-10">Create Tasks</p> */}
      <div className="my-7">
        <button
          className="btn btn-outline btn-success"
          onClick={() => document.getElementById("taskCreate").showModal()}
        >
          Create New Task{" "}
          <AiOutlineFileAdd className="text-xl"></AiOutlineFileAdd>
        </button>
        <InfoModal></InfoModal>
      </div>
      <div className="lg:flex justify-center items-center gap-10">
        <input
          value={searchText}
          onChange={handleSearchChange}
          type="text"
          placeholder="Search here"
          className="input input-bordered input-accent w-full max-w-xs "
        />
        <div className="flex justify-center items-center gap-3 my-4">
          <BsFilterCircleFill className="text-2xl"></BsFilterCircleFill>
          <div className="flex gap-2">
            <select
              value={priority}
              onChange={handlePriorityChange}
              className="select select-bordered w-full max-w-xs"
            >
              <option defaultValue>All</option>
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
            </select>
            <select
              value={status}
              onChange={handleStatusChange}
              className="select select-bordered w-full max-w-xs"
            >
              <option defaultValue>All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto min-h-full">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>
                  <div
                    ref={componentRef}
                    onClick={() => {
                      toggleSort("priority");
                    }}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <span>Priority</span> <FaSort></FaSort>{" "}
                  </div>
                </th>
                <th>
                  <div
                    onClick={() => {
                      toggleSort("status");
                    }}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <span>Status</span> <FaSort></FaSort>{" "}
                  </div>
                </th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 2 */}
              {tasks.map((task, index) => (
                <tr className="hover" key={task._id}>
                  <th>{index + 1 + (currentPage - 1) * perPage}</th>
                  <td>{task.tasktitle}</td>
                  <td>
                    {task.priority === 1
                      ? "Low"
                      : task.priority === 2
                      ? "Medium"
                      : task.priority === 3 && "High"}
                  </td>

                  <td>{task.status}</td>
                  <td className="flex justify-center gap-2 text-xl cursor-pointer">
                    <Link to={`/tasks/view/${task._id}`}>
                      <BsEyeFill></BsEyeFill>
                    </Link>
                    <Link to={`/tasks/edit/${task._id}`}>
                      <FiEdit></FiEdit>
                    </Link>

                    <AiFillDelete
                      onClick={() => handleDeleteTask(task._id)}
                    ></AiFillDelete>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="join">{renderPaginationButtons()}</div>
      {tasks.length !== 0 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <p className="font-medium">Per Page </p>
          <select
            value={perPage}
            onChange={handlePerPageChange}
            className="select select-bordered max-w-xs"
          >
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default TasksHome;
