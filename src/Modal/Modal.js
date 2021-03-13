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
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <span class="material-icons-sharp feature">{this.props.card.icon}</span>
          <div className="detail">
            <h3>{this.props.card.title}</h3>
            <h1 className="number">{this.props.num}</h1>
            <p>{this.props.card.content}</p>
          </div>
          <button onClick={this.onClose} className="close"><span className="material-icons-sharp x">close</span></button>
        </div>
      </div>
    )}
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};