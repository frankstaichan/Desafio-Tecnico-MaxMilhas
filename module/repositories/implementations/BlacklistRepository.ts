import { IBlacklistRepository, Result, Data, BlacklistStatus } from '../IBlacklistRepository'
import { BlacklistItem, IBlacklistItemProps } from '../../domain/BlacklistItem'
import { BlacklistModel } from '../../models/BlacklistModel'


export class BlacklistRepository implements IBlacklistRepository {

    public constructor(private blacklistModelEntity: BlacklistModel){
        
    }

    async db() {
        const jsonDatabase = await this.blacklistModelEntity.initJSONDatabase<Data>({ blacklist: [] })
        return jsonDatabase
    }

    formatCPF(cpf: string): string {
        const validCPF = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, 
            function( regex, param1, param2, param3, param4 ) {
                return param1 + '.' + param2 + '.' + param3 + '-' + param4;
            })
        return validCPF
    }

    async searchItemByCPF(cpf: string): Promise<Result> {

        const result: Result = {
            success: true,
            message: ''
        }

        if (cpf.length != 11) {
            result.success = false
            result.message = 'The CPF searched has the wrong number of digits. CPFs have 11 digits.'
            return result
        }

        const data = await (await this.db()).read()

        const validCPF = this.formatCPF(cpf)

        const item = data.blacklist.find(element => element.item.cpf == validCPF)

        if (!item) {
            result.success = false
            result.message = `There is not an item with the CPF ${validCPF} in the Blacklist.`
            return result
        }

        result.message = `Found an item in the Blacklist with the CPF ${validCPF}.`
        result.item = item

        return result
    }

    async includeNewItem(blacklistItemEntity: BlacklistItem): Promise<Result> {

        const result: Result = {
            success: true,
            message: ''
        }

        if (blacklistItemEntity.cpf.length != 11) {
            result.success = false
            result.message = 'The CPF has the wrong number of digits. CPFs have 11 digits.'
            return result
        }

        if (blacklistItemEntity.status != BlacklistStatus.Free && blacklistItemEntity.status != BlacklistStatus.Blocked) {
            result.success = false
            result.message = `Invalid status. Status can only be 'FREE' or 'BLOCK'`
            return result
        }

        const data = await (await this.db()).read()

        blacklistItemEntity.item.cpf = this.formatCPF(blacklistItemEntity.cpf)

        const item = data.blacklist.find(element => element.item.cpf == blacklistItemEntity.cpf)

        if (item) {
            result.success = false
            result.message = `The ${blacklistItemEntity.cpf} CPF is already in the Blacklist.`
            result.item = item
            return result
        }

        data.blacklist.push(blacklistItemEntity)

        await (await this.db()).write(data)

        result.message = `CPF ${blacklistItemEntity.cpf} has been included in the Blacklist.`
        result.item = blacklistItemEntity

        return result
    }

    async deleteItemByCPF(cpf: string): Promise<Result> {

        const result: Result = {
            success: true,
            message: ''
        }

        if (cpf.length != 11) {
            result.success = false
            result.message = 'The CPF has the wrong number of digits. CPFs have 11 digits.'
            return result
        }

        const data = await (await this.db()).read()

        const validCPF = this.formatCPF(cpf)

        const item = data.blacklist.find(element => element.item.cpf == validCPF)

        if (!item) {
            result.success = false
            result.message = `There is no item with the CPF ${validCPF} in the Blacklist.`
            return result
        }

        const index: number = data.blacklist.indexOf(item)
        data.blacklist.splice(index, 1)

        await (await this.db()).write(data)

        result.message = `CPF ${validCPF} successfully deleted from the Blacklist.`
        result.item = item

        return result
    }

    async changeStatusCPF(cpf: string, status: string): Promise<Result> {

        const result: Result = {
            success: true,
            message: ''
        }

        if (cpf.length != 11) {
            result.success = false
            result.message = 'The CPF has the wrong number of digits. CPFs have 11 digits.'
            return result
        }

        const data = await (await this.db()).read()

        const validCPF = this.formatCPF(cpf)

        for (let i = 0; i < data.blacklist.length; i++) {

            if (data.blacklist[i].item.cpf == validCPF) {
                switch (status.toUpperCase()) {
                    case 'FREE': 
                        data.blacklist[i].item.status = BlacklistStatus.Free
                        data.blacklist[i].item.updatedAt = new Date()
                        result.success = true
                        result.message = `${validCPF} CPF status has been changed to 'FREE'`
                        result.item = data.blacklist[i]
                        await (await this.db()).write(data)
                        break
                    case 'BLOCK':
                        data.blacklist[i].item.status = BlacklistStatus.Blocked
                        data.blacklist[i].item.updatedAt = new Date()
                        result.success = true
                        result.message = `${validCPF} CPF status has been changed to 'BLOCK'`
                        result.item = data.blacklist[i]
                        await (await this.db()).write(data)
                        break
                    default:
                        result.success = false
                        result.message = `Invalid status. Status can only be 'FREE' or 'BLOCK'`
                        break
                }

                break

            } else {
                result.success = false
                result.message = `CPF ${validCPF} is not in the Blacklist.`
            }

        }

        return result
    }

    async countCPF(): Promise<Result> {

        const result: Result = {
            success: true,
            message: ''
        }

        let count: number = 0

        const data = await (await this.db()).read()

        data.blacklist.forEach(item => {
            count += 1
        });

        result.message = `Total CPFs in the Blacklist: ${count}.`
        result.itemCount = count

        return result

    }

}