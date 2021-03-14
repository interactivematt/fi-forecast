import React from 'react';
import { Route } from 'react-router-dom';
import ApiContext from '../ApiContext'

export default class Results extends React.Component{

  static contextType = ApiContext;
  
  state = {
    show: false
  }

  render(){
    const showModal = this.props.showModal
    const current_age = this.props.forecast.current_age
    const net_income = this.props.forecast.net_income
    const income_increase = this.props.forecast.income_increase
    const current_spending = this.props.forecast.current_spending
    const current_savings = this.props.forecast.current_savings
    const future_spending = this.props.forecast.future_spending
    const input_roi = (0.01 * this.props.forecast.input_roi)
    const input_withdrawal_rate = (this.props.forecast.input_withdrawal_rate/100)

    const savings_needed = future_spending*(1/input_withdrawal_rate)
    const currently_saving_cash = (net_income - current_spending)
    const currently_saving_cash_monthly = ( Number(net_income - current_spending) / 12).toFixed(0)
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

    let str_fi_age = fi_age + ' years old'
    let str_fi_year = fi_year
    if (isNaN(fi_age) == false){
      str_fi_age = fi_age + ' years old'
    } else {
      str_fi_age = '?'
    }
    if (isNaN(fi_year) == false){
      str_fi_year = fi_year
    } else {
      str_fi_year = '?'
    }
    
    if(str_fi_age === '?' || str_fi_year === '?' || fi_age < current_age){
      alert('Some of your numbers look a little off. This may happen if your spending is higher than your income.')
    }
    
    const str_fi_percent = fi_percent + '%'
    const str_savings_needed = '$' + savings_needed.toLocaleString()
    const str_currently_saving_cash = '$' + Number(currently_saving_cash_monthly).toLocaleString()
    const str_currently_saving_percent = currently_saving_percent + '%'
    const str_retired_today_yearly = '$' + retired_today_yearly.toLocaleString()
    const str_retired_today_monthly = '$' + Number(retired_today_monthly).toLocaleString()

    return(
      <>
        <div className="Results" id="results">
          <div className='cards'>
            <a className='card' onClick={() => showModal('1', `${str_fi_age}`)} id="1">
              <span className="material-icons-sharp circle">cake</span>
              <span className='helper'>How old will I be when I reach financial independence?</span>
              <h2 className="number">{str_fi_age}</h2>
            </a>
            <a className='card' id="2" onClick={() => showModal('2', `${str_fi_year}`)}>
            <div>
              <span className="material-icons-sharp circle">event</span>
              <span className='helper'>What year would I be able to retire?</span>
            </div>
              
              <h2 className="number">{str_fi_year}</h2>
            </a>
            <a className='card' id="3" onClick={() => showModal('3', `${str_fi_percent}`)}>
              <span className="material-icons-sharp circle">data_usage</span>
              <span className='helper'>Where am I in my journey?</span>
              <h2 className="number">{str_fi_percent}</h2>
            </a>
            <a className='card' id="4" onClick={() => showModal('4', `${str_savings_needed}`)}>
            <span className="material-icons-sharp circle">account_balance</span>
              <span className='helper'>How much will I need in retirement?</span>
              <h2 className="number">{str_savings_needed}</h2>
            </a>
            <a className='card' id="5" onClick={() => showModal('5', `${str_currently_saving_cash}`)}  value={currently_saving_cash}>
              <span className="material-icons-sharp circle">savings</span>
              <span className='helper'>How much money do I save each month?</span>
              <h2 className="number">{str_currently_saving_cash}</h2>
            </a>
            <a className='card' id="6" onClick={() => showModal('6', `${str_currently_saving_percent}`)}  value={currently_saving_percent}>
            <span className="material-icons-sharp circle">
            thumb_up
            </span>
              <span className='helper'>How much of my income am I saving?</span>
              <h2 className="number">{str_currently_saving_percent}</h2>
            </a>
            <a className='card' id="7" onClick={() => showModal('7', `${str_retired_today_yearly}`)}  value={retired_today_yearly}>
              <span className="material-icons-sharp circle">
              payments
              </span>
              <span className='helper'>If I retired today, how much would I be able to spend per year?</span>
              <h2 className="number">{str_retired_today_yearly}</h2>
            </a>
            <a className='card' onClick={() => showModal('8', `${str_retired_today_monthly}`)}  id="8" value={retired_today_monthly}>
            <span className="material-icons-sharp circle">
            paid
            </span>
              <span className='helper'>If I retired today, how much would I be able to spend per month?</span>
              <h2 className="number">{str_retired_today_monthly}</h2>
            </a>
          </div>
          <div className="container">
            <div className="content">
              <p className="helper">Content of this Website is intended to be used and must be used for information and education purposes only. It is very important to do your own analysis before making any investment based on your own personal circumstances.</p>
            </div>
          </div>
        </div>
      </>
    )
  }
}