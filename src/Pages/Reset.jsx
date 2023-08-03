import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Header from "../Components/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Reset() {
  
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { id, token } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await axios.post(`/api/password-reset/${id}/${token}`, {
        password,
      });
      setMsg(data.data.message);
      navigate("/");
      if (!data){
      
        return toast.error("Invalid Input", { theme: "colored" });
      }else{
        setError(data.response.data.message)
        return toast.error(error, { theme: "colored" });
      }
     
    } catch (error) {
      console.log(error);
     
     return toast.error(`*${error.response.data.message}*`, { theme: "colored" });
     
    }
  }

  return (
    <>
      <Header />
      <div className="reset-container">
        <form onSubmit={handleSubmit}>
        {error && <p className="alert alert-danger">{error}</p>}
        {msg && <p className="alert alert-success">{msg}</p>}
          <div className="reset-content">
            <h4 className="reset-title">Reset Password</h4>
            <TextField
              type="password"
              name="password"
              placeholder="Enter New Password"
              variant="outlined"
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="reset-footer">
           
              <Button variant="contained" color="success" type="submit">
                submit
              </Button>
              <ToastContainer autoClose={3000} theme="colored" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Reset;
