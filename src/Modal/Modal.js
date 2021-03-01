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
      <div className="modal-container" onClick={this.onClose}>
        <div className="modal">
          <h4>{this.props.subtitle}</h4>
          <span className="number">{this.props.number}</span>
          <h2>{this.props.card.title}</h2>
          <p>{this.props.card.content}</p>
          <button onClick={this.onClose}>Close</button>
        </div>
      </div>
    )}
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};