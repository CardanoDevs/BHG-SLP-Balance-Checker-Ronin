import React, { Component } from 'react';
import './App.css';
import Dapp from './Dapp.js'
class App extends Component {



  async componentWillMount(){

  }
  
  render() {
    return (
      <div>
       <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"><br/><br/><br/>
            <h2              className="navbar-brand col-sm-3 col-md-12 mr-0" 
            >
              CHECK SlP BALANCE
            </h2>
        </nav>
        <div className= "row">
          <div className = "col-2"></div>
          <div className = "col-8">
          <Dapp/>
          </div>
          <div className = "col-2"></div>
        </div>
      </div>
    );
  }
}

export default App;
