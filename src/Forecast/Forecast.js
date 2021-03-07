import React from 'react';
import Editor from '../Editor/Editor'
import Detail from '../Detail/Detail'
import Modal from '../Modal/Modal'
import ApiContext from '../ApiContext'
import config from '../config'

export default class Forecast extends React.Component{
  state = {
    /* hide modal on load */
    show: false,
    forecast: {
      current_age: 30,
      net_income: 100000,
      income_increase: 4,
      current_spending: 60000,
      current_savings: 40000,
      future_spending: 60000,
      input_roi: 8,
      input_withdrawal_rate: 4
    },
    card: {
      title: '',
      content: ''
    }
  }

  static contextType = ApiContext;

  showModal = (e) => {
    const card_id = e.currentTarget.id
    console.log(e.currentTarget.firstChild)
    this.setState({
      show: !this.state.show,
      id: e.currentTarget.id,
      subtitle: e.currentTarget.firstChild.outerText,
      number: e.currentTarget.lastChild.outerText
    });
    if(`${card_id}` >= 1){
      Promise.all([
        fetch(`${config.API_ENDPOINT}/cards/${card_id}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${config.API_KEY}`
          }
          })
        ])
        .then(([cardsRes]) => {
          if(!cardsRes.ok) {
            return cardsRes.json().then(e => Promise.reject(e))
          }
          return Promise.all([cardsRes.json()])
        })
        .then(([card]) => {
          this.setState({ card })
        })
        .catch(error => {
          console.error({ error })
          this.setState({ error })
        })
    } else {
      console.log('Modal closed.')
    }
  };
  
  addForecast = newForecast => {
    this.setState({
      forecast: newForecast
    })
  };

  render(){
    return(
      <>
        <Modal 
          onClose={this.showModal}
          show={this.state.show}
          id={this.state.id}
          card={this.state.card}
          number={this.state.number}
          subtitle={this.state.subtitle}
        >
          
        </Modal>
        <section className="Forecast">
          <Editor 
            addForecast={this.addForecast}
          ></Editor>
          <Detail 
            onClick={this.showModal} 
            show={this.state.show}
            forecast={this.state.forecast}
          ></Detail>
        </section>
      </>
    )
  }

}