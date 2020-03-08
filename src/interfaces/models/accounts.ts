import {query} from "../../db/connection"
import { statusBasedFetch } from "../generics"
import * as request from 'superagent';
var StellarSdk = require('stellar-sdk');

const logger = require("../logger")(__filename)

export interface account{
    uuid?: string,
    name?: string,
    userid?: number, 
    balance?: number,
    private_key?: string,
    public_key?: string,
    sequence?: number
}

export const createAccount = async(options: account): Promise<statusBasedFetch> => {
    let balance = 0;
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
    

        const checkBalances = async() => {
            const account = await server.loadAccount(pair.publicKey());
            balance = account.balances;
            logger.debug("Balances for account: " + pair.publicKey());
            logger.debug(account.balances)
        }

        createAccount().then(() => {
            checkBalances();
        }).catch((err) => {
            logger.error("error is " + err)
        });
    }
    const createAccountQuery = `INSERT INTO accounts(uuid, name, userid, balance, private_key, public_key, sequence) VALUES('${options.uuid}', '${options.name}', ${options.userid}, ${balance}, '${secretKey}', '${publicKey}', ${sequence})`
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

export const findAccount  = async(options: account): Promise<statusBasedFetch> => {

    let whereClause = ``
    if (options.public_key){
        whereClause += `uuid='${options.public_key}' AND `
    }
    if (options.name){
        whereClause += `name='${options.name}' AND `
    }

    if(options.userid){
        whereClause += `userid='${options.userid}' AND `
    }

    if (whereClause === ``){
        logger.debug("Empty options passed to model function")
        return {
            status: false,
            data: null
        }
    }
    
    whereClause = whereClause.slice(0,-4)
    const fetchQuery = `SELECT * FROM accounts WHERE ${whereClause}`
    logger.debug(fetchQuery)
    try {
        const executeFetch = await query(fetchQuery)
        return {
            status: true,
            data: executeFetch
        }
    } catch (error) {
        logger.error(error)
        return {
            status: false,
            data: null
        }        
    }
}
