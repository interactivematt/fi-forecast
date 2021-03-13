import React from 'react';
import Form from '../Form/Form'
import config from '../config'
import ApiContext from '../ApiContext'
import CurrencyInput from '../CurrencyInput/CurrencyInput'
import PercentageInput from '../PercentageInput/PercentageInput'

export default class Editor extends React.Component{

  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    window.location.href='#results'
    const newForecast = {
      current_age: e.target['current-age'].value,
      net_income: Number(e.target['net-income'].value.replace(/[^0-9.-]+/g,"")),
      income_increase: Number(e.target['income-increase'].value.replace(/[^0-9.-]+/g,"")),
      current_spending: Number(e.target['current-spending'].value.replace(/[^0-9.-]+/g,"")),
      current_savings: Number(e.target['current-savings'].value.replace(/[^0-9.-]+/g,"")),
      future_spending: Number(e.target['future-spending'].value.replace(/[^0-9.-]+/g,"")),
      input_roi: Number(e.target['input-roi'].value.replace(/[^0-9.-]+/g,"")),
      input_withdrawal_rate: Number(e.target['input-withdrawal-rate'].value.replace(/[^0-9.-]+/g,""))
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

  changeFocus = index => {
    if (index < this.props.inputs.length - 1) {
      this.refs[index + 1].current.focus();
    } else {
      this.props.addInput();
    }
  };

  render(){
    return(
      <div className="Editor">
        <h3><b>Start here</b></h3>
        <p>Enter your details in the fields below for either yourself or household. Values are defaulted to the U.S. median.</p>
        <Form onSubmit={this.handleSubmit}>
          <label htmlFor='input-current-age'>
            Current age
            <input 
              autoFocus={true}
              type='number' 
              id='input-current-age' 
              placeholder='30' 
              name='current-age'
              defaultValue={this.context.forecast.current_age}
              
            />
            <span className='helper'>Your age in years</span>
          </label>
          <label htmlFor='input-net-income'>
            Annual net income
            <CurrencyInput
              className="currency"
              placeholder="$" 
              type="text"
              id="input-net-income"
              name="net-income" 
              defaultValue={this.context.forecast.net_income}
            />
            <span className='helper'>What's your take-home pay after taxes?</span>
          </label>
          <label htmlFor='input-income-increase'>
            Annual income increase
            <PercentageInput
              className='percent'
              type='text'
              id='input-income-increase'
              name='income-increase'
              defaultValue={this.context.forecast.income_increase}
            />
            <span className='helper'>How much does your pay increase each year?</span>
          </label>
          <label htmlFor='input-current-spending'>
            Current annual spending
            <CurrencyInput 
              className="currency"
              placeholder="$" 
              type="text"
              id="input-current-spending"
              name="current-spending" 
              defaultValue={this.context.forecast.current_spending}
            />
            <span className='helper'>How much do you spend per year?</span>
          </label>
          <label htmlFor='input-current-savings'>
            Current portfolio total
            <CurrencyInput 
              className="currency"
              placeholder="$" 
              type="text"
              id='input-current-savings'
              name='current-savings'
              defaultValue={this.context.forecast.current_savings}
            />
            <span className='helper'>How much do you have in savings, investments, and property?</span>
          </label>
          <label htmlFor='input-future-spending'>
            Est. spending in retirement
            <CurrencyInput 
              className="currency"
              placeholder="$" 
              type="text"
              id='input-future-spending' 
              name='future-spending'
              defaultValue={this.context.forecast.future_spending}
            />
            <span className='helper'>How much do you plan to spend once you retire?</span>
          </label>
          <label htmlFor='input-roi'>
            Est. annual return on investment
            <PercentageInput
              className='percent'
              placeholder="%"
              type='text'
              id='input-roi' 
              name='roi'
              defaultValue={this.context.forecast.input_roi}
            />
            <span className='helper'>How much interest do you earn on your portfolio annually?</span>
          </label>
          <label htmlFor='input-withdrawal-rate' e-aria-disabled>
            Planned withdrawal rate
            <PercentageInput
              className='percent'
              type='text'
              id='input-withdrawal-rate' 
              name='withdrawal-rate'
              disabled={true}
              defaultValue={this.context.forecast.input_withdrawal_rate}
            />
            <span className='helper'>A withdrawal rate of no more than 4% is recommended.</span>
          </label>
          
          <button type="reset" className="reset">Reset</button>
          <button type="submit" className="submit">Submit</button>
        </Form>
      </div>
    )
  }
}