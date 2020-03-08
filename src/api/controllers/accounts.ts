import { Response, Request, NextFunction, Router } from "express";
import uuid4 from "uuid/v4";
import {createAccount, account, findAccount} from "../../interfaces/models/accounts"

const router = Router();

router.post('/', async(request: Request, response: Response) => {
    let {name, userid} = request.body
    let uuid = uuid4()
    let balance = 0

    const payload = {
        uuid: uuid,
        userid: userid,
        name: name
    }
    const createAccountResult = await createAccount(payload)
    if (createAccountResult.status) {
        return response.send({data: uuid})
    } else {
        return response.status(500).send({
            message: "failed to create account!"
        })
    }
})


router.get('/', async(request: Request, response: Response) => {
   let payload:account = {}
    if (request.query.public_key) {
        payload.public_key = request.query.public_key
    }

    if (request.query.name) {
        payload.name = request.query.name
    }

    if (request.query.userid) {
        payload.userid = request.query.userid
    }
    const fetchResults = await findAccount(payload);
    if (fetchResults.status && fetchResults.data.length >= 1){
        return response.send({
            status: 200,
            data: fetchResults.data
        })
    } else {
        return response.status(404).send({})
    }
});

module.exports = router;