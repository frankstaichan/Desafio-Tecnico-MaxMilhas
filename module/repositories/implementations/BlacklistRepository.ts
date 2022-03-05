import { IBlacklistRepository, Result } from '../IBlacklistRepository'
import { BlacklistItem, IBlacklistItemProps } from '../../domain/BlacklistItem'
import { Low, JSONFile } from 'lowdb'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

type Data = { blacklist: BlacklistItem[] }

const __dirname: string = dirname(fileURLToPath('../../models/Blacklist.json'));

const file: string = join(__dirname, 'db.json')
const adapter = new JSONFile<Data>(file)
const db = new Low(adapter)

export class BlacklistRepository implements IBlacklistRepository {

    public constructor(){

    }

    async searchItemByCPF(cpf: string): Promise<Result> {

        await db.read()

        db.data = db.data || { blacklist: [] }
        const item = db.data.blacklist.find(item => item.cpf == cpf)

        const result: Result = {
            success: true,
            message: ''
        }

        if (!item) {
            result.success = false
            result.message = `There is not an item with the ${cpf} CPF in the Blacklist.`
            return result
        }

        result.message = `Found an item in the Blacklist with the ${cpf} CPF.`
        result.item = item

        return result
    }

    async includeNewItem(blacklistItemEntity: BlacklistItem): Promise<Result> {
        await db.read()

        db.data = db.data || { blacklist: [] }
        const item = db.data.blacklist.find(item => item.cpf == blacklistItemEntity.cpf)

        const result: Result = {
            success: true,
            message: ''
        }

        if (item) {
            result.success = false
            result.message = `The ${blacklistItemEntity.cpf} CPF is already in the Blacklist.`
            result.item = item
            return result
        }

        db.data.blacklist.push(blacklistItemEntity)

        result.message = `CPF ${blacklistItemEntity.cpf} has been included in the Blacklist.`
        result.item = blacklistItemEntity

        return result
    }

    async deleteItemByCPF(cpf: string): Promise<Result> {
        await db.read()

        db.data = db.data || { blacklist: [] }
        const item = db.data.blacklist.find(item => item.cpf == cpf)

        const result: Result = {
            success: true,
            message: ''
        }

        if (!item) {
            result.success = false
            result.message = `There is no item with the ${cpf} CPF in the Blacklist.`
            return result
        }

        const index: number = db.data.blacklist.indexOf(item)
        db.data.blacklist.splice(index, 1)

        result.message = `CPF ${cpf} successfully deleted from the Blacklist.`
        result.item = item

        return result
    }

    async changeStatusCPF(cpf: string, status: string): Promise<Result> {

        const result: Result = {
            success: true,
            message: ''
        }

        await db.read()

        db.data = db.data || { blacklist: [] }
        const item = db.data.blacklist.find(item => {
            if (item.cpf === cpf){

                result.item = item

                switch (status.toUpperCase()) {
                    case 'FREE': 
                        item.changeStatusFree()
                        result.success = true
                        result.message = `${cpf} CPF status has been changed to 'FREE'`
                        break
                    case 'BLOCK':
                        item.changeStatusBlock()
                        result.success = true
                        result.message = `${cpf} CPF status has been changed to 'BLOCK'`
                        break
                    default:
                        result.success = false
                        result.message = `Invalid status. Status can only be 'FREE' or 'BLOCK'`
                        break
                }
            } else {
                result.success = false
                result.message = `CPF ${cpf} is not in the Blacklist.`
            }
        })

        return result
    }



}