import { IBlacklistRepository, Result } from '../../repositories/IBlacklistRepository'
import { deleteItemUseCaseDTO } from './deleteItemDTO'


export class DeleteItemUseCase {

    constructor(private blacklistRepository: IBlacklistRepository) {

    }

    async execute(request: deleteItemUseCaseDTO): Promise<Result> {

        if (!request.cpf) {
            return {
                success: false,
                message: 'CPF for Blacklist deletion is null'
            }
        }

        const item: Result = await this.blacklistRepository.deleteItemByCPF(request.cpf)

        return item
    }

}