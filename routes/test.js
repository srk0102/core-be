import { Router } from 'express'

import { getActivatedUser, postUser, updateSubscription, deleteUser } from '../controllers'

// import { } from '../validations'

import { asyncWrapper } from '../utils'

export const TestRouter = Router()

TestRouter.get('/users', asyncWrapper(getActivatedUser))
TestRouter.post('/users', asyncWrapper(postUser))
TestRouter.put('/users/subscription', asyncWrapper(updateSubscription))
TestRouter.delete('/users/:id', asyncWrapper(deleteUser))