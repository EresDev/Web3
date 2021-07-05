const Web3 = require('web3');

const rpcServer = 'https://mainnet.infura.io/v3/9bdfab5e846547cab620fc258709d048';
const web3 = new Web3(rpcServer);

web3.eth.getGasPrice().then((result) => {
  console.log(web3.utils.fromWei(result, 'ether'));
});
