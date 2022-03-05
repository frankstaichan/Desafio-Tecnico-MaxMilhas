import { IBlacklistRepository, Result } from '../../repositories/IBlacklistRepository'
import { changeItemStatusUseCaseDTO } from './changeItemStatusDTO'


export class ChangeItemStatusUseCase {

    constructor(private blacklistRepository: IBlacklistRepository) {
        
    }

    async execute(request: changeItemStatusUseCaseDTO) {

        if (!request.cpf || !request.status) {
            return {
                success: false,
                message: 'CPF and/or Status for Blacklist status change are null'
            }
        }

        const item: Result = await this.blacklistRepository.changeStatusCPF(request.cpf, request.status)

        return item

    }

}