import React from "react";
import converter from "number-to-words";
import { connect } from "react-redux";
import { fetchPaths } from "../actions";
import _ from "lodash";

class Path extends React.Component {
  componentDidMount() {
    this.props.fetchPaths();
  }
  renderStepAssist() {
    const { metadata } = this.props;
    if (!metadata.paths) {
      return <div>loading</div>;
    }
    const path = metadata.paths.filter(
      (p) => p.entityName === this.props.pathType
    )[0].pathAssistantSteps;
    const assist = path.filter(
      (item) => item.picklistValueName === this.props.currentStage
    );
    if (assist.length === 0) {
      return <div></div>;
    }
    return <div dangerouslySetInnerHTML={{ __html: assist[0].info }}></div>;
  }
  renderSteps() {
    const { stages, currentStage } = this.props;
    return stages.map((stage) => {
      return (
        <a
          onClick={() => this.props.onSubmit({ StageName: stage.value })}
          href="#"
          key={stage.value}
          className={currentStage === stage.value ? "active step" : "step"}
        >
          <div className="content">
            <div className="title">{stage.value}</div>
            <div className="description"></div>
          </div>
        </a>
      );
    });
  }
  renderContent() {
    const { stages, currentStage } = this.props;
    return (
      <div className="ui two column grid">
        <div className="six wide column">
          <div
            className={`ui ${converter.toWords(
              stages.length
            )} fluid mini vertical steps`}
          >
            {this.renderSteps()}
          </div>
        </div>
        <div className="ten wide column">
          <div className="ui segment">{this.renderStepAssist()}</div>
        </div>
      </div>
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    metadata: state.metadata,
  };
};

export default connect(mapStateToProps, { fetchPaths })(Path);
