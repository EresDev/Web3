const Web3 = require('web3');

const rpcServer = 'https://rinkeby.infura.io/v3/9bdfab5e846547cab620fc258709d048';
const web3 = new Web3(rpcServer);

console.log(web3.eth.accounts.create());
