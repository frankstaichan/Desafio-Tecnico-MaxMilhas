import { includeItemUseCase } from '../../module/useCases/includeItem'
import { includeItemUseCaseDTO } from '../../module/useCases/includeItem/includeItemDTO'
import { deleteItemUseCase } from '../../module/useCases/deleteItem'
import { deleteItemUseCaseDTO } from '../../module/useCases/deleteItem/deleteItemDTO'
import { Result } from '../../module/repositories/IBlacklistRepository'
import { formatCPF } from '../Utils'


describe('deleteItemUseCase integration test', () => {

    it('should include a new item in the Blacklist and then delete it', async () => {

        const randomCPF: string = Math.floor(10000000000 + Math.random() * 90000000000).toString()

        const includeItemDTO: includeItemUseCaseDTO = {
            cpf: randomCPF,
            status: 'FREE'
        }

        const blacklistInclusion: Result = await includeItemUseCase.execute(includeItemDTO)

        const deleteItemDTO: deleteItemUseCaseDTO = {
            cpf: randomCPF
        }

        const blacklistDeletion: Result = await deleteItemUseCase.execute(deleteItemDTO)

        const validCPF: string = formatCPF(randomCPF)

        expect(blacklistDeletion.success).toBe(true)

        expect(blacklistDeletion.message).toBe(`CPF ${validCPF} successfully deleted from the Blacklist.`)
        
    })

    it(`should fail to delete an item from the Blacklist because the CPF doesn't have 11 digits`, async () => {

        const randomIncorrectCPF: string = Math.floor(100000000 + Math.random() * 900000000).toString()

        const deleteItemDTO: deleteItemUseCaseDTO = {
            cpf: randomIncorrectCPF
        }

        const blacklistDeletion: Result = await deleteItemUseCase.execute(deleteItemDTO)

        expect(blacklistDeletion.success).toBe(false)

        expect(blacklistDeletion.message).toBe('The CPF has the wrong number of digits. CPFs have 11 digits.')
        
    })

    it(`should fail to delete an item from the Blacklist because there is no item with the received CPF in the Blacklist`, async () => {

        const randomCPF: string = Math.floor(10000000000 + Math.random() * 90000000000).toString()

        const deleteItemDTO: deleteItemUseCaseDTO = {
            cpf: randomCPF
        }

        const blacklistDeletion: Result = await deleteItemUseCase.execute(deleteItemDTO)

        const validCPF: string = formatCPF(randomCPF)

        expect(blacklistDeletion.success).toBe(false)

        expect(blacklistDeletion.message).toBe(`There is no item with the CPF ${validCPF} in the Blacklist.`)
        
    })

    it(`should fail to delete an item from the Blacklist because the CPF or status are null`, async () => {

        const deleteItemDTO: deleteItemUseCaseDTO = {
            cpf: ''
        }

        const blacklistDeletion: Result = await deleteItemUseCase.execute(deleteItemDTO)

        expect(blacklistDeletion.success).toBe(false)

        expect(blacklistDeletion.message).toBe('CPF for Blacklist deletion is null')
        
    })

})