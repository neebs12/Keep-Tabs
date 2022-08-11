import 'dotenv/config'
import server from './server'
import config from './utils/config'
import logger from './utils/logger'

const PORT = config.PORT

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  logger.info('Listening on port', PORT)
})