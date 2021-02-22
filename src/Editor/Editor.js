import React from 'react';
import Form from '../Form/Form'

export default class Editor extends React.Component{
  render(){
    return(
      <div className="Editor">
        <h2>Editor</h2>
        <Form>
          <label htmlFor='input-current-age'>
            Current Age
            <input 
              type='number' 
              id='input-current-age' 
              placeholder='30' 
              name='current-age'
              defaultValue='30'
            />
          </label>
          <label htmlFor='input-net-income'>
            Net Income
            <input 
              type='number' 
              id='input-net-income' 
              placeholder='$100,000' 
              name='net-income'
              defaultValue='100000'
            />
          </label>
          <label htmlFor='input-income-increase'>
            Annual Income Increase
            <input 
              type='number' 
              id='input-income-increase'
              name='income-increase'
              defaultValue='5'
            />
          </label>
          <label htmlFor='input-current-spending'>
            Current Annual Spending
            <input 
              type='number' 
              id='input-current-spending' 
              name='current-spending'
              defaultValue='60000'
            />
          </label>
          <label htmlFor='input-current-savings'>
            Current Savings
            <input 
              type='number' 
              id='input-current-savings'
              name='current-savings'
              defaultValue='250000'
            />
          </label>
          <label htmlFor='input-future-spending'>
            Estimated Spending in Retirement
            <input 
              type='number' 
              id='input-future-spending' 
              name='future-spending'
              defaultValue='40000'
            />
          </label>
          <label htmlFor='input-roi'>
            Estimated annual return on investment
            <input 
              type='number' 
              id='input-roi' 
              name='roi'
              defaultValue='40000'
            />
          </label>
          <label htmlFor='input-withdrawal-rate'>
            Planned withdrawal rate
            <input 
              type='number' 
              id='input-withdrawal-rate' 
              name='withdrawal-rate'
              defaultValue='40000'
            />
          </label>
          
          <button type="reset">Clear</button>
          <button type="submit">Submit</button>
        </Form>
      </div>
    )
  }
}