import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import Oauth from "../components/oauth";

const Register = () => {
  const [loding, setLoding] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    try {
      setLoding(true);
      await axios.post("/api/v1/users/register", values);
      setLoding(false);

      message.success("Registration is successfull");
      navigate("/login");
    } catch (error) {
      setLoding(false);
      message.error("Registration failed");
    }
  };
  return (
    <>
      {loding && <Spinner />}
      <div className="register-page">
        <Form layout="vertical" onFinish={submitHandler} className="form p-5 m-5 text-center ">
          <h1 className="fw-bold text-bg-dark">Sign Up</h1>
          <hr />
          <Form.Item label="Name" name="name" className="fw-bold">
            <Input placeholder="Name" className="fw-bold p-3 w-100 " />
          </Form.Item>

          <Form.Item label="Email" name="email" className="fw-bold">
            <Input type="email" placeholder="Email" className="fw-bold p-3"/>
          </Form.Item>

          <Form.Item label="Password" name="password" className="fw-bold">
            <Input type="password" placeholder="Password" className="fw-bold p-3" />
          </Form.Item>

          <div>
            <button className="btn btn-primary fw-bold bg-dark w-100 p-3 m-1 ">
              SIGN UP
            </button>
          </div>

          <div>
            <Oauth />
          </div>

          <div className="d-flex  gap-3 fw-bold m-2">
            Have an account?
            <Link to="/login" className="fw-bold text-black-50">
              Sign In
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
