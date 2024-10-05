import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const demo = (e) => {
    e.preventDefault();
    setErrors({})
    dispatch(thunkLogin({ email: 'demo@aa.io', password: "password" }))
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if (data?.errors) setErrors(data.errors)
        })
  }

  return (
    <>
      <h1>Log In</h1>
      <form className="login-form w-[25vw]" onSubmit={handleSubmit}>
        <label className="font-light">
          Email
          <input
          className="input-field font-medium"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label className="font-light">
          Password
          <input
          className="input-field font-medium"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <div className="login-buttons">
          <button type="submit">Log In</button>
          <button className='demo-user-btn' onClick={demo}>Demo User</button>
        </div>

      </form>
    </>
  );
}

export default LoginFormModal;
