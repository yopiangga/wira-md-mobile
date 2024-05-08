import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imageLogo from "src/assets/images/logo.png";
import { InputDefault } from "src/components/input/input-default";
import { AuthServices } from "src/services/AuthServices";

export function SignInPage() {
  const navigate = useNavigate();

  const authServices = new AuthServices();

  const [formData, setFormData] = useState({
    email: "doctor1@email.com",
    password: "12345678",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const res = await authServices.SignIn({ ...formData });

    if (res) {
      document.cookie = `token=${res.data.token}`;
      window.location.href = "/";
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-row justify-center">
      <form onSubmit={handleSubmit} className="w-11/12 relative">
        <div className="mt-20">
          {/*<img src={imageLogo} /> */}
          <h1 className="f-h1 ">
            Wira<span className="text-primary-main">MD</span> Mobile
          </h1>
        </div>
        <div className="mt-4">
          <h4 className="text-black text-3xl font-bold">Sign In</h4>
        </div>

        <div className="mt-14 mb-2">
          <div className="relative">
            <InputDefault
              color="dark"
              label="Email"
              name="email"
              value={formData.email}
              handleChange={handleChange}
              type={"email"}
              required={true}
              placeholder={"Email address"}
            />
          </div>
          <div className="relative mt-4">
            <InputDefault
              color="dark"
              label="Password"
              name="password"
              value={formData.password}
              handleChange={handleChange}
              type={"password"}
              required={true}
              placeholder={"********"}
            />
          </div>
        </div>

        <div className="w-full mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => {
              navigate("/forgot-password");
            }}
            className="text-primary-main f-p1-r text-right"
          >
            Forgot Password?
          </button>
        </div>

        <div className="mt-16">
          <button
            className="bg-primary-main rounded-md py-3 text-white f-h4 w-full"
            type="submit"
          >
            Sign In
          </button>

          <p className="mt-2 text-black f-p1-r">
            By continuing, you agree to our{" "}
            <span className="text-primary-main">Terms of Service </span>
            and <span className="text-primary-main">Privacy Policy</span>.
          </p>
        </div>
      </form>
    </div>
  );
}
