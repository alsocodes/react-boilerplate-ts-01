import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import TextInput from "../../components/TextInput";
import { PostLogin } from "../../slices/AuthSlice";

export interface IFormLogin {
  username: string;
  password: string;
}

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const { loggedIn } = useTypedSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<IFormLogin>();

  const inputs = [
    {
      name: "username",
      type: "text",
      label: "What is your username, ",
      placeholder: "Username",
      register: register("username", { required: "Username harus diisi" }),
      errors: errors,
      defaultValue: "superadmin",
    },
    {
      name: "password",
      type: "password",
      label: "and your password?",
      placeholder: "Password",
      register: register("password", { required: "Password harus diisi" }),
      errors: errors,
      defaultValue: "123456",
    },
  ];

  const formSubmit: SubmitHandler<IFormLogin> = (data) => {
    // console.log(data);
    // dispatch(setToast({ type: 'error', message: 'Wrong username or password' }));
    dispatch(PostLogin(data));
  };

  return (
    <section className="h-screen">
      <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
        <div className="flex-grow">
          <div className="flex w-full h-full items-center justify-center">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="login-background"
              className="max-w-lg"
            />
          </div>
        </div>
        <div className="xl:w-5/12 lg:w-5/12 md:w-8/12 w-full lg:h-screen py-10 px-20 bg-primary">
          <div className="items-center justify-center flex w-full h-full flex-grow">
            <form className="w-full" onSubmit={handleSubmit(formSubmit)}>
              <div className="flex flex-row items-center justify-center lg:justify-start mb-2">
                <p className="text-xl text-black py-2">Sign in</p>
              </div>
              {/* <input type="text" name="username" {...register('username')} />
              <input type="text" name="password" {...register('password')} /> */}

              {inputs.map((item) => {
                return <TextInput key={item.name} {...item} />;
              })}

              <div className="text-center lg:text-right mt-4">
                <button className="btn btn-primary px-5" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
