import React from 'react';
import Editor from '../Editor/Editor'
import Detail from '../Detail/Detail'
import Modal from '../Modal/Modal'

export default class Forecast extends React.Component{
  state = {
    show: false
  };
  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };
  render(){
    return(
      <>
        <Modal 
          onClose={this.showModal}
          show={this.state.show}
        >
          Some Modal Content
        </Modal>
        <section className="Forecast">
          <Editor></Editor>
          <Detail onClick={this.showModal} show={this.state.show}></Detail>
        </section>
      </>
    )
  }

}