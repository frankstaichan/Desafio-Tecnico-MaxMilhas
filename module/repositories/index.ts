import { IBlacklistRepository } from './IBlacklistRepository'
import { BlacklistRepository } from './implementations/BlacklistRepository'

const blacklistRepository: IBlacklistRepository = new BlacklistRepository()

export { blacklistRepository }