import React from "react";

const Home = () => {
  return (
    <div className="min-h-[87vh] flex justify-center items-center ">
      <div className="hero min-h-[80vh] bg-base-200 rounded-lg">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://img.freepik.com/free-vector/isometric-time-management-concept-illustrated_52683-55534.jpg?w=826&t=st=1698941224~exp=1698941824~hmac=be632b7d0cc2bf430627fda30905595b9987a1e1b6678dfc65e6e2c04c901360"
            className="max-w-md rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Task Management System</h1>
            <p className="py-6 lg:pe-14">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Create your Task now</button>
            <div className="pt-4 ">
              <button className="btn btn-secondary me-4">Login</button>
              <button className="btn btn-accent">Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
