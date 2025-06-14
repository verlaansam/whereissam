import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect after login
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-950 text-gray-200">
      <h2 className="text-2xl font-roboto-slab pl-2 ">{t("Login")}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin} className="w-4/5 flex flex-col items-center md:w-1/2">
        <p className="self-baseline">{t("Email")}</p>
        <input className="border border-gray-200 w-full p-1" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <p className="self-baseline mt-2">{t("Password")}</p>
        <input className="border border-gray-200 w-full p-1 " type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button aria-label="login" type="submit" className="text-sm text-white font-roboto-slab border p-2 ml-4 w-3/4 hover:bg-white hover:text-black mt-4">{t("Login")}</button>
      </form>
    </div>
  );
};

export default Login;
