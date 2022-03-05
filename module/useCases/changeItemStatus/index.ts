import { blacklistRepository } from '../../repositories'
import { ChangeItemStatusUseCase } from './changeItemStatusUseCase'

const changeItemStatusUseCase: ChangeItemStatusUseCase = new ChangeItemStatusUseCase(blacklistRepository)

export { changeItemStatusUseCase }