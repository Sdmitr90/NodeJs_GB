import fs from "fs"
import path from "path"
import readline from "readline"
import inquirer from "inquirer"

const isFile = (path) => fs.lstatSync(path).isFile()
const filesList = (path) => fs.readdirSync(path)

const __dirname = process.cwd()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const questions = async (query) =>
    new Promise((resolve) => rl.question(query, resolve));

(async () => {
    let query = await questions("What are we looking for? ")

    while (query.length === 0) {
        query = await questions("What are we looking for? ")
    }

    let dir = await questions("Which directory to go? Example:/home \n" +
        "Enter path:")
    if (!dir) {
        dir = __dirname
    }

    const data = await funcInquirer(dir)

    const found = data.indexOf(query)

    if (found >= 0)
        console.log(`Matches found: indexOf ${found}`)
    else console.log("No matches found")

    rl.close();
})();

const funcInquirer = ((pathToFiles) =>
    inquirer
        .prompt([
            {
                name: "fileName",
                type: "list",
                message: "In which file are we looking for matches?",
                choices: filesList(pathToFiles),
            },
        ])
        .then((answer) => {
            const name = answer.fileName
            const fullPath = path.resolve(pathToFiles, name)

            if (isFile(fullPath)) {
                return fs.readFileSync(fullPath, "utf-8")
            } else {
                return funcInquirer(fullPath)
            }
        }).catch(function () {
        console.log("Promise Rejected")
    }))






