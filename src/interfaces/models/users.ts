// import {query} from "../../db/connection"
import { statusBasedFetch } from "../generics"

export interface user {
    uuid?: string,
    email?: string,
    nickName?: string,
    password?: string,
}

export const createUser = async(options: user): Promise<statusBasedFetch> => {
    const createUserQuery = `INSERT INTO user(uuid, email, nickname, password) VALUES('${options.uuid}', ${options.email}, ${options.nickName}, '${options.password}')`
    try {
        const executeCreate:any = await query(createUserQuery)
        console.log(`Created user with Nickname ${options.uuid}`)
        return {
            status: true,
            data: executeCreate.insertId
        }
    } catch (error) {
        console.log('Error creating user (Models).')
        return {
            status: false,
            data: null
        }
    }
} 

// export const findUser = async(options: pinpoint): Promise<statusBasedFetch> => {

//     let whereClause = ``
//     if (options.uuid){
//         whereClause += `uuid='${options.uuid}' AND `
//     }
//     if (options.name){
//         whereClause += `name='${options.name}' AND `
//     }

//     if(options.type){
//         whereClause += `type='${options.type}' AND `
//     }

//     if(options.subtype){
//         whereClause += `subtype='${options.subtype}' AND'`
//     }

//     whereClause = whereClause.slice(0,-4)
//     let fetchQuery = `SELECT id, uuid, lat, lon, name, type, subtype FROM pinpoints WHERE ${whereClause} AND status = 'active'`
//     if (whereClause === ``){
//         fetchQuery = `SELECT id, uuid, lat, lon, name, type, subtype FROM pinpoints WHERE status = 'active'`
//     }
//     logger.debug(fetchQuery)
//     try {
//         const executeFetch = await query(fetchQuery)
//         return {
//             status: true,
//             data: executeFetch
//         }
//     } catch (error) {
//         logger.error(error)
//         return {
//             status: false,
//             data: null
//         }        
//     }
// }

// export const updatePinpoint = async(options: pinpoint): Promise<statusBasedFetch> => {
//     let setClause = ``
//     if (options.name){
//         setClause += `name='${options.name}',`
//     }
//     if (options.type){
//         setClause += `type='${options.type}',`
//     }
//     if (options.subtype){
//         setClause += `subtype='${options.subtype}',`
//     }
//     setClause = setClause.slice(0,-1)
//     const updateCollectionQuery = `UPDATE pinpoints SET ${setClause} WHERE uuid='${options.uuid}'`
//     logger.debug(updateCollectionQuery)
//     try {
//         await query(updateCollectionQuery)
//         return {
//             status: true,
//             data: null
//         }
//     } catch (error) {
//         logger.error(error)
//         return {
//             status: false,
//             data: null
//         }
//     }
// }

// export const deletePinpoint = async(options: pinpoint): Promise<statusBasedFetch> => {
//     const deleteCollectionQuery = `UPDATE pinpoints SET status = 'inactive' WHERE uuid='${options.uuid}'`
//     logger.debug(deleteCollectionQuery)
//     try {
//         await query(deleteCollectionQuery)
//         return {
//             status: true,
//             data: null
//         }
//     } catch (error) {
//         logger.error(error)
//         return {
//             status: false,
//             data: null
//         }
//     }
// }