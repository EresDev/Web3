const Web3 = require('web3');

const rpcServer = 'https://mainnet.infura.io/v3/9bdfab5e846547cab620fc258709d048';
const web3 = new Web3(rpcServer);

// create an account
// const account = web3.eth.accounts.create();
// console.log(account);

// encrypt private key
const address = '0x6A06FB4D1fcAa69B20AfAB1e16248998a1ECCfF7';
const privateKey = '0x814b8edfc7fcb77bbaf91e085518f20e551272b6f64720988edc2292ad2b388c';
const encrypted = web3.eth.accounts.encrypt(privateKey, 'test_password');

console.log('ENCRYPTED', encrypted);

// decrypt an account
const decrypted = web3.eth.accounts.decrypt(encrypted, 'test_password');
console.log('DECRYPTED', decrypted);
