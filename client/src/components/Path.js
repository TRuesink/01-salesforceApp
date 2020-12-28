import React from "react";
import converter from "number-to-words";
import { connect } from "react-redux";
import { fetchPaths } from "../actions";

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
      return <div>Add Instructions to Path Assist in your Salesforce Org</div>;
    }
    return <div dangerouslySetInnerHTML={{ __html: assist[0].info }}></div>;
  }

  onClickStage = (stage) => {
    this.props.onSubmit({ StageName: stage });
  };

  renderSteps() {
    const { stages, currentStage } = this.props;
    let activeIndex = 100;
    return stages.map((stage, index) => {
      if (stage.value === currentStage) {
        activeIndex = index;
      }
      return (
        <a
          onClick={() => this.onClickStage(stage.value)}
          href="#"
          key={stage.value}
          className={
            index < activeIndex
              ? "completed step"
              : index > activeIndex
              ? "step"
              : "active step"
          }
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
    const { stages } = this.props;
    return (
      <div className="ui two column grid">
        <div className="six wide column">
          <div
            className={
              this.props.isFetching
                ? "ui basic segment loading"
                : "ui basic segment"
            }
          >
            <div
              className={`ui ${converter.toWords(
                stages.length
              )} fluid mini vertical ordered steps`}
            >
              {this.renderSteps()}
            </div>
          </div>
        </div>
        <div className="ten wide column">
          <div
            style={{ height: "100%" }}
            className={
              this.props.isFetching ? "ui segment loading" : "ui segment"
            }
          >
            <h3>Directions</h3>
            <div className="ui clearing divider"></div>
            {this.renderStepAssist()}
          </div>
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
