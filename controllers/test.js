import { request } from 'express'
import { sendResponse } from '../utils'

const res = {}

export const SUBSCRIPTION = ['Free', 'Premium', 'Enterprise']

export const postUser = async (req, res) => {
	try {
		const { userName, id, age } = req.body

		const userObj = {
			userName,
			id,
			age,
			subscription: [SUBSCRIPTION[0]]
		}

		res.id = userObj

		return sendResponse(res, SUCCESS, 'user has been saved successfully', userObj, '')
	}
	catch (err) {
		return sendResponse(res, INTERNALSERVERERROR, '', {}, 'Internal server error')
	}
}

export const getActivatedUser = async (req, res) => {
	try {
		const response = await res.map((user) => {
			if (user.subscription) {
				return user
			}
		})

		return sendResponse(res, SUCCESS, 'users', response, '')
	}
	catch (err) {
		return sendResponse(res, INTERNALSERVERERROR, '', {}, 'Internal server error')
	}
}
export const updateSubscription = async (req, res) => {
	try {

		const { id } = req.params
		const { subscription } = req.body

		if (res[id]) {
			res[id].subscription.push(subscription)
		}
		else {
			return sendResponse(res, NOTFOUND, '', {}, 'unable to find the user')
		}

		return sendResponse(res, SUCCESS, 'updated successfully', res[id], '')
	}
	catch (err) {
		return sendResponse(res, INTERNALSERVERERROR, '', {}, 'Internal server error')
	}
}
export const deleteUser = async (req, res) => {
	try {

		const { id } = req.params

		if (res[id]) {
			delete res[id]
		}
		else {
			return sendResponse(res, NOTFOUND, '', {}, 'unable to find the user')
		}

		return sendResponse(res, SUCCESS, 'user deleted succesfully', {}, '')

	}
	catch (err) {
		return sendResponse(res, INTERNALSERVERERROR, '', {}, 'Internal server error')
	}
}