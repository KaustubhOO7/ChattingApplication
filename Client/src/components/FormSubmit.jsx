import React, { Component } from "react";
import "./css/FormSubmit.css";
import { Link,withRouter } from "react-router-dom";

class AcceptingForm extends Component {
  state = {
    email: "",
    password: "",
  };

  changeHandle = (e) => {
    const values = { ...this.state };
    values[e.currentTarget.name] = e.currentTarget.value;
    this.setState(values);
  };

  submitForm = async (e) => {
    e.preventDefault();
    const data = { email: this.state.email, password: this.state.password };

    try {
      const response = await fetch("https://chatapplication-backend-cjhz.onrender.com/check", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const { message } = await response.json();

      if (message && message !== "user not exist" && message !== 'wrong email or password') {
          this.props.history.replace({
            pathname : '/login',
            state : {data : message}
          });
      } else if(message && message === 'wrong email or password') {
        alert("Wrong Email Id or Password");
      }
      else{
        alert("User does not Exist.Create an Account to Login!!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  render() {
    return (
      <section className="bg-primary p-3 p-md-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-5">
                        <h3>Log in</h3>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={this.submitForm}>
                    <div className="row gy-3 overflow-hidden">
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
                          <label htmlFor="email" className="form-label">Email</label>
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
                          <label htmlFor="password" className="form-label">Password</label>
                        </div>
                      </div>
                      <div className="col-12">
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn bsb-btn-2xl btn-primary b4-button" type="submit">
                            Log in
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-10">
                      <hr className="mt-5 mb-4 border-secondary-subtle" />
                      <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                        <Link to="/signup" className="link-secondary text-decoration-none">Create new account</Link>
                        <Link to="/forgotPpassword" className="link-secondary text-decoration-none">Forgot password ?</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(AcceptingForm);
