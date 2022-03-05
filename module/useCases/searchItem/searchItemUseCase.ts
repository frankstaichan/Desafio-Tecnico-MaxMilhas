import { IBlacklistRepository, Result } from '../../repositories/IBlacklistRepository'
import { searchItemUseCaseDTO } from './searchItemDTO'


export class SearchItemUseCase {

    constructor(private blacklistRepository: IBlacklistRepository) {

    }

    async execute(request: searchItemUseCaseDTO): Promise<Result> {

        if (!request.cpf) {
            return {
                success: false,
                message: 'CPF for Blacklist search is null'
            }
        }

        const item: Result = await this.blacklistRepository.searchItemByCPF(request.cpf)

        return item
    }

}