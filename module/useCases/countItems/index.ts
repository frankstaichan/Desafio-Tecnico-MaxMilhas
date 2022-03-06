import { blacklistRepository } from '../../repositories'
import { CountItemsUseCase } from './countItemsUseCase'

const countItemsUseCase: CountItemsUseCase = new CountItemsUseCase(blacklistRepository)

export { countItemsUseCase }