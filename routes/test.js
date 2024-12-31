import { Router } from 'express'

import { ping, testUpload } from '../controllers'

// import { } from '../validations'

import { asyncWrapper, multerUpload } from '../utils'

export const TestRouter = Router()

TestRouter.get('/ping', asyncWrapper(ping))
TestRouter.post('/uploadTestFile', multerUpload.single('file'), asyncWrapper(testUpload))