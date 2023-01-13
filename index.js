// https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#filehandlecreatereadstreamoptions
// https://nodejs.org/dist/latest-v18.x/docs/api/readline.html#event-line

import { createReadStream, createWriteStream } from 'fs'
import * as readline from 'readline';

const url = './access_tmp.log.txt'

const requestLog = [
    '89.123.1.41',
    '34.48.240.111'
]

const rs = createReadStream(url, {
    encoding: 'utf-8',
})

const rl = readline.createInterface({
    input: rs,
});

let numberString = 0

rl.on('line', (input) => {

    numberString++

    for(let ipCheck = 0; ipCheck <= requestLog.length; ipCheck++ ){

        let ip = requestLog[ipCheck]

        if(input.indexOf(ip) >= 0){
            const writeStream = createWriteStream(`./${ip}_requests.log`, {flags: 'a'})
            writeStream.write(`original string №${numberString}:    ${input}` + "\n")
        }
    }
});