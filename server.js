import { InitializeApp } from './app'
import { Logger } from './utils'
import { PORT, NODE_ENV } from './config'

//Initialize server
(async () => {
	try {
		const app = await InitializeApp()
		app.listen(PORT, () => {
			Logger.success(`Server Running on ${PORT}, environment: ${NODE_ENV}`)
		})
	}
	catch (err) {
		Logger.error('Bootstrap server error' + err.message)
		throw (err)
	}
})()