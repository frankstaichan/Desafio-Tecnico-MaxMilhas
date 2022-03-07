import { changeItemStatusUseCase } from '../../module/useCases/changeItemStatus'
import { changeItemStatusUseCaseDTO } from '../../module/useCases/changeItemStatus/changeItemStatusDTO'
import { Result } from '../../module/repositories/IBlacklistRepository'
import { formatCPF } from '../Utils'


describe('changeItemStatusUseCase integration test', () => {

    it('should change the status of an item in the Blacklist to FREE', async () => {

        const testCPF: string = '07837278526'

        const changeItemStatusDTO: changeItemStatusUseCaseDTO = {
            cpf: testCPF,
            status: 'FREE'
        }

        const blacklistChangedItem: Result = await changeItemStatusUseCase.execute(changeItemStatusDTO)

        const validCPF: string= formatCPF(testCPF)

        expect(blacklistChangedItem.success).toBe(true)

        expect(blacklistChangedItem.message).toBe(`${validCPF} CPF status has been changed to 'FREE'`)
        
    })

    it('should change the status of an item in the Blacklist to BLOCK', async () => {

        const testCPF: string = '07837278526'

        const changeItemStatusDTO: changeItemStatusUseCaseDTO = {
            cpf: testCPF,
            status: 'BLOCK'
        }

        const blacklistChangedItem: Result = await changeItemStatusUseCase.execute(changeItemStatusDTO)

        const validCPF: string = formatCPF(testCPF)

        expect(blacklistChangedItem.success).toBe(true)

        expect(blacklistChangedItem.message).toBe(`${validCPF} CPF status has been changed to 'BLOCK'`)
        
    })

    it(`should fail to change the status of an item in the Blacklist because the CPF doesn't have 11 digits`, async () => {

        const randomIncorrectCPF: string = Math.floor(100000000 + Math.random() * 900000000).toString()

        const changeItemStatusDTO: changeItemStatusUseCaseDTO = {
            cpf: randomIncorrectCPF,
            status: 'FREE'
        }

        const blacklistChangedItem: Result = await changeItemStatusUseCase.execute(changeItemStatusDTO)

        expect(blacklistChangedItem.success).toBe(false)

        expect(blacklistChangedItem.message).toBe('The CPF has the wrong number of digits. CPFs have 11 digits.')
        
    })

    it(`should fail to change the status of an item in the Blacklist because the status is not valid`, async () => {

        const testCPF: string = '07837278526'

        const changeItemStatusDTO: changeItemStatusUseCaseDTO = {
            cpf: testCPF,
            status: 'TEST'
        }

        const blacklistChangedItem: Result = await changeItemStatusUseCase.execute(changeItemStatusDTO)

        expect(blacklistChangedItem.success).toBe(false)

        expect(blacklistChangedItem.message).toBe(`Invalid status. Status can only be 'FREE' or 'BLOCK'`)
        
    })

    it(`should fail to change the status of an item in the Blacklist because the CPF or status are null`, async () => {

        const changeItemStatusDTO: changeItemStatusUseCaseDTO = {
            cpf: '',
            status: ''
        }

        const blacklistChangedItem: Result = await changeItemStatusUseCase.execute(changeItemStatusDTO)

        expect(blacklistChangedItem.success).toBe(false)

        expect(blacklistChangedItem.message).toBe(`CPF and/or Status for Blacklist status change are null`)
        
    })


    it(`should fail to change the status of an item in the Blacklist because the CPF is not in the black list`, async () => {

        const randomCPF: string = Math.floor(10000000000 + Math.random() * 90000000000).toString()

        const changeItemStatusDTO: changeItemStatusUseCaseDTO = {
            cpf: randomCPF,
            status: 'FREE'
        }

        const blacklistChangedItem: Result = await changeItemStatusUseCase.execute(changeItemStatusDTO)

        const validCPF: string = formatCPF(randomCPF)

        expect(blacklistChangedItem.success).toBe(false)

        expect(blacklistChangedItem.message).toBe(`CPF ${validCPF} is not in the Blacklist.`)
        
    })

})