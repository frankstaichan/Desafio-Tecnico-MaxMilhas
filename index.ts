import express from 'express';
import { Request, Response } from 'express'

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Well done!');
})

app.post('/status', (req: Request, res: Response) => {
    res.send('Well done!');
})

app.post('/include', (req: Request, res: Response) => {
    res.send('Well done!');
})

app.post('/delete', (req: Request, res: Response) => {
    res.send('Well done!');
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})