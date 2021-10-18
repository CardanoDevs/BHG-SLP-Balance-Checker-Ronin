# Get SLP Balance (claimed and unclaimed)

## Step 1 Get unclaimed SLP From Contract

...
     SLP token address : 0xa8754b9Fa15fc18BB59458815510E40a12cD2014
     SLP token get balance :  [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":
                              [{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
...
## Step 2 Get claimed SLP from API

...
     url = "https://game-api.axie.technology/api/v1/" + address
     claimed slp is json.lifetime_slp 
...

## USAGE,

 - install node module with 

     npm install

 - run bot

    npm start
