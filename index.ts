import express from 'express';
import { Router, Request, Response } from 'express'
import { changeItemStatusUseCase } from './module/useCases/changeItemStatus'
import { deleteItemUseCase } from './module/useCases/deleteItem'
import { includeItemUseCase } from './module/useCases/includeItem'
import { searchItemUseCase } from './module/useCases/searchItem'


const app = express();

const route = Router()

app.use(express.json)

route.get('/', (req: Request, res: Response) => {
    res.send('Well done!');
})

route.get('/search', (req: Request, res: Response) => {
    res.send('Well done!');
})

route.get('/status', (req: Request, res: Response) => {
    res.send('Well done!');
})

route.post('/include', (req: Request, res: Response) => {
    res.send('Well done!');
})

route.post('/delete', (req: Request, res: Response) => {
    res.send('Well done!');
})

route.use(route)

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})