import {Router} from 'express';
const baseController = require('./base')
const accountsController = require('./accounts')

const router = Router();

router.use('/', baseController)
router.use('/accounts', accountsController)

module.exports = router;