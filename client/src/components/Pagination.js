import React from "react";

class Pagination extends React.Component {
  renderPrev() {
    const { pagination } = this.props;
    if (!pagination.prev) {
      return;
    }
    return (
      <a
        href="#"
        onClick={() => this.props.onPageTurn(pagination.prev)}
        className="item"
      >
        {pagination.prev.page}
      </a>
    );
  }
  renderNext() {
    const { pagination } = this.props;
    if (!pagination.next) {
      return;
    }
    return (
      <a
        href="#"
        onClick={() => this.onPageClick(pagination.next)}
        className="item"
      >
        {pagination.next.page}
      </a>
    );
  }

  onPageClick(pagination) {
    this.props.onPageTurn(pagination);
  }

  renderCurrent() {
    const { pagination } = this.props;
    if (!pagination.next && !pagination.prev) {
      return <div className="active item">1</div>;
    } else if (!pagination.prev) {
      return <div className="active item">{pagination.next.page - 1}</div>;
    } else {
      return <div className="active item">{pagination.prev.page + 1}</div>;
    }
  }

  render() {
    return (
      <div className="ui basic segment center aligned">
        <div className="ui pagination menu">
          {this.renderPrev()}
          {this.renderCurrent()}
          {this.renderNext()}
        </div>
      </div>
    );
  }
}

export default Pagination;
