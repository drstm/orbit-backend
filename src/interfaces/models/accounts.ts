import {query} from "../../db/connection"
import { statusBasedFetch } from "../generics"
import * as request from 'superagent';

const logger = require("../logger")(__filename)

export interface account{
    uuid?: string,
    name?: string,
    userid?: string, 
    balance?: number,
    private_key?: string,
    public_key?: string,
    sequence?: number
}

export const createAccount = async(options: account): Promise<statusBasedFetch> => {
    let balance = 0;
    var StellarSdk = require('stellar-sdk');
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    
    const pair = StellarSdk.Keypair.random();

    var secretKey = pair.secret();
    var publicKey = pair.publicKey();
    var sequence = 0;


    const createAccount = async() => {
        try {
            const newAccount:any = await request.get(`https://friendbot.stellar.org?addr=${pair.publicKey()}`)
            logger.debug(newAccount.body)
        } catch (error) {
            logger.error("error is " + error)
        }
    }

    const checkBalances = async() => {
        const account = await server.loadAccount(pair.publicKey());
        logger.debug("Balances for account: " + pair.publicKey());
        logger.debug(account.balances)
    }

    createAccount().then(() => {
        checkBalances();
    }).catch((err) => {
        logger.error("error is " + err)
    });

    const createAccountQuery = `INSERT INTO account(uuid, name, userid, balance, privateKey, publicKey, sequence) VALUES('${options.uuid}', ${options.name}, '${options.userid}', '${options.balance}', '${secretKey}', '${publicKey}', '${sequence}')`
    logger.debug(createAccountQuery)
    try {
        const executeCreate:any = await query(createAccountQuery)
        return {
            status: true,
            data: executeCreate.insertId
        }
    } catch (error) {
        logger.error(error)
        return {
            status: false,
            data: null
        }
    }
}
