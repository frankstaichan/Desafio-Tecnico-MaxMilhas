import { blacklistRepository } from '../../repositories'
import { IncludeItemUseCase } from './includeItemUseCase'

const includeItemUseCase: IncludeItemUseCase = new IncludeItemUseCase(blacklistRepository)

export { includeItemUseCase }