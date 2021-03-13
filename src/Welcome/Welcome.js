import React from 'react';
import { Link } from 'react-router-dom'

export default class Welcome extends React.Component{
  render(){
    return(
      <section className="Welcome container">
        
        <div className="intro">
          <div className="content">
            <h1>Forecast your financial future.</h1>
            <h3><b>Financial independence</b> is the point where one can comfortably live off their investments, without the need for additional income. This tool helps you find out when you'll be able to reach this point, and how much you'll need based on your savings, spending, and habits.</h3>
          </div>
          
            <Link to="/forecast">
              <button type="button" className="submit">Get Started</button>
            </Link>
          
          <div className="content">
            <p className="helper">Content of this Website is intended to be used and must be used for information and education purposes only. It is very important to do your own analysis before making any investment based on your own personal circumstances.</p>
          </div>
        </div>
        <div className="hero">
          
        </div>
        
      </section>
    )
  }
}