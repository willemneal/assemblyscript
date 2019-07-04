let glob = require("glob").sync
let cp = require('child_process')
let cmd = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';

let buffer = [];

function exec(commands) {
    let child = cp.spawn(cmd, commands, { env: process.env, cwd: __dirname })
        .on("error", (error) => {
            console.error(error); 
            process.exit(1);
            
        })
        .on("close", (code, signal) => {            
            let res = buffer.join("");
            if (res.match(/ERROR: Import file \'~lib\/a.ts\' not found/)) {
                process.exit(0);
            } else {
                process.exit(1);
            }
        });
    child.stderr.on('data', (chunk) => {
        buffer.push(chunk.toString());
        });

}

exec(process.argv.slice(2))