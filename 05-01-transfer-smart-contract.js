const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;

const rpcServer = 'https://rinkeby.infura.io/v3/9bdfab5e846547cab620fc258709d048';
const web3 = new Web3(rpcServer);

const account1 = '0xc9886C33932Dc2684F1db57e16d42A8aC7Ce9Cd1';
const account2 = '0x080e30928E37854B6552b7129633140bB18a08D1';
const contractAddress = '0x9096539b1Bd066568B9Fddf7694a4a5D19f1Df8C';

const contractABI = [{
  constant: true, inputs: [], name: 'name', outputs: [{ name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ name: '_spender', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'approve', outputs: [{ name: 'success', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [], name: 'totalSupply', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ name: '_from', type: 'address' }, { name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'transferFrom', outputs: [{ name: 'success', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [], name: 'standard', outputs: [{ name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [{ name: '', type: 'address' }], name: 'balanceOf', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [], name: 'symbol', outputs: [{ name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'transfer', outputs: [{ name: 'success', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [{ name: '', type: 'address' }, { name: '', type: 'address' }], name: 'allowance', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor',
}, {
  anonymous: false, inputs: [{ indexed: true, name: '_from', type: 'address' }, { indexed: true, name: '_to', type: 'address' }, { indexed: false, name: '_value', type: 'uint256' }], name: 'Transfer', type: 'event',
}, {
  anonymous: false, inputs: [{ indexed: true, name: '_owner', type: 'address' }, { indexed: true, name: '_spender', type: 'address' }, { indexed: false, name: '_value', type: 'uint256' }], name: 'Approval', type: 'event',
}];

const dappContract = new web3.eth.Contract(contractABI, contractAddress);
const data = dappContract.methods.transfer(account2, 1000).encodeABI();
const privateKey1 = Buffer.from(process.env.privateKey1, 'hex');

(async () => {
  dappContract.methods.balanceOf(account1).call((err, result) => {
    console.log('Contract Balance of account1 before transfer:');
    console.log({ err, result });
  });

  let txCount;
  await web3.eth.getTransactionCount(account1, (err, count) => {
    txCount = count;
  });

  // build the transaction
  const txObj = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    to: contractAddress,
    data,
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

  dappContract.methods.balanceOf(account1).call((err, result) => {
    console.log('Contract Balance of account1 after transfer:');
    console.log({ err, result });
  });

  dappContract.methods.balanceOf(account2).call((err, result) => {
    console.log('Contract Balance of account2:');
    console.log({ err, result });
  });
})();

/**
 * contract created: https://rinkeby.etherscan.io/tx/0xe7d888e28286c5b2fe8ced3b1da180ec24a3e5d5b67a0c27ad6c6bd65aeef616
 */
