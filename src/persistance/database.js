import fs from 'node:fs/promises'

const databasePath = new URL('./db.json', import.meta.url)

export class Database {
    #database = {}

    constructor () {
        fs.readFile(databasePath, { encoding: 'utf-8' })
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist()
            })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    insert(table, data) {
        const rows = this.#database[table] ?? []
        
        if (!rows.length) {
            this.#database[table] = [data]
        } else {
            this.#database[table].push(data)
        }

        this.#persist()
    }
}