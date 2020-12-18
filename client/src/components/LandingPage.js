import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

import { signIn, changeFormStatus } from "../actions";
import { LOADING, NOT_LOADING } from "../actions/types";

import "../static/css/landingPage.css";
import salesforceLogo from "../static/images/salesforceLogo.png";

class LandingPage extends React.Component {
  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.changeFormStatus(LOADING);
    this.props.signIn(formValues);
  };
  componentDidMount() {
    this.props.changeFormStatus(NOT_LOADING);
  }

  renderInput({ iconName, input, meta }) {
    return (
      <div className="ui left icon input">
        <input {...input}></input>
        <i className={iconName}></i>
      </div>
    );
  }

  render() {
    return (
      <div style={{ marginTop: "100px" }} className="ui placeholder segment">
        <div className="ui internally celled grid stackable">
          <div className="row">
            <div className="eight wide column center aligned">
              <div className="landing-column">
                <form
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                  className={`ui ${this.props.formStatus} form`}
                >
                  <div className="field">
                    <label>Email</label>
                    <Field
                      name="username"
                      component={this.renderInput}
                      iconName="user icon"
                    />
                  </div>
                  <div className="field">
                    <label>Password</label>
                    <Field
                      name="password"
                      component={this.renderInput}
                      iconName="lock icon"
                    />
                  </div>
                  <div className="field">
                    <label>Security Token</label>
                    <Field
                      name="securityToken"
                      component={this.renderInput}
                      iconName="lock icon"
                    />
                  </div>
                  <button
                    style={{ backgroundColor: "#04A3E3", color: "white" }}
                    className="ui submit button"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
            <div className="eight wide column center aligned">
              <div className="landing-column">
                <h1>Simple Sales Tracker</h1>
                <p>
                  A simple interface to track opportunities and leads for any
                  sales process
                </p>
                <div style={{ fontStyle: "italic" }}>Powered By</div>
                <img className="ui image" src={salesforceLogo}></img>
                <a
                  style={{ marginTop: "30px" }}
                  href="https://developer.salesforce.com/signup"
                >
                  Sign up for a Salesforce developer account to try it out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LandingPage = reduxForm({
  form: "signInForm",
})(LandingPage);

const mapStateToProps = (state) => {
  return {
    formStatus: state.formStatus,
  };
};

export default connect(mapStateToProps, { signIn, changeFormStatus })(
  LandingPage
);
