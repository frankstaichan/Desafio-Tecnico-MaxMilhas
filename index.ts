import * as express from 'express';
import { Result } from './module/repositories/IBlacklistRepository'
import { Router, Request, Response } from 'express'
import { changeItemStatusUseCase } from './module/useCases/changeItemStatus'
import { deleteItemUseCase } from './module/useCases/deleteItem'
import { includeItemUseCase } from './module/useCases/includeItem'
import { searchItemUseCase } from './module/useCases/searchItem'
import { countItemsUseCase } from './module/useCases/countItems'


const app = express();
const port = 8000

let searchCount: number = 0

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    console.log('testando')
    res.send('Well done!')
})

app.get('/search/:cpf', async (req: Request, res: Response) => {
    req.params
    const searchDTO = {
        cpf: req.params.cpf
    }
    const searchedItem: Result = await searchItemUseCase.execute(searchDTO)
    searchCount += 1
    res.json(searchedItem)
})

app.get('/status', async (req: Request, res: Response) => {
    const itemCount: Result = await countItemsUseCase.execute()
    itemCount.searchCount = searchCount
    itemCount.message += ` Total CPF searches: ${itemCount.searchCount}`
    res.json(itemCount)
})

app.post('/include/:cpf/status/:status', async (req: Request, res: Response) => {
    req.params
    const inclusionDTO = { 
        cpf: req.params.cpf,
        status: req.params.status
    }
    const itemInclusion: Result = await includeItemUseCase.execute(inclusionDTO)
    res.json(itemInclusion)
})

app.post('/changeStatus/:cpf/status/:status', async (req: Request, res: Response) => {
    req.params
    const changeStatusDTO = { 
        cpf: req.params.cpf,
        status: req.params.status
    }
    const itemStatusChange: Result = await changeItemStatusUseCase.execute(changeStatusDTO)
    res.json(itemStatusChange)
})

app.delete('/delete/:cpf', async (req: Request, res: Response) => {
    req.params
    const deletionDTO = { 
        cpf: req.params.cpf
    }
    const itemDeletion: Result = await deleteItemUseCase.execute(deletionDTO)
    res.json(itemDeletion)
})

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`)
})