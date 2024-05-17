import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, json, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import Oauth from "../components/oauth";

const Login = () => {
  const [loding, setLoding] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    try {
      setLoding(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      setLoding(false);

      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      message.success("Login is Successfull");
      navigate("/");
    } catch (error) {
      setLoding(false);
      message.error("Login failed");
    }
  };

  return (
    <>
      {loding && <Spinner />}
      <div className="login-page">
        <Form
          layout="vertical"
          onFinish={submitHandler}
          className="form  text-center p-5 m-5  "
        >
          <h1 className="fw-bold text-bg-dark p-2 ">Sign In</h1>
          <hr />
          <Form.Item label="Email" name="email" className="fw-bold">
            <Input type="email" placeholder="Email" className="fw-bold p-3" />
          </Form.Item>

          <Form.Item label="Password" name="password" className="fw-bold">
            <Input type="password" placeholder="Password" className="fw-bold p-3" />
          </Form.Item>

          <div>
            <button className="btn btn-primary fw-bold bg-dark w-100 p-3 m-1 ">
              SIGN IN
            </button>
          </div>

          <div>
            <Oauth />
          </div>

          <div className="d-flex  gap-3 fw-bold m-2">
            Dont have an account ?
            <Link to="/register" className="fw-bold text-black-50">
              Sign Up
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
