import { Response, Request, NextFunction, Router } from "express";
import uuid4 from "uuid/v4";

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
})