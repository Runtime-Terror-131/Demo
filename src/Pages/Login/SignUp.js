import { useState } from "react";
import { auth } from "../../Config/Firebase-Config";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User signed up successfully
        const user = userCredential.user;
        console.log("User signed up successfully:", user);
      })
      .catch((error) => {
        // Error occurred during sign up
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during sign up:", errorCode, errorMessage);
      });
  };

  return (
    <form onSubmit={handleSignup}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button type="submit">Sign up</button>
    </form>
  );
}
export default Signup;