import { BlacklistItem, IBlacklistItemProps } from '../domain/BlacklistItem';


export interface IBlacklistRepository {

    searchItemByCPF(cpf: string): Promise<IBlacklistItemProps>

    includeNewItem(BlacklistItemEntity: BlacklistItem): Promise<IBlacklistItemProps>

    deleteItemByCPF(cpf: string): Promise<string>
    
}