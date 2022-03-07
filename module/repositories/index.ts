import { IBlacklistRepository } from './IBlacklistRepository'
import { BlacklistRepository } from './implementations/BlacklistRepository'
import { blacklistModel } from '../models'

const blacklistRepository: IBlacklistRepository = new BlacklistRepository(blacklistModel)

export { blacklistRepository }