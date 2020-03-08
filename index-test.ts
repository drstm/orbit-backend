var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
import * as request from 'superagent';

const pair = StellarSdk.Keypair.random();
console.log("secret is: " + pair.secret())
console.log("pubkey is: " + pair.publicKey())

const createAccount = async() => {
    try {
        const newAccount:any = await request.get(`https://friendbot.stellar.org?addr=${pair.publicKey()}`)
        console.log(newAccount.body)
    } catch (error) {
        console.log("error is " + error)
    }
}

const checkBalances = async() => {
    const account = await server.loadAccount(pair.publicKey());
    console.log("Balances for account: " + pair.publicKey());
    console.log(account.balances)
}

createAccount().then(() => {
    checkBalances();
}).catch((err) => {
    console.log("error is " + err)
});