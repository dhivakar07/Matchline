import { Link, useNavigate } from "react-router-dom";
import auth from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
function Signup() {
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const [select, setselect] = useState("Candidate");

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setloading(true);
    if (!fullname.trim()) {
      setError("Name field is empty");
      return;
    }
    if (!email.trim()) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Created Successfully");
        navigate("/login");
      })
      .catch((error) => seterror(error.message))
      .finally(() => setloading(false));
  };
  return (
    <>
      <section className="signup_container">
        <div className="signup_container_two">
          <div className="signup_header">
            <h1 className="signup_brand">
              <svg
                className="signup_brand-icon"
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
            <div className="signup_para">
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
          <div className="signup_box">
            <header>
              <h3>Sign Up</h3>
              <p>
                Choose how you'll use Matchline. This sets which dashboard you
                see.
              </p>
            </header>
            <div className="signup_box-input">
              <form className="signup-form" onSubmit={handleSignup}>
                <div className="options_selector">
                  <button
                    type="button"
                    className={`${select === "Candidate" ? "selected_btn" : "candidate_btn"}`}
                    onClick={() => setselect("Candidate")}
                  >
                    Candidate
                  </button>
                  <button
                    className={`${select === "Recruiter" ? "selected_btn" : "recruiter_btn"}`}
                    onClick={() => setselect("Recruiter")}
                  >
                    Recruiter
                  </button>
                </div>
                <div className="signup_form-input">
                  <label htmlFor="fullname">Full name</label>
                  <div className="signup_fullname-input">
                    <input
                      type="text"
                      id="fullname"
                      placeholder="John"
                      required
                      value={fullname}
                      onChange={(e) => setfullname(e.target.value)}
                    />
                  </div>
                </div>
                <div className="signup_form-input">
                  <label htmlFor="email">Email</label>
                  <div className="signup_email-input">
                    <input
                      type="email"
                      id="email"
                      placeholder="abc@gmail.com"
                      required
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="signup_form-input">
                  <label htmlFor="password">Password</label>
                  <div className="signup_password-input">
                    <input
                      type="password"
                      id="password"
                      placeholder="At least 6 characters"
                      required
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>
                </div>
                {error && <span className="error-message">{error}</span>}
                <button className="signup_btn" type="submit">
                  {loading ? "Signing Up.." : "Sign Up ➜"}
                </button>
              </form>
            </div>
            <footer className="signup_footer">
              <p>
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </footer>
          </div>
        </div>
      </section>
    </>
  );
}
export default Signup;
