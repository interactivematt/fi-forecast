import React from "react";
import PropTypes from 'prop-types';

export default class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    if(!this.props.show){
        return null;
    }
  return (
    <div>
      <div>{this.props.children}</div>
      <button onClick={this.onClose}>Close</button>
    </div>
  )}
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};