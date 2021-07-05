const Web3 = require('web3');

const rpcServer = 'https://mainnet.infura.io/v3/9bdfab5e846547cab620fc258709d048';
const web3 = new Web3(rpcServer);

web3.eth.getBlockNumber().then(console.log);
// or use following to get the latest block
web3.eth.getBlock('latest').then(
  (block) => {
    console.log({
      blockHash: block.hash,
      blockNumber: block.number,
    });
  },
);

// or following way
const hash = '0xc4f71bb84836dcf6c3122913dc8514e9539469b059ef16defb7c221d6b4820f1';
web3.eth.getBlock(hash).then(
  (block) => {
    console.log({
      blockHash: block.hash,
      blockNumber: block.number,
    });
  },
);

// get transactions no.3 from block
web3.eth.getTransactionFromBlock(hash, 2).then((transaction) => {
  console.log('get transaction from block');
  console.log(transaction);
});
