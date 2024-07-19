import React, { Component } from "react";
import { Link,withRouter } from 'react-router-dom';

class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  changeHandle = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

    submitForm = async (e) => {
      e.preventDefault();
      const data = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      };

      try {
        const response = await fetch("https://chatapplication-backend-cjhz.onrender.com/create", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
  
        const { message } = await response.json();
  
        if (response.ok && message === "User Created Successfully") {
           alert(message);
           this.props.history.push("/");
        } 
        else if(response.ok && message === 'user exist') {
          alert("User Already Exist");
        }
      } catch (error) {
        console.error("Error:", error);
      }
     }

  render() {
    return (
      <div>
        <section className="bg-primary py-3 py-md-5 py-xl-8">
          <div className="container">
            <div className="row gy-4 align-items-center">
              <div className="col-12 col-md-6 col-xl-7">
                <div className="d-flex justify-content-center text-bg-primary">
                  <div className="col-12 col-xl-9">
                    <hr className="border-primary-subtle mb-4" />
                    <h2 className="h1 mb-4">
                      Just Few More Steps and You are Ready to Begin....!!
                    </h2>
                    <div className="text-endx">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        fill="currentColor"
                        className="bi bi-grip-horizontal"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-xl-5">
                <div className="card border-0 rounded-4">
                  <div className="card-body p-3 p-md-4 p-xl-5">
                    <div className="row">
                      <div className="col-12">
                        <div className="mb-4">
                          <h2 className="h3">Registration</h2>
                          <h3 className="fs-6 fw-normal text-secondary m-0">
                            Enter your details to register
                          </h3>
                        </div>
                      </div>
                    </div>
                    <form onSubmit={this.submitForm}>
                      <div className="row gy-3 overflow-hidden">
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              name="firstName"
                              id="firstName"
                              placeholder="First Name"
                              value={this.state.firstName}
                              onChange={this.changeHandle}
                              required
                            />
                            <label htmlFor="firstName" className="form-label">
                              First Name
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              name="lastName"
                              id="lastName"
                              placeholder="First Name"
                              value={this.state.lastName}
                              onChange={this.changeHandle}
                              required
                            />
                            <label htmlFor="lastName" className="form-label">
                              Last Name
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              placeholder="name@example.com"
                              value={this.state.email}
                              onChange={this.changeHandle}
                              required
                            />
                            <label htmlFor="email" className="form-label">
                              Email
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              id="password"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={this.changeHandle}
                              required
                            />
                            <label htmlFor="password" className="form-label">
                              Password
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-grid">
                            <button
                              className="btn btn-primary btn-lg"
                              type="submit"
                            >
                              Sign up
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end mt-4">
                          <p className="m-0 text-secondary text-center">
                            Already have an account?{" "}
                            <Link to='/'
                              className="link-primary text-decoration-none"
                            >
                              Sign in
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(Signup);
