# BHG-Axie-Buy-Bot


## Step 1 Get Detail data from GrahpQL request
The software developed in this repository will work as a bot to buy NFTs By specific token's iD in the Axie marketplace.

Not only Buying but also Bot gets token's properties, for example, token's price and class, breed count and states.

This bot gets detailed data of Axie infinity marketplace from GraphGL request with query.

        var endpoint = 'https://graphql-gateway.axieinfinity.com/graphql'

        var variables = {
            "axieId": this.state.tokenID
            }

        var query = "query GetAxieDetail($axieId: ID!) {\n  axie(axieId: $axieId) {\n    ...AxieDetail\n    __typename\n  }\n}\n\nfragment AxieDetail on Axie {\n  id\n  image\n  class\n  chain\n  name\n  genes\n  owner\n  birthDate\n  bodyShape\n  class\n  sireId\n  sireClass\n  matronId\n  matronClass\n  stage\n  title\n  breedCount\n  level\n  figure {\n    atlas\n    model\n    image\n    __typename\n  }\n  parts {\n    ...AxiePart\n    __typename\n  }\n  stats {\n    ...AxieStats\n    __typename\n  }\n  auction {\n    ...AxieAuction\n    __typename\n  }\n  ownerProfile {\n    name\n    __typename\n  }\n  battleInfo {\n    ...AxieBattleInfo\n    __typename\n  }\n  children {\n    id\n    name\n    class\n    image\n    title\n    stage\n    __typename\n  }\n  __typename\n}\n\nfragment AxieBattleInfo on AxieBattleInfo {\n  banned\n  banUntil\n  level\n  __typename\n}\n\nfragment AxiePart on AxiePart {\n  id\n  name\n  class\n  type\n  specialGenes\n  stage\n  abilities {\n    ...AxieCardAbility\n    __typename\n  }\n  __typename\n}\n\nfragment AxieCardAbility on AxieCardAbility {\n  id\n  name\n  attack\n  defense\n  energy\n  description\n  backgroundUrl\n  effectIconUrl\n  __typename\n}\n\nfragment AxieStats on AxieStats {\n  hp\n  speed\n  skill\n  morale\n  __typename\n}\n\nfragment AxieAuction on Auction {\n  startingPrice\n  endingPrice\n  startingTimestamp\n  endingTimestamp\n  duration\n  timeLeft\n  currentPrice\n  currentPriceUSD\n  suggestedPrice\n  seller\n  listingIndex\n  state\n  __typename\n}\n"

        const client = new GraphQLClient(endpoint, { headers: {} })
        client.request(query, variables).then((data) => this.setState({
            data : data
        }))

## Step 1 With detail data Buy tokens
And then With this data, Call Axie Market smart contract's settleAuction function.

        marketContract.methods.settleAuction(this.state.ownerAddress, wethAddress, this.state.price, this.state.listIndex, this.state.listState)

NOTE : price, liststate, listindex are Bignumber. anc Chain id isn't needed

##  RPC URL
Ronin RPC : https://proxy.roninchain.com/free-gas-rpc ,   https://api.roninchain.com/rpc

## USAGE,
 - Setting Wallet address and private key.
   project/src/components/Dapp.js  line 23,24

    const walletAddress       = roninweb3.utils.toChecksumAddress('0x76bd076f18b926407ce1473bba4c77c047b10fc8')
    const walletPrivateKey    = '0x086c236291f8053647cf69cdf5fa01a334c2967454d19b1599334a7e58c1dfa5'

wallet style is following sample style(not ronin style.)



 - install node module with 

     npm install

 - run bot

    npm start
