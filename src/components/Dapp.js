import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import { Button , FormControl, InputGroup} from 'react-bootstrap';
import {slpabi, slpAddress, rpcURL} from './config'

const roninweb3           = new Web3(new Web3.providers.HttpProvider(rpcURL));
const slpcontract  = new roninweb3.eth.Contract(slpabi, slpAddress);


class DApp extends Component {
  constructor(props){
    super(props)
    this.state={
      walletAddress : '',
      totalBalance : '',
      claimed : '',
    }
  }

  async getValue(){
    try {
      let address = this.state.walletAddress

      if (address.includes('ronin:')){
         address = "0x"+ address.slice(6,  address.length)
      } 
  
      let slp          = await  slpcontract.methods.balanceOf(address).call();
  
      console.log(slp)
      this.setState({
        totalBalance : slp / 1,
      })

      let url = "https://game-api.axie.technology/api/v1/" + address

      await fetch(url)
          .then(res => res.json())
          .then(
            async (res) => {
              console.log(res)
              this.setState({
                claimed : res.lifetime_slp,
              })
            })

    }catch(err){
      
    }
  }




  render() {
    const handleWalletAddress = (e) => {
      let addLabel  = e.target.value
      this.setState({
        walletAddress : addLabel
      }) 
      console.log(this.state.walletAddress)
    }
    return (
      <div>
        <br/><br/><br/><br/><br/><br/>
        <h2> Please Input Ronin Address </h2><hr/>
        <br/>
        <div className = "row">
          <div className="col-1"></div>
          <div className="col-10">
          <InputGroup className="mb-3 "  style = {{height : '5%'}}> 
            <InputGroup.Text id="basic-addon1" style = {{paddingLeft : '4%', paddingRight : '4%'}}> Wallet Address  </InputGroup.Text>
              <FormControl
                placeholder="input token id"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                defaultValue = {this.state.walletAddress}
                onChange={handleWalletAddress}
                style = {{ width : '50%'}}
              />

              <Button variant="primary" id="button-addon2"  onClick={()=>this.getValue()} style = {{paddingLeft : '2%', paddingRight : '2%'}}>
                 Get Balance 
              </Button> 
            </InputGroup>
          </div>
          <div className="col-1"></div>
        </div>
        <br/>
        <br/>
          <br/><br/>
          <h2> SLP BALANCE  </h2><hr/><br/>
          <h3>unclaimed balance : {this.state.totalBalance}</h3>
          <h3>claimed balance   : {this.state.claimed}</h3>


         
      </div>
    );
  }
}
export default DApp;