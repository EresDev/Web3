const Web3 = require('web3');

const rpcServer = 'https://mainnet.infura.io/v3/9bdfab5e846547cab620fc258709d048';
const web3 = new Web3(rpcServer);

// create wallet with 5 accounts
const wallet = web3.eth.accounts.wallet.create(3);
console.log('WALLET', wallet);

const encryptedWallet = wallet.encrypt('test_password');
console.log('ENCRYPTED WALLET', encryptedWallet);

const decryptedWallet = web3.eth.accounts.wallet.decrypt(encryptedWallet, 'test_password');
console.log('DECRYPTED WALLET', decryptedWallet);
