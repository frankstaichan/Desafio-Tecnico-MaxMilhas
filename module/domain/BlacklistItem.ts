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

    public get cpf(): string {
        return this.item.cpf
    }

    public get status(): string {
        return this.item.status
    }

    public get createdAt(): Date {
        return this.item.createdAt
    }

    public get updatedAt(): Date {
        return this.item.updatedAt
    }

    static createBlacklistItem(props: IBlacklistItemProps) {
        if (!props.cpf || !props.status)
            throw new Error('Missing data for BlacklistItem creation')
        
        return new BlacklistItem(props)
    }

}