const Web3 = require('web3');

const rpcServer = 'http://127.0.0.1:7545';
const web3 = new Web3(rpcServer);

const account1 = '0x9F813f1DED432BBC301DA017Ab8A3420B9cA4dc2';
const account2 = '0xcb70eb872B82dD92591edc10c7c7f306086fb57E';

web3.eth.getBalance(account1, (err, balance) => {
  console.log('balance account1: ', balance);
});

web3.eth.getBalance(account2, (err, balance) => {
  console.log('balance account2: ', balance);
});

web3.eth.sendTransaction({ from: account1, to: account2, value: web3.utils.toWei('1', 'ether') });
