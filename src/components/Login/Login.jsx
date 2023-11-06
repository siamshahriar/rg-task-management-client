import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(navigate);
  const from = location.state?.from?.pathname || "/";
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        const user = result.user;
        navigate(from, { replace: true });

        const currentUser = {
          email: user.email,
        };

        //     // Redirect to the desired page after login
        //     navigate(from, { replace: true });
        //   });

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  };

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    login(email, password)
      .then((result) => {
        const user = result.user;
        navigate(from, { replace: true });

        const currentUser = {
          email: user.email,
        };

        console.log(currentUser);

        // get jwt token
        // fetch("https://genius-car-server-neon.vercel.app/jwt", {
        //   method: "POST",
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   body: JSON.stringify(currentUser),
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     console.log(data);
        //     // local storage is the easiest but not the best place to store jwt token
        //     localStorage.setItem("genius-token", data.token);

        //   });
      })
      .catch((error) => console.log(error));
    // console.log({ email, password });
  };
  return (
    <div className="hero min-h-[83vh]">
      <div className="">
        <h1 className="text-4xl font-semibold text-center mb-10">Login now!</h1>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-teal-200 pb-4">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className="text-center ">
            <Link to="/register" className="label-text-alt link link-hover">
              Register <span className="underline">here</span>
            </Link>
          </div>
          <div className="divider">OR</div>
          <div className="text-center">
            <p className="label-text-alt pb-3">
              Sign in with <span className="underline">Google</span>
            </p>
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-circle btn-warning"
            >
              G
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
