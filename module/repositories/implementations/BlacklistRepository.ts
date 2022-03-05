import { IBlacklistRepository } from '../IBlacklistRepository'
import { BlacklistItem, IBlacklistItemProps } from '../../domain/BlacklistItem'
import * as lowdb from 'lowdb'
import { Low, JSONFile } from 'lowdb'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

type Data = {
    blacklist: IBlacklistItemProps[]
}

const __dirname: string = dirname(fileURLToPath('../../models/Blacklist.json'));

// Use JSON file for storage
const file: string = join(__dirname, 'db.json')
const adapter = new JSONFile<Data>(file)
const db = new Low(adapter)

class BlacklistRepository implements IBlacklistRepository {

    public constructor(){

    }

    async searchItemByCPF(cpf: string): Promise<IBlacklistItemProps> {
        await db.read()

        db.data = db.data || { blacklist: [] }
        const item = db.data.blacklist.find(item => item.cpf == cpf)

        if (item === undefined)
            throw new Error('The value was promised to always be there!');

        return item
    }

    async includeNewItem(BlacklistItemEntity: BlacklistItem): Promise<IBlacklistItemProps> {
        await db.read()

        db.data = db.data || { blacklist: [] }
        db.data.blacklist.push(BlacklistItemEntity.props)

        return BlacklistItemEntity.props
    }

    async removeItem(cpf: string): Promise<string>{
        await db.read()

        db.data = db.data || { blacklist: [] }
        db.data.blacklist.

    }



}