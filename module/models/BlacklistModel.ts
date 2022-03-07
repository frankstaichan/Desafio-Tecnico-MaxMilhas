import * as path from "path";
import * as fspromises from "fs/promises";
import * as fs from "fs";

const filePath = path.join(__dirname, "./Blacklist.json")


export class BlacklistModel {

    constructor() {

    }

    async initJSONDatabase<T> (initialData: T) {
        const read = async () => {
            const data = await fspromises.readFile(filePath, {
                encoding: "utf-8",
            })
            return JSON.parse(data) as unknown as T;
        }

        const write = async (data: T) => {
            await fspromises.writeFile(filePath, JSON.stringify(data), {
                encoding: "utf-8",
            })
        }

        if (!fs.existsSync(filePath)) {
            write(initialData);
        }

        return {
            read,
            write,
        }
    }

}