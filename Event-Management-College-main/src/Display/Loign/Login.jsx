import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up") {
      const signupData = {
        name,
        department,
        semester,
        admissionNumber,
        registerNumber,
        phone,
        email,
        password,
      };
      console.log("SIGN UP DATA:", signupData);
    } else {
      const loginData = {
        registerNumber,
        password,
      };
      console.log("LOGIN DATA:", loginData);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[100vh] flex items-center justify-center"
    >
      <div className="flex flex-col gap-4 p-8 pt-10 min-w-[340px] sm:min-w-[420px] bg-gray-700/30 backdrop-blur-lg border border-white/10 rounded-xl text-gray-200 text-sm shadow-xl">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to continue
        </p>

        {/* CREATE ACCOUNT */}
        {state === "Sign Up" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* Row 1 */}
            <Input label="Full Name" value={name} setValue={setName} />
            <Input label="Department" value={department} setValue={setDepartment} />

            {/* Row 2 */}
            <Input label="Semester" value={semester} setValue={setSemester} />
            <Input
              label="Admission Number"
              value={admissionNumber}
              setValue={setAdmissionNumber}
            />

            {/* Row 3 */}
            <Input
              label="Register Number"
              value={registerNumber}
              setValue={setRegisterNumber}
            />
            <Input label="Phone" value={phone} setValue={setPhone} type="tel" />

            {/* Full width */}
            <div className="sm:col-span-2">
              <Input label="Email" value={email} setValue={setEmail} type="email" />
            </div>
          </div>
        )}

        {/* LOGIN */}
        {state === "Login" && (
          <Input
            label="Register Number"
            value={registerNumber}
            setValue={setRegisterNumber}
          />
        )}

        {/* PASSWORD (COMMON) */}
        <Input
          label="Password"
          value={password}
          setValue={setPassword}
          type="password"
        />

        <button className="bg-blue-950 hover:bg-blue-900 text-white w-full py-2 rounded-md text-base mt-2">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

/* 🔹 Reusable Input Component */
const Input = ({ label, value, setValue, type = "text" }) => (
  <div className="w-full">
    <p className="mb-1">{label}</p>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="border border-gray-500 rounded w-full p-2 bg-transparent focus:outline-none focus:border-blue-500"
      required
    />
  </div>
);

export default Login;
