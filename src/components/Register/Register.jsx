import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    const name = data.name;
    const imgUrl = data.imgUrl;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);

        const userInfo = {
          displayName: name,
          imgURL: imgUrl,
        };
        updateUser(userInfo)
          .then(() => {
            // console.log("success");
          })
          .catch((err) => console.log(err));

        navigate(from, { replace: true });
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="hero min-h-[83vh]">
      <div className="">
        <h1 className="text-4xl font-semibold text-center mb-10">
          Register now!
        </h1>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-emerald-200 pb-4">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image Url</span>
              </label>
              <input
                {...register("imgUrl")}
                type="text"
                placeholder="image url"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-success">Register</button>
            </div>
          </form>
          <div className="text-center ">
            <Link to="/login" className="label-text-alt link link-hover">
              Already have an account ? Login{" "}
              <span className="underline">here</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
