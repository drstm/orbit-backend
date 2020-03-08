import { Response, Request, Router } from "express";

const router = Router();

router.get('/', async(req: Request, res: Response) => {
    res.send({status: 200})
})

module.exports = router