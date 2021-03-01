import React from 'react';
import Form from '../Form/Form'
import config from '../config'
import ApiContext from '../ApiContext'

export default class Editor extends React.Component{

  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    const newForecast = {
      current_age: e.target['current-age'].value,
      net_income: e.target['net-income'].value,
      income_increase: e.target['income-increase'].value,
      current_spending: e.target['current-spending'].value,
      current_savings: e.target['current-savings'].value,
      future_spending: e.target['future-spending'].value,
      input_roi: e.target['input-roi'].value,
      input_withdrawal_rate: e.target['input-withdrawal-rate'].value
    }
    fetch(`${config.API_ENDPOINT}/forecasts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${config.API_KEY}`
      },
      body: JSON.stringify(newForecast)
    })
    .then(res => {
      if(!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    })
    // Add context and state changes
    .then(newForecast => {
      this.props.addForecast(newForecast)
    })
    .catch(error => {
      console.error(error)
    })
  }

  render(){
    
    return(
      <div className="Editor">
        <h2>Editor</h2>
        <Form onSubmit={this.handleSubmit}>
          <label htmlFor='input-current-age'>
            Current Age
            <input 
              type='number' 
              id='input-current-age' 
              placeholder='30' 
              name='current-age'
              defaultValue={this.context.forecast.current_age}
            />
          </label>
          <label htmlFor='input-net-income'>
            Net Income
            <input 
              type='number' 
              id='input-net-income' 
              placeholder='$100,000' 
              name='net-income'
              defaultValue={this.context.forecast.net_income}
            />
          </label>
          <label htmlFor='input-income-increase'>
            Annual Income Increase
            <input 
              type='number' 
              id='input-income-increase'
              name='income-increase'
              defaultValue={this.context.forecast.income_increase}
            />
          </label>
          <label htmlFor='input-current-spending'>
            Current Annual Spending
            <input 
              type='number' 
              id='input-current-spending' 
              name='current-spending'
              defaultValue={this.context.forecast.current_spending}
            />
          </label>
          <label htmlFor='input-current-savings'>
            Current Savings
            <input 
              type='number' 
              id='input-current-savings'
              name='current-savings'
              defaultValue={this.context.forecast.current_savings}
            />
          </label>
          <label htmlFor='input-future-spending'>
            Estimated Spending in Retirement
            <input 
              type='number' 
              id='input-future-spending' 
              name='future-spending'
              defaultValue={this.context.forecast.future_spending}
            />
          </label>
          <label htmlFor='input-roi'>
            Estimated annual return on investment
            <input 
              type='number' 
              id='input-roi' 
              name='roi'
              defaultValue={this.context.forecast.input_roi}
            />
          </label>
          <label htmlFor='input-withdrawal-rate'>
            Planned withdrawal rate
            <input 
              type='number' 
              id='input-withdrawal-rate' 
              name='withdrawal-rate'
              defaultValue={this.context.forecast.input_withdrawal_rate}
            />
          </label>
          
          <button type="reset">Clear</button>
          <button type="submit">Submit</button>
        </Form>
      </div>
    )
  }
}