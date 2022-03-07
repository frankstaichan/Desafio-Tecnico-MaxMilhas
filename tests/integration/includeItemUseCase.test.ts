import { includeItemUseCase } from '../../module/useCases/includeItem'
import { includeItemUseCaseDTO } from '../../module/useCases/includeItem/includeItemDTO'
import { Result } from '../../module/repositories/IBlacklistRepository'
import { formatCPF } from '../Utils'


describe('includeItemUseCase integration test', () => {

    it('should include a new item in the Blacklist', async () => {

        const randomCPF: string = Math.floor(10000000000 + Math.random() * 90000000000).toString()

        const includeItemDTO: includeItemUseCaseDTO = {
            cpf: randomCPF,
            status: 'FREE'
        }

        const blacklistInclusion: Result = await includeItemUseCase.execute(includeItemDTO)

        expect(blacklistInclusion.success).toBe(true)
        
    })

    it(`should fail to include a new item in the Blacklist because the CPF doesn't have 11 digits`, async () => {

        const randomIncorrectCPF: string = Math.floor(100000000 + Math.random() * 900000000).toString()

        const includeItemDTO: includeItemUseCaseDTO = {
            cpf: randomIncorrectCPF,
            status: 'FREE'
        }

        const blacklistInclusion: Result = await includeItemUseCase.execute(includeItemDTO)

        expect(blacklistInclusion.success).toBe(false)

        expect(blacklistInclusion.message).toBe('The CPF has the wrong number of digits. CPFs have 11 digits.')
        
    })

    it(`should fail to include a new item in the Blacklist because the status is not valid`, async () => {

        const randomCPF: string = Math.floor(10000000000 + Math.random() * 90000000000).toString()

        const includeItemDTO: includeItemUseCaseDTO = {
            cpf: randomCPF,
            status: 'TEST'
        }

        const blacklistInclusion: Result = await includeItemUseCase.execute(includeItemDTO)

        expect(blacklistInclusion.success).toBe(false)

        expect(blacklistInclusion.message).toBe(`Invalid status. Status can only be 'FREE' or 'BLOCK'`)
        
    })

    it(`should fail to include a new item in the Blacklist because the CPF or status are null`, async () => {

        const includeItemDTO: includeItemUseCaseDTO = {
            cpf: '',
            status: ''
        }

        const blacklistInclusion: Result = await includeItemUseCase.execute(includeItemDTO)

        expect(blacklistInclusion.success).toBe(false)

        expect(blacklistInclusion.message).toBe(`CPF and/or Status for Blacklist inclusion are null.`)
        
    })

    it(`should fail to include a new item in the Blacklist because the CPF is already in the blacklist`, async () => {

        const testCPF: string = '07837278526'

        const includeItemDTO: includeItemUseCaseDTO = {
            cpf: testCPF,
            status: 'FREE'
        }

        const blacklistInclusion: Result = await includeItemUseCase.execute(includeItemDTO)

        const validCPF: string = formatCPF(testCPF)

        expect(blacklistInclusion.success).toBe(false)

        expect(blacklistInclusion.message).toBe(`The ${validCPF} CPF is already in the Blacklist.`)
        
    })


})