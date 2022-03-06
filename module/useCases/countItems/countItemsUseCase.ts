import { IBlacklistRepository, Result } from '../../repositories/IBlacklistRepository'


export class CountItemsUseCase {

    constructor(private blacklistRepository: IBlacklistRepository) {

    }

    async execute(): Promise<Result> {

        const itemCount: Result = await this.blacklistRepository.countCPF()

        return itemCount

    }

}