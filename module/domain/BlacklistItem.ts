export interface IBlacklistItemProps {
    cpf: string
    status: string
    createdAt: Date
    updatedAt: Date
}

export class BlacklistItem implements IBlacklistItemProps{

    item: IBlacklistItemProps

    private constructor(props: IBlacklistItemProps) {
        this.item = props
    }

    get cpf(): string {
        return this.item.cpf
    }

    get status(): string {
        return this.item.status
    }

    get createdAt(): Date {
        return this.item.createdAt
    }

    get updatedAt(): Date {
        return this.item.updatedAt
    }

    static createBlacklistItem(props: IBlacklistItemProps) {
        if (!props.cpf || !props.status)
            throw new Error('Missing data for BlacklistItem creation')
        
        return new BlacklistItem(props)
    }

}