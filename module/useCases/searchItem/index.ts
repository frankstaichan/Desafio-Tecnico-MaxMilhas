import { blacklistRepository } from '../../repositories'
import { SearchItemUseCase } from './searchItemUseCase'

const searchItemUseCase: SearchItemUseCase = new SearchItemUseCase(blacklistRepository)

export { searchItemUseCase }