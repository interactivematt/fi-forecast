import React from 'react';

export default class Detail extends React.Component{
  constructor(){
    super();
    this.state = {
      graph: '',
      fi_age: '45',
      fi_year: '2033',
      fi_percent: '22.1%',
      savings_needed: '1,250,000',
      currently_saving_cash: '$375',
      currently_saving_percent: '37.2%',
      retired_today_yearly: '$11,496',
      retired_today_monthly: '$958',
      retired_today_remaining: '5.5',
      show: false
    }
  }
  onClick = e => {
    this.props.onClick && this.props.onClick(e);
  };

  render(){
    return(
      <>
        <div className="Detail">
          <h2>Detail</h2>
          <div className='container'>
            <a className='card large' onClick={this.onClick}>
              Graph
              <span className="insight">{this.state.graph}</span>
            </a>
            <a className='card' onClick={this.onClick}>
              FI Age
              <span className="insight">{this.state.fi_age}</span>
            </a>
            <a className='card' onClick={this.onClick}>
              FI Year
              <span className="insight">{this.state.fi_year}</span>
            </a>
            <a className='card' onClick={this.onClick}>
              FI Percentage
              <span className="insight">{this.state.fi_percent}</span>
            </a>
            <a className='card' onClick={this.onClick}>
              Savings needed for FI
              <span className="insight">{this.state.savings_needed}</span>
            </a>
            <a className='card' onClick={this.onClick}>
              Currently Saving $
              <span className="insight">{this.state.currently_saving_cash}</span>
            </a>
            <a className='card' onClick={this.onClick}>
              Current Saving %
              <span className="insight">{this.state.currently_saving_percent}</span>
            </a>
            <a className='card' onClick={this.onClick}>
              If you retired today, yearly
              <span className="insight">{this.state.retired_today_yearly}</span>
            </a>
            <a className='card' onClick={this.onClick}>
              If you retired today, monthly
              <span className="insight">{this.state.retired_today_monthly}</span>
            </a>
            <a className='card' onClick={this.onClick}>
              If you retired today, years until broke
              <span className="insight">{this.state.retired_today_remaining}</span>
            </a>
          </div>
        </div>
      </>
    )
  }
}