import React from 'react';
import { withRouter } from 'react-router-dom';
import ApiContext from '../ApiContext'

export default class Detail extends React.Component{
  static contextType = ApiContext;
  
  state = {
    show: false
  }

  onClick = e => {
    this.props.onClick(e);
  };

  render(){
    
    const current_age = this.props.forecast.current_age
    const net_income = this.props.forecast.net_income
    const income_increase = this.props.forecast.income_increase
    const current_spending = this.props.forecast.current_spending
    const current_savings = this.props.forecast.current_savings
    const future_spending = this.props.forecast.future_spending
    const input_roi = (0.01 * this.props.forecast.input_roi)
    const input_withdrawal_rate = (this.props.forecast.input_withdrawal_rate/100)

    const savings_needed = future_spending*(1/input_withdrawal_rate)
    const currently_saving_cash = net_income - current_spending
    const currently_saving_percent = (100/(net_income/currently_saving_cash)).toFixed(2)
    const retired_today_yearly = current_savings * input_withdrawal_rate
    const retired_today_monthly = (retired_today_yearly/12).toFixed(2)
    /* const retired_today_remaining = (current_savings/(current_spending)+parseInt(new Date().getFullYear())).toFixed(0) */

    function NPER(rate, payment, present, future, type) {
      // Initialize type
      var type = (typeof type === 'undefined') ? 0 : type;
    
      // Initialize future value
      var future = (typeof future === 'undefined') ? 0 : future;
    
      // Evaluate rate and periods (TODO: replace with secure expression evaluator)
      rate = eval(rate);
    
      // Return number of periods
      var num = payment * (1 + rate * type) - future * rate;
      var den = (present * rate + payment * (1 + rate * type));
      return Math.log(num / den) / Math.log(1 + rate);
    }

    const rate = input_roi
    const payment = (-1)*(currently_saving_cash)
    const present = (-1)*(current_savings)
    const future = savings_needed
    const type = 0

    const fi_age = Math.ceil(NPER(rate, payment, present, future, type))+current_age
    const fi_year = (fi_age-current_age)+parseInt(new Date().getFullYear())
    const fi_percent = ((current_savings/savings_needed)*100).toFixed(2)

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    return(
      <>
        <div className="Detail">
          <h2>Detail</h2>
          <div className='container'>
            <a className='card large' onClick={this.onClick}>
              <h4>Graph</h4>
              <span className="number">{this.state.graph}</span>
            </a>
            <a className='card' onClick={this.onClick} id="1" info={fi_age}>
              <h4>You'll reach FI at</h4>
              <span className="number">{fi_age} years old</span>
            </a>
            <a className='card' id="2" onClick={this.onClick} info={fi_year}>
              <h4>FI Year</h4>
              <span className="number">{fi_year}</span>
            </a>
            <a className='card' id="3" onClick={this.onClick} value={fi_percent}>
              <h4>FI Percentage</h4>
              <span className="number">{fi_percent}%</span>
            </a>
            <a className='card' id="4" onClick={this.onClick} value={savings_needed}>
              <h4>Savings needed for FI</h4>
              <span className="number">${numberWithCommas(savings_needed)}</span>
            </a>
            <a className='card' id="5" onClick={this.onClick} value={currently_saving_cash}>
              <h4>Currently Saving </h4>
              <span className="number">${numberWithCommas(currently_saving_cash)}</span>
            </a>
            <a className='card' id="6" onClick={this.onClick} value={currently_saving_percent}>
              <h4>Current Saving %</h4>
              <span className="number">{currently_saving_percent}%</span>
            </a>
            <a className='card' id="7" onClick={this.onClick} value={retired_today_yearly}>
              <h4>If you retired today, yearly</h4>
              <span className="number">${numberWithCommas(retired_today_yearly)}</span>
            </a>
            <a className='card' onClick={this.onClick} id="8" value={retired_today_monthly}>
              <h4>If you retired today, monthly</h4>
              <span className="number">${numberWithCommas(retired_today_monthly)}</span>
            </a>
          </div>
        </div>
      </>
    )
  }
}