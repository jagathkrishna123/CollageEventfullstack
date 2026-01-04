import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TEACHERS, STUDENTS, SIGNUPDATA } from "../../Constants/ProgramData";
import { useAppContext } from "../../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  
  // Flow states: 'id-input' | 'otp-verification' | 'signup' | 'login'
  const [step, setStep] = useState("id-input");
  const [userType, setUserType] = useState(null); // 'student' | 'teacher'
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  
  // ID Input state
  const [idInput, setIdInput] = useState("");
  
  // OTP state
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    department: "",
    semester: "",
    admissionNumber: "", // For students
    registerNumber: "",
    gender: "", // For teachers
    designation: "", // For teachers
    qualification: "", // For teachers
  });
  
  // Login form state
  const [loginData, setLoginData] = useState({
    registerNumber: "",
    password: "",
  });

  // Generate OTP (6-digit random number)
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Department code mapping
  const departmentMap = {
    BCM: "B.Com (Bachelor of Commerce)",
    SPY: "Psychology",
    BCA: "Bachelor of Computer Application",
    BSW: "Bachelor of Social Work",
    BBA: "Bachelor of Business Administration",
  };

  // Extract department from ID
  const extractDepartment = (id) => {
    // Format: AEDXBCM002, SFAXBCA001, or SFAYBBA003
    // Extract the department code (3 letters after the separator letter like X or Y)
    const match = id.match(/[A-Z]{3}[A-Z]([A-Z]{3})/);
    if (match && match[1]) {
      const deptCode = match[1];
      return departmentMap[deptCode] || deptCode;
    }
    return "";
  };

  // Handle ID submission
  const handleIdSubmit = (e) => {
    e.preventDefault();
    const id = idInput.trim().toUpperCase();
    
    if (!id) {
      toast.error("Please enter an ID");
      return;
    }

    // Check if ID starts with SFA (Student) or AED (Teacher)
    let foundEmail = "";
    let foundUserType = "";
    
    if (id.startsWith("SFA")) {
      // Find student in STUDENTS array
      const student = STUDENTS.find((s) => s.regNo === id);
      if (!student) {
        toast.error("Student ID not found. Please contact administrator.");
        return;
      }
      foundUserType = "student";
      foundEmail = student.email;
      const detectedDept = extractDepartment(id);
      setUserType("student");
      setUserEmail(student.email);
      setUserId(id);
      setSignupData((prev) => ({ 
        ...prev, 
        registerNumber: id, 
        email: student.email,
        department: detectedDept
      }));
    } else if (id.startsWith("AED")) {
      // Find teacher in TEACHERS array
      const teacher = TEACHERS.find((t) => t.teacherId === id);
      if (!teacher) {
        toast.error("Teacher ID not found. Please contact administrator.");
        return;
      }
      foundUserType = "teacher";
      foundEmail = teacher.email;
      const detectedDept = extractDepartment(id);
      setUserType("teacher");
      setUserEmail(teacher.email);
      setUserId(id);
      setSignupData((prev) => ({ 
        ...prev, 
        registerNumber: id, 
        email: teacher.email,
        department: detectedDept
      }));
    } else {
      toast.error("Invalid ID format. ID must start with 'SFA' (Student) or 'AED' (Teacher)");
      return;
    }

    // Generate and "send" OTP
    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);
    setOtpSent(true);
    setStep("otp-verification");
    
    // In production, this would call a backend API to send OTP via email
    // For now, we'll show it in console and toast (for testing)
    console.log(`OTP for ${id}: ${newOtp}`);
    toast.info(`OTP sent to ${foundEmail}. For testing, check console.`);
  };

  // Handle OTP verification
  const handleOtpVerify = (e) => {
    e.preventDefault();
    
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    if (otp === generatedOtp) {
      toast.success("OTP verified successfully!");
      setStep("signup");
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  // Handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!signupData.name || !signupData.password || !signupData.mobile || !signupData.department) {
      toast.error("Please fill all required fields");
      return;
    }

    if (userType === "student" && !signupData.semester) {
      toast.error("Semester is required for students");
      return;
    }

    if (userType === "student" && !signupData.admissionNumber) {
      toast.error("Admission number is required for students");
      return;
    }

    if (userType === "teacher" && !signupData.gender) {
      toast.error("Gender is required for teachers");
      return;
    }

    if (userType === "teacher" && !signupData.designation) {
      toast.error("Designation is required for teachers");
      return;
    }

    if (userType === "teacher" && !signupData.qualification) {
      toast.error("Qualification is required for teachers");
      return;
    }

    if (signupData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!/^\d{10}$/.test(signupData.mobile)) {
      toast.error("Mobile number must be 10 digits");
      return;
    }

    try {
      // Simulate signup using SIGNUPDATA
      const existingUser = SIGNUPDATA.find(user =>
        user.registerNumber === signupData.registerNumber &&
        user.email === signupData.email
      );

      if (existingUser) {
        // Check if all required fields match the dummy data
        const requiredFields = [
          'name', 'email', 'password', 'mobile', 'department', 'registerNumber'
        ];

        if (userType === 'student') {
          requiredFields.push('semester', 'admissionNumber');
        } else if (userType === 'teacher') {
          requiredFields.push('gender', 'designation', 'qualification');
        }

        const isValid = requiredFields.every(field => {
          if (field === 'password') {
            return signupData.password === existingUser.password;
          }
          if (field === 'confirmPassword') {
            return true; // Already validated above
          }
          return signupData[field] === existingUser[field];
        });

        if (isValid) {
          // Simulate successful registration
          toast.success(`${userType === "student" ? "Student" : "Teacher"} registered successfully!`);
          setStep("login");
          setLoginData((prev) => ({ ...prev, registerNumber: signupData.registerNumber }));

          // Reset signup form
          setSignupData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            mobile: "",
            department: "",
            semester: "",
            admissionNumber: "",
            registerNumber: "",
            gender: "",
            designation: "",
            qualification: "",
          });
        } else {
          toast.error("Registration data doesn't match our records. Please check your information.");
        }
      } else {
        toast.error("Registration number or email not found in our system.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during registration.");
    }
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!loginData.registerNumber || !loginData.password) {
      toast.error("Please enter register number and password");
      return;
    }

    try {
      // Simulate login using SIGNUPDATA
      const user = SIGNUPDATA.find(u =>
        u.registerNumber === loginData.registerNumber &&
        u.password === loginData.password &&
        u.userType === userType
      );

      if (user) {
        toast.success("Login successful!");

        // Create user object for context
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          registerNumber: user.registerNumber,
          userType: user.userType,
          department: user.department,
          mobile: user.mobile,
        };

        // Add type-specific fields
        if (userType === "student") {
          userData.semester = user.semester;
          userData.admissionNumber = user.admissionNumber;
        } else if (userType === "teacher") {
          userData.gender = user.gender;
          userData.designation = user.designation;
          userData.qualification = user.qualification;
        }

        // Store user data in localStorage
        localStorage.setItem("token", "dummy-token-" + Date.now());
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("userType", userType);

        // Set user in context
        setUser(userData);

        // Navigate to appropriate dashboard
        if (userType === "teacher") {
          navigate("/teacher");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Invalid credentials. Please check your register number and password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login.");
    }
  };

  // Reset OTP (for resend functionality)
  const handleResendOtp = () => {
    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);
    setOtp("");
    console.log(`New OTP for ${userId}: ${newOtp}`);
    toast.info("OTP resent. For testing, check console.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-gray-900 to-black p-4">
      <div className="w-full max-w-md">
        {/* ID Input Step */}
        {step === "id-input" && (
          <form onSubmit={handleIdSubmit} className="bg-gray-700/30 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-2">Verify</h2>
            <p className="text-gray-400 mb-6">Enter your ID to continue</p>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Register Number/ID</label>
              <input
                type="text"
                value={idInput}
                onChange={(e) => setIdInput(e.target.value.toUpperCase())}
                placeholder="xxxxxxxxxx"
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
            >
              Continue
            </button>
          </form>
        )}

        {/* OTP Verification Step */}
        {step === "otp-verification" && (
          <form onSubmit={handleOtpVerify} className="bg-gray-700/30 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-2">Verify OTP</h2>
            <p className="text-gray-400 mb-2">OTP sent to: {userEmail}</p>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-center text-2xl tracking-widest focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
              >
                Verify OTP
              </button>
              <button
                type="button"
                onClick={handleResendOtp}
                className="px-4 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-medium transition"
              >
                Resend
              </button>
            </div>
            
            <button
              type="button"
              onClick={() => {
                setStep("id-input");
                setIdInput("");
                setOtp("");
                setUserType(null);
                setUserEmail("");
                setUserId("");
                setSignupData({
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  mobile: "",
                  department: "",
                  semester: "",
                  admissionNumber: "",
                  registerNumber: "",
                  gender: "",
                  designation: "",
                  qualification: "",
                });
              }}
              className="mt-4 text-gray-400 hover:text-white text-sm"
            >
              ← Back
            </button>
          </form>
        )}

        {/* Signup Form Step */}
        {step === "signup" && (
          <form onSubmit={handleSignup} className="bg-gray-700/30 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-2">
              {userType === "student" ? "Student" : "Teacher"} Signup
            </h2>
            <p className="text-gray-400 mb-6">Complete your registration</p>
            
            <div className="space-y-4">
              <Input
                label="Full Name"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                required
              />
              
              <Input
                label="Email"
                type="email"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                disabled
                className="bg-gray-800/30"
              />
              
              <Input
                label="Register Number/ID"
                value={signupData.registerNumber}
                onChange={(e) => setSignupData({ ...signupData, registerNumber: e.target.value.toUpperCase() })}
                disabled
                className="bg-gray-800/30"
              />
              
              <Input
                label="Mobile Number"
                type="tel"
                value={signupData.mobile}
                onChange={(e) => setSignupData({ ...signupData, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                placeholder="10 digits"
                required
              />
              
              <Input
                label="Department"
                value={signupData.department}
                onChange={(e) => setSignupData({ ...signupData, department: e.target.value })}
                disabled
                className="bg-gray-800/30"
              />
              
              {userType === "student" && (
                <>
                <Input
                    label="Semester"
                    value={signupData.semester}
                    onChange={(e) => setSignupData({ ...signupData, semester: e.target.value })}
                    required
                  />
                  <Input
                    label="Admission Number"
                    value={signupData.admissionNumber}
                    onChange={(e) => setSignupData({ ...signupData, admissionNumber: e.target.value.toUpperCase() })}
                    required
                  />
                  
                </>
              )}

              {userType === "teacher" && (
                <>
                  <div>
                    <label className="block text-gray-300 mb-2">Gender <span className="text-red-500">*</span></label>
                    <select
                      value={signupData.gender}
                      onChange={(e) => setSignupData({ ...signupData, gender: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <Input
                    label="Designation"
                    value={signupData.designation}
                    onChange={(e) => setSignupData({ ...signupData, designation: e.target.value })}
                    placeholder="e.g., Assistant Professor, Associate Professor"
                    required
                  />
                  <Input
                    label="Qualification"
                    value={signupData.qualification}
                    onChange={(e) => setSignupData({ ...signupData, qualification: e.target.value })}
                    placeholder="e.g., M.Sc, Ph.D, M.Com"
                    required
                  />
                </>
              )}
              
              <Input
                label="Password"
                type="password"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                required
                minLength={6}
              />

              <Input
                label="Confirm Password"
                type="password"
                value={signupData.confirmPassword}
                onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                required
                minLength={6}
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition mt-6"
            >
              Create Account
            </button>

            <p className="mt-4 text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setStep("login")}
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Login here
              </button>
            </p>

            <button
              type="button"
              onClick={() => setStep("otp-verification")}
              className="mt-4 text-gray-400 hover:text-white text-sm"
            >
              ← Back
            </button>
          </form>
        )}

        {/* Login Form Step */}
        {step === "login" && (
          <form onSubmit={handleLogin} className="bg-gray-700/30 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-2">Login</h2>
            <p className="text-gray-400 mb-6">Enter your credentials to continue</p>
            
            <div className="space-y-4">
              <Input
                label="Register Number"
                value={loginData.registerNumber}
                onChange={(e) => setLoginData({ ...loginData, registerNumber: e.target.value.toUpperCase() })}
                required
              />
              
              <Input
                label="Password"
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition mt-6"
            >
              Login
            </button>
            
            <p className="mt-4 text-center text-gray-400 text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setStep("id-input");
                  setIdInput("");
                  setUserType(null);
                  setUserEmail("");
                  setUserId("");
                  setSignupData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    mobile: "",
                    department: "",
                    semester: "",
                    admissionNumber: "",
                    registerNumber: "",
                    gender: "",
                    designation: "",
                    qualification: "",
                  });
                }}
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Sign up
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

// Reusable Input Component
const Input = ({ label, value, onChange, type = "text", placeholder = "", required = false, disabled = false, className = "", ...props }) => (
  <div>
    <label className="block text-gray-300 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 ${className}`}
      {...props}
    />
  </div>
);

export default Login;
