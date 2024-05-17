import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";


const Oauth = () => {

  const navigate=useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await axios.post("/api/v1/users/google", {
        name: result.user.displayName,
        email: result.user.email,
        photo:result.user.photoURL
      });

      localStorage.setItem(
        "user",
        JSON.stringify({ ...res.data.user, password: "" })
      );
      
      message.success("Login SuccessFull")
      navigate("/")

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <button type="button" className="btn btn-primary fw-bolder bg-danger w-100 m-1 p-3 " onClick={handleGoogleClick}>
      Continue with Google
    </button>
  );
};

export default Oauth;
