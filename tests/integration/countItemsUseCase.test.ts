import { countItemsUseCase } from '../../module/useCases/countItems'
import { Result } from '../../module/repositories/IBlacklistRepository'


describe('countItemsUseCase integration test', () => {

    it('should count the number of items in the Blacklist', async () => {

        const blacklistItemCount: Result = await countItemsUseCase.execute()

        expect(blacklistItemCount.success).toBe(true)

        expect(typeof(blacklistItemCount.itemCount)).toBe('number')

    })
    
})