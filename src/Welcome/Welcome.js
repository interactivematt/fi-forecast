import React from 'react';
import { Link } from 'react-router-dom'

export default class Welcome extends React.Component{
  render(){
    return(
      <section className="Welcome">
        <h2>Welcome</h2>
        <Link to="/forecast">Get Started</Link>
      </section>
    )
  }
}