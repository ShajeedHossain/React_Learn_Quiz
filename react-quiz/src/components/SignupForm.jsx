import { useState } from "react";
import Button from "./Button";
import CheckBox from "./CheckBox";
import Form from "./Form";
import TextInput from "./TextInput";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function SignupForm(){
    const [username, setUsername]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const [agree, setAgree]=useState("");
    const [error, setError]=useState("");
    const [loading, setLoading]=useState();

    const {signup}=useAuth();
    const navigate=useNavigate(); 

    async function handleSubmit(event){
        event.preventDefault();
        if(password!==confirmPassword){
            return setError("Passwords don't match");
        }

        try{
            setError("");
            setLoading(true)
            await signup(email,password,username);
            navigate("/");
        } catch(err){
            console.log(err);
            setLoading(false);
            setError("Failed to signup");
        }
    }

    return(
        <Form style={{height: "500px"}} onSubmit={handleSubmit}>
          <TextInput type="text" required placeholder="Enter Name" icon="person" value={username} onChange={(e)=>setUsername(e.target.value)}/>

          <TextInput
            type="text"
            placeholder="Enter Email"
            required
            icon="alternate_email"
            value={email} onChange={(e)=>setEmail(e.target.value)}
          />

          <TextInput type="password" required placeholder="Enter Password" icon="lock" value={password} onChange={(e)=>setPassword(e.target.value)}/>

          <TextInput
            type="password"
            required
            placeholder="Confirm Password"
            icon="lock_clock"
            value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}
          />

          <CheckBox required text="I agree to the Terms &amp; Conditions " value={agree} onChange={(e)=>setAgree(e.target.value)}/>

          <Button disable={loading} type="submit">
            <span>Submit Now</span>
          </Button>

          {error && <p className="error">{error}</p>}

          <div className="info">
            Already have an account? <Link to="/login">Login</Link> instead.
          </div>
        </Form>
    );
}