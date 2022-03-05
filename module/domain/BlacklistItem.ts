export interface IBlacklistItemProps {
    cpf: string
    status: string
    createdAt: Date
    updatedAt: Date
}

export class BlacklistItem implements IBlacklistItemProps{

    props: IBlacklistItemProps

    private constructor(props: IBlacklistItemProps) {
        this.props = props
    }

    get cpf(): string {
        return this.props.cpf
    }

    get status(): string {
        return this.props.status
    }

    get createdAt(): Date {
        return this.props.createdAt
    }

    get updatedAt(): Date {
        return this.props.updatedAt
    }

    static createBlacklistItem(props: IBlacklistItemProps) {
        if (!props.cpf || !props.status)
            return 'Missing data for BlacklistItem creation'
        
        return new BlacklistItem(props)
    }

}