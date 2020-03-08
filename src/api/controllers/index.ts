import {Router} from 'express';
const baseController = require('./base')

const router = Router();

router.use('/', baseController)

module.exports = router;