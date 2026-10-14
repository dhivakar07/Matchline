import { useState } from "react";
import auth from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState();
  const [loading, setloading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setloading(true);
    seterror("");

    if (!email.trim()) {
      seterror("Enter the Email");
      setloading(false);
      return;
    }
    if (!password.trim()) {
      seterror("Enter the Password");
      setloading(false);
      return;
    }
    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim(),
      ).then(() => navigate("/home"));
    } catch (err) {
      console.error("Login Error:", err.code);
      switch (err.code) {
        case "auth/invalid-email":
          seterror("Invalid email address");
          break;

        case "auth/invalid-credential":
          seterror("Invalid email or password");
          break;

        case "auth/user-disabled":
          seterror("Your account has been disabled");
          break;

        case "auth/too-many-requests":
          seterror("Too many attempts. Try again later");
          break;

        case "auth/network-request-failed":
          seterror("Network error. Check your connection");
          break;
        default:
          seterror("Login failed. Please try again");
      }
    } finally {
      setloading(false);
    }
  };
  return (
    <>
      <section className="login_container">
        <div className="login_header">
          <h1 className="login_brand">
            <svg
              className="login_brand-icon"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
            >
              <rect width="20" height="20" rx="4.4" fill="#0A5D50" />
              <rect
                x="4.2"
                y="11.8"
                width="1.8"
                height="3.6"
                rx="0.8"
                fill="#E4F1EE"
              />
              <rect
                x="7.2"
                y="9.4"
                width="1.8"
                height="6.0"
                rx="0.8"
                fill="#E4F1EE"
              />
              <rect
                x="10.2"
                y="6.2"
                width="1.8"
                height="9.2"
                rx="0.8"
                fill="#D9A441"
              />
              <rect
                x="13.2"
                y="8.2"
                width="1.8"
                height="7.2"
                rx="0.8"
                fill="#E4F1EE"
              />
              <rect
                x="16.2"
                y="10.6"
                width="1.8"
                height="4.8"
                rx="0.8"
                fill="#E4F1EE"
              />
            </svg>
            Matchline
          </h1>
          <div className="login_para">
            <h2>
              Matched on substance,
              <br />
              not keywords
            </h2>
            <p>
              Matchline reads resumes and job descriptions the way a person
              would, then explains exactly why each match makes sense.
            </p>
          </div>
        </div>
        <div className="login_box">
          <header>
            <h3>Welcome back</h3>
            <p>
              Log in to see your matches. We'll take you straight to your
              dashboard.
            </p>
          </header>
          <div className="login_box-input">
            <form className="login-form" onSubmit={handleLogin}>
              <div className="login_form-input">
                <label htmlFor="email">Email</label>
                <div className="login_email-input">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
              </div>
              <div className="login_form-input">
                <label htmlFor="password">Password</label>
                <div className="login_password-input">
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="f_pass">
                <p>Forgot password?</p>
              </div>
              {error && <span className="error-message">{error}</span>}
              <button className="login_btn" type="submit">
                {loading ? "Logging In.." : "Log in ➜"}
              </button>
            </form>
          </div>
          <footer className="login_footer">
            <p>
              Don't have an account? <Link to="/">Sign up</Link>
            </p>
          </footer>
        </div>
      </section>
    </>
  );
}
export default Login;
