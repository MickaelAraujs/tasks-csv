import { parse } from 'csv-parse'
import { createReadStream } from 'node:fs'

const csvPath = new URL('./tasks.csv', import.meta.url)

const readCsvStream = createReadStream(csvPath, { encoding: 'utf-8' })
const csvParserStream = parse({
    delimiter: ',',
    encoding: 'utf-8',
    from_line: 2,
    skip_empty_lines: true,
})

async function uploadTasksFromCsv() {
    const csvLines = readCsvStream.pipe(csvParserStream)

    for await (const [title, description] of csvLines) {
        try {
            await fetch('http://localhost:3000/tasks', {
                headers: {
                    'Content-type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    title,
                    description,
                })
            })
    
            console.log(`task: ${title} - ${description} successfully imported!`)
    
            await sleep(500) //timeout to see the stream upload
        } catch (error) {
            console.error(error)
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

uploadTasksFromCsv()