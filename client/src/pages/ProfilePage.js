import React, { useState } from "react";
import Layout from "./../components/layout/Layout";
import axios from "axios";
import { message } from "antd";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [pic, setPic] = useState(false);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const selectImg = () => {
    const input = document.getElementById("img-input");
    input.click();
  };

  const updateHandler = async () => {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("userId", user._id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {

      
      const { data } = await axios.post("/api/v1/users/update-profile", formData, {
        headers: {
          "Content-Type": "multiparts/form-data",
        },
      });

      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.data, password: "" })
      );
      setPic(!pic);

      message.success("Profile Updated SuccessFully");
    } catch (error) {
      console.log(error);
      message.error("Profile Updated Failed");
    }
  };

  return (
    <Layout>
      <h1 className="d-flex justify-content-center text-bg-dark">
        Profile Page
      </h1>
      <section className="vh-100 bg-dark">
        <div className="container py-5 h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100 bg-dark">
            <div className="col-md-12 col-xl-4 bg-dark">
              <div className="card bg-gradient  " style={{ borderRadius: 15 }}>
                <div className="card-body text-center  ">
                  <h1 className="text-bg-dark">{user.name}</h1>
                  <div className="mt-3 mb-4  ">
                    <img
                      src={pic ? URL.createObjectURL(photo) : user.photo}
                      className="rounded-circle img-fluid"
                      style={{ width: 200, height: 200, cursor: "pointer" }}
                      onClick={selectImg}
                    />
                    <br />

                    <input
                      type="file"
                      className="form-control"
                      id="img-input"
                      name="photo"
                      onChange={(e) => {
                        setPhoto(e.target.files[0]);
                        setPic(true);
                      }}
                      style={{ display: "none" }}
                    />
                  </div>
                  <div className="profile-data">
                    <label className="fw-bolder">Name </label>
                    <br />
                    <input
                      type="text"
                      placeholder="username"
                      defaultValue={user.name}
                      id="username"
                      className="border p-3 rounded-lg m-1"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <label className="fw-bolder">Email</label>
                    <br />
                    <input
                      type="email"
                      placeholder="email"
                      id="email"
                      defaultValue={user.email}
                      className="border p-3 rounded-lg m-1"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary btn-rounded btn-lg mt-3"
                    onClick={updateHandler}
                  >
                    Update your Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProfilePage;
