import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Signup failed");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-950 text-gray-200">
      <h2 className="text-2xl font-roboto-slab pl-2 ">Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="w-4/5 flex flex-col items-center" onSubmit={handleSignup}>
        <p className="self-baseline">Email</p>
        <input className="border border-gray-200 w-full p-1" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <p className="self-baseline mt-2">Password</p>
        <input className="border border-gray-200 w-full p-1 " type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="text-sm text-white font-roboto-slab border p-2 ml-4 w-3/4 hover:bg-white hover:text-black mt-4" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
