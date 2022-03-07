import { BlacklistItem, IBlacklistItemProps } from '../../domain/BlacklistItem'
import { IBlacklistRepository, Result } from '../../repositories/IBlacklistRepository'
import { includeItemUseCaseDTO } from './includeItemDTO'


export class IncludeItemUseCase {

    constructor(private blacklistRepository: IBlacklistRepository) {

    }

    async execute(request: includeItemUseCaseDTO): Promise<Result> {

        if (!request.cpf || !request.status) {
            return {
                success: false,
                message: 'CPF and/or Status for Blacklist inclusion are null.'
            }
        }

        const blacklistProps: IBlacklistItemProps = {
            cpf: request.cpf,
            status: request.status.toUpperCase(),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const blacklistItemInstance = BlacklistItem.createBlacklistItem(blacklistProps)

        const item: Result = await this.blacklistRepository.includeNewItem(blacklistItemInstance)

        return item
    }

}