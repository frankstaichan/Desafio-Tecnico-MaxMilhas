import { searchItemUseCase } from '../../module/useCases/searchItem'
import { searchItemUseCaseDTO } from '../../module/useCases/searchItem/searchItemDTO'
import { Result } from '../../module/repositories/IBlacklistRepository'
import { formatCPF } from '../Utils'


describe('searchItemUseCase integration test', () => {
    
    it('should search for an item in the Blacklist', async () => {

        const testCPF: string = '07837278526'

        const searchItemDTO: searchItemUseCaseDTO = {
            cpf: testCPF
        }

        const blacklistItem: Result = await searchItemUseCase.execute(searchItemDTO)

        const validCPF: string= formatCPF(testCPF)

        expect(blacklistItem.success).toBe(true)

        expect(blacklistItem.message).toBe(`Found an item in the Blacklist with the CPF ${validCPF}.`)
        
    })

    it(`should fail to search for an item in the Blacklist because the CPF doesn't have 11 digits`, async () => {

        const randomIncorrectCPF: string = Math.floor(100000000 + Math.random() * 900000000).toString()

        const searchItemDTO: searchItemUseCaseDTO = {
            cpf: randomIncorrectCPF
        }


        const blacklistItem: Result = await searchItemUseCase.execute(searchItemDTO)

        expect(blacklistItem.success).toBe(false)

        expect(blacklistItem.message).toBe('The CPF searched has the wrong number of digits. CPFs have 11 digits.')
        
    })

    it(`should fail to search for an item in the Blacklist because the CPF is null`, async () => {

        const searchItemDTO: searchItemUseCaseDTO = {
            cpf: ''
        }

        const blacklistItem: Result = await searchItemUseCase.execute(searchItemDTO)

        expect(blacklistItem.success).toBe(false)

        expect(blacklistItem.message).toBe('CPF for Blacklist search is null.')
        
    })

    it(`should fail to search for an item in the Blacklist`, async () => {

        const randomCPF: string = Math.floor(10000000000 + Math.random() * 90000000000).toString()

        const searchItemDTO: searchItemUseCaseDTO = {
            cpf: randomCPF
        }

        const blacklistItem: Result = await searchItemUseCase.execute(searchItemDTO)

        const validCPF: string= formatCPF(randomCPF)

        expect(blacklistItem.success).toBe(false)

        expect(blacklistItem.message).toBe(`There is not an item with the CPF ${validCPF} in the Blacklist.`)
        
    })

})