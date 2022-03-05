import { BlacklistItem, IBlacklistItemProps } from '../domain/BlacklistItem';

export type Result = { 
    success: boolean,
    message: string,
    item?: BlacklistItem
}

export interface IBlacklistRepository {

    includeNewItem(BlacklistItemEntity: BlacklistItem): Promise<Result>

    searchItemByCPF(cpf: string): Promise<Result>

    deleteItemByCPF(cpf: string): Promise<Result>

    changeStatusCPF(cpf: string, status: string): Promise<Result>
    
}