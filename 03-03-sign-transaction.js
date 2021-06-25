const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;

const rpcServer = 'https://rinkeby.infura.io/v3/9bdfab5e846547cab620fc258709d048';
const web3 = new Web3(rpcServer);

const account1 = '0xc9886C33932Dc2684F1db57e16d42A8aC7Ce9Cd1';
const account2 = '0x080e30928E37854B6552b7129633140bB18a08D1';

// testnet keys
const privateKey1 = Buffer.from(process.env.privateKey1, 'hex');
const privateKey2 = Buffer.from(process.env.privateKey2, 'hex');

(async () => {
  await web3.eth.getBalance(account1, (err, balance) => {
    console.log('before balance of account1: ', balance);
  });

  await web3.eth.getBalance(account2, (err, balance) => {
    console.log('before balance of account2: ', balance);
  });

  let txCount;
  await web3.eth.getTransactionCount(account1, (err, count) => {
    txCount = count;
  });

  // build the transaction
  const txObj = {
    nonce: web3.utils.toHex(txCount),
    to: account2,
    value: web3.utils.toHex(web3.utils.toWei('1000', 'wei')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
  };

  // sign the transaction
  const tx = new Tx(txObj, { chain: 'rinkeby' });
  tx.sign(privateKey1);

  const serializedTransaction = tx.serialize();
  const raw = `0x${serializedTransaction.toString('hex')}`;

  // broadcast the signed transaction
  await web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash ', txHash);
  });

  await web3.eth.getBalance(account1, (err, balance) => {
    console.log('after balance of account1: ', balance);
  });

  await web3.eth.getBalance(account2, (err, balance) => {
    console.log('after balance of account2: ', balance);
  });
})();
