import { Response, Request, Router } from "express";
import uuid4 from "uuid/v4";
import { user, createUser } from "../../interfaces/models/users";

const router = Router();

router.post('/', async(request: Request, response: Response) => {
    let {email, nickName, password} = request.body
    if (email && nickName && password ){
        // if any of these are missing exit
        let uuid = uuid4()
        let payload: user = {
            uuid: uuid,
            email: email,
            nickName: nickName,
            password: password,
        }
        let createPinpointResult = await createUser(payload)
        if (createPinpointResult.status){
            return response.send({data: uuid})
        } else {
            return response.status(500).send({
                message: "failed to create user!"
            })
        }
    } else {
        return response.status(400).send({})
    }
});