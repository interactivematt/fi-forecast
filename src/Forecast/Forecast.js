import React from 'react';
import Editor from '../Editor/Editor'
import Results from '../Results/Results'
import Modal from '../Modal/Modal'
import ApiContext from '../ApiContext'
import config from '../config'

export default class Forecast extends React.Component{

  constructor(props){
    super(props);

  }

  state = {
    /* hide modal on load */
    show: false,
    forecast: {
      current_age: 30,
      net_income: 65000,
      income_increase: 4,
      current_spending: 49000,
      current_savings: 52700,
      future_spending: 40000,
      input_roi: 8,
      input_withdrawal_rate: 4
    },
    card: {
      title: '',
      content: '',
      icon: ''
    }
  }

  static contextType = ApiContext;

  showModal = (id, num) => {
      const card_id = id
      const card_num = num
      this.setState({
        show: !this.state.show,
        id: card_id,
        num: card_num
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
          num={this.state.num}
        >
          
        </Modal>
        <section className="Forecast">
          <Editor 
            addForecast={this.addForecast}
          ></Editor>
          <Results 
            showModal={this.showModal} 
            show={this.state.show}
            forecast={this.state.forecast}
          ></Results>
        </section>
        
      </>
    )
  }

}