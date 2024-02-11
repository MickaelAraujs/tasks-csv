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

    select(table, search) {
        let rows = this.#database[table] ?? []

        if (!search || !Object.entries(search).length) return rows

        return rows.filter(row => {
            return Object.entries(search).some(([key, value]) => {
                return row[key].toLowerCase().includes(value.toLowerCase())
            })
        })
    }

    selectBy(table, id) {
        const rows = this.#database[table] ?? []

        return rows.find(row => row.id === id)
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

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = {
                ...data,
                id,
            }
        }

        this.#persist()
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
        }

        this.#persist()
    }
}