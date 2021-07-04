const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;

const rpcServer = 'https://rinkeby.infura.io/v3/9bdfab5e846547cab620fc258709d048';
const web3 = new Web3(rpcServer);

const account1 = '0xc9886C33932Dc2684F1db57e16d42A8aC7Ce9Cd1';
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
// console.log(dappContract);

dappContract.methods.name().call((err, result) => {
  console.log('Name:');
  console.log({ err, result });
});

dappContract.methods.symbol().call((err, result) => {
  console.log('Symbol:');
  console.log({ err, result });
});

dappContract.methods.totalSupply().call((err, result) => {
  console.log('total supply:');
  console.log({ err, result });
});

dappContract.methods.balanceOf(account1).call((err, result) => {
  console.log('Balance of address:');
  console.log({ err, result });
});
/**
 * contract created: https://rinkeby.etherscan.io/tx/0xe7d888e28286c5b2fe8ced3b1da180ec24a3e5d5b67a0c27ad6c6bd65aeef616
 */
