import { BlacklistItem, IBlacklistItemProps } from '../domain/BlacklistItem';

export type Data = { blacklist: BlacklistItem[] }

export type Result = { 
    success: boolean,
    message: string,
    item?: BlacklistItem
    itemCount?: number
    searchCount?: number
}

export enum BlacklistStatus {
    Free = 'FREE',
    Blocked = 'BLOCK'
}

export interface IBlacklistRepository {

    includeNewItem(BlacklistItemEntity: BlacklistItem): Promise<Result>

    searchItemByCPF(cpf: string): Promise<Result>

    deleteItemByCPF(cpf: string): Promise<Result>

    changeStatusCPF(cpf: string, status: string): Promise<Result>

    countCPF(): Promise<Result>
    
}