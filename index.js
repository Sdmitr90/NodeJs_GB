#!/usr/bin/env node

import http from "http";
import path from "path";
import fs from "fs";


const host = 'localhost'
const port = 3000
const __dirname = process.cwd()
const isFile = (path) => fs.lstatSync(path).isFile();

http
    .createServer((req, res) => {
        const fullPath = path.join(process.cwd(), req.url);

        if (!fs.existsSync(fullPath)) {
            return res.end("File or directory not found");
        }
        if (isFile(fullPath)) {
            return fs.createReadStream(fullPath).pipe(res);
        }
        let link = ''
        const urlDirs = req.url.match(/[\d\w\.-]+/gi);
        if (urlDirs) {
            urlDirs.pop();
            const prev = urlDirs.join("/");
            link = urlDirs.length
                ? `<li><a href="/${prev}">..</a></li>`
                : `<li><a href="/">..</a></li>`;
        }

        fs.readdirSync(fullPath).forEach((fileName) => {
            const filePath = path.join(req.url, fileName);

            link += `<li><a href="${filePath}">${fileName}</a></li>`;
        });

        const HTML = fs
            .readFileSync(path.join(__dirname, "index.html"), "utf-8")
            .replace("##links", link);

        res.writeHead(200, {
            "Content-Type": "text/html",
        });

        return res.end(HTML);
    })
    .listen(port, host, () => console.log(`Server running at http://${host}:${port}`));