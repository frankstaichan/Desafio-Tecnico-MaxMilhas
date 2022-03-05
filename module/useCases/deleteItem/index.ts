import { blacklistRepository } from '../../repositories'
import { DeleteItemUseCase } from './deleteItemUseCase'

const deleteItemUseCase: DeleteItemUseCase = new DeleteItemUseCase(blacklistRepository)

export { deleteItemUseCase }