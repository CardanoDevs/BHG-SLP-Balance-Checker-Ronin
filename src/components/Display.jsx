import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import { MDBDataTableV5 } from 'mdbreact';
import { database, } from './firebase/firebase';


class Display extends Component {
  constructor(props){
    super(props)
    this.state={
      walletAddress : '',
      totalBalance : '',
      claimed : '',
      ranking : '',
      tableDatas : [],
      tokenAddresses : []
    }
  }

  async componentWillMount() {
    await this.loadAddresses()
  }

  async loadAddresses(){
    console.log("load address")
    let snapshot = await database.ref("RoninWallet/").get();
    if (snapshot.exists) {
      var walletList = [];
      const newArray = snapshot.val();
      if (newArray) {
        Object.keys(newArray).map((key) => {
          const value = newArray[key];
          walletList.push({
            address :value.address,
            scholaName : value.scholaName,
            manager : value.manager
          })
        })
      }
      this.setState({
        tokenAddresses : walletList
      })
    }
  }

  async getValue(){
    for (let i = 0; i < this.state.tokenAddresses.length; i++) {


      let address, scholaName, slp, claimTime, rank, elo , userName, winRate, winTotal
      address = this.state.tokenAddresses[i]['address']
      scholaName = this.state.tokenAddresses[i]['scholaName']
      if (address.includes('ronin:')){
        address = "0x"+ address.slice(6,  address.length)
      }
      let url = "https://game-api.axie.technology/api/v1/" + address
      await fetch(url)
        .then(res => res.json())
        .then(
          async (res) => {



            var ts = Math.round((new Date()).getTime() / 1000);

            if ( res.refreshTime > ts ) {
              claimTime = 'Claim Now!'
            } else {
              claimTime = "Not Yet"
            }


            console.log(res)
            slp = res.total_slp
            rank = res.rank
            elo  = res.mmr
            userName = res.name
            winRate = res.win_rate
            winTotal = res.win_total

            let unix_timestamp = res.cache_last_updated
            var date = new Date(unix_timestamp * 1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            this.setState({
              refreshTime : formattedTime
            })
        })
      let tableData = {
        scholaName : scholaName,
        address    : this.state.tokenAddresses[i]['address'],
        slp        : slp,
        claimTime  : claimTime,
        rank       : rank,
        elo        : elo,
        userName   : userName,
        winRate    : winRate,
        winTotal   : winTotal
      }
      let tableDatas = this.state.tableDatas
      tableDatas[i] = tableData

      this.setState({
        tableDatas : tableDatas,
      })
    }
    this.loadAddresses()
    setTimeout(() => {this.getValue()
    }, 60000);
  }
  render() {
      var rowstable = this.state.tableDatas
      const datatable = {
        columns : [
          {
              label : 'Schola Name',
              field : 'scholaName',
          },
          {
              label : 'Ronin Address',
              field : 'address',
          },
          {
              label : 'Wallet Name',
              field : 'userName',
          },
          {
              label : 'SLP',
              field : 'slp',
          },
          {
              label : 'ELO',
              field : 'elo',
          },
          {
              label : 'Next Claim',
              field : 'claimTime',
          },
          {
              label : 'Win Total',
              field : 'winTotal',
          },
          {
              label : 'Win Rate',
              field : 'winRate',
          },
          {
              label : 'Rank',
              field : 'rank',
          },
        ],
        rows : rowstable,
      }
      return (
        <div>
          <div className = "row">
            <div className = "col-3"> <h1> Schoal Data Table</h1></div>
            <div className = "col-5">  <Button variant="primary"   onClick={()=>this.getValue()}>Get Value  </Button></div>
            <div className = "col-4"> <h2>Last Updata Time : {this.state.refreshTime}</h2> </div>
          </div><hr/>
        <br/>
          <MDBDataTableV5 hover entriesOptions={[10,20,50,100,200,500,1000]} entries={50} pagesAmount={10} data={datatable} materialSearch/>
      </div>
      );
  }
}

export default Display;