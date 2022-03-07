import { BlacklistItem, IBlacklistItemProps } from '../../module/domain/BlacklistItem'
import { formatCPF } from '../Utils'


describe('blacklistItem unit test', () => {

    it('should create a new instance of a blacklistItem', async () => {

        const randomCPF: string = Math.floor(10000000000 + Math.random() * 90000000000).toString()

        const validCPF = formatCPF(randomCPF)

        const blacklistItemProps: IBlacklistItemProps = {
            cpf: validCPF,
            status: 'FREE',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const blacklistItem: BlacklistItem = await BlacklistItem.createBlacklistItem(blacklistItemProps)

        expect(blacklistItem.cpf).toBe(validCPF)

        expect(blacklistItem.status).toBe('FREE')

        expect(blacklistItem.createdAt).toBe(blacklistItemProps.createdAt)

        expect(blacklistItem.updatedAt).toBe(blacklistItemProps.updatedAt)

    })
    
})