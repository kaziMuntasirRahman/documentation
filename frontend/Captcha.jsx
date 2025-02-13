import { Link } from "react-router-dom";
import Input from "../Components/authentication/Input";
import SubmitButton from "../Components/authentication/SubmitButton";
import SocialLogin from "../Components/authentication/SocialLogin";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [captcha, setCaptcha] = useState("")

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, [])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, captcha);
    if (validateCaptcha(captcha)) {
      alert("Captcha Matched...");
    } else {
      alert("Captcha doesn't match...")
    }
  }

  return (
    <div className="bg-[url(/assets/others/authentication.png)] w-full h-auto pt-40 pb-14">
      <div className="flex flex-col md:flex-row justify-between items-center w-[1200px] h-[700px] mx-auto shadow-[10px_10px_10px_10px_rgba(0,0,0,0.25)] pr-20 pl-10 py-[50px]">
        <img className="" src="/assets/others/authentication2.png" />
        <form onSubmit={handleFormSubmit} className="flex flex-col items-center">
          <div className="text-center text-[#151515] text-3xl font-bold font-['Inter']">Login</div>
          <Input
            label="Email"
            placeholder="Type here"
            onChangeMethod={setEmail}
            type="email"
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            onChangeMethod={setPassword}
          />
          <div className="mr-auto mb-4">
            <LoadCanvasTemplate />
          </div>
          <Input
            placeholder="Enter captcha"
            type="text"
            onChangeMethod={setCaptcha}
          />
          <SubmitButton name="Sign In" />
          <Link to='/register' className="text-[#d1a054] text-lg font-medium font-['Inter'] text-center">New here?&nbsp;
            <span className="font-bold">Create a New Account</span>
          </Link>
          <p className="text-[#444444] text-lg font-medium font-['Inter'] mt-6 mb-4">Or sign in with</p>
          <SocialLogin />
        </form>
      </div>
    </div>
  );
};

export default Login;