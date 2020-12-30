import React from "react";
import Modal from "../components/Modal";
import history from "../history";

import securityToken1 from "../static/images/securityToken1.png";
import securityToken2 from "../static/images/securityToken2.png";
import securityToken3 from "../static/images/securityToken3.png";

class MoreInfo extends React.Component {
  renderActions() {
    return (
      <div>
        <button onClick={() => history.push("/")} className="ui button">
          Cancel
        </button>
      </div>
    );
  }

  renderContent() {
    return (
      <div className="scrolling content">
        <h1>
          1. Click your user icon in the right hand corner of the screen and go
          to <b style={{ color: "red" }}>Settings</b>
        </h1>
        <div className="ui clearing divider"></div>
        <img src={securityToken1} className="ui large bordered image"></img>
        <h1>
          2. Click on <b style={{ color: "red" }}>Reset My Security Token</b> in
          the left hand navigation menu
        </h1>
        <div className="ui clearing divider"></div>
        <img src={securityToken2} className="ui large bordered image"></img>
        <h1>
          3. Click <b style={{ color: "red" }}>Reset Security Token</b>
        </h1>
        <div className="ui clearing divider"></div>
        <img src={securityToken3} className="ui bordered image"></img>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Modal
          title="Get your security token"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/")}
        />
      </div>
    );
  }
}

export default MoreInfo;
