#!/usr/bin/node
const url = {
    dev: 'dev',
    prod: 'prod',
    test: 'test'
}
let getEv = (ev = 'dev') => {
    if (!Object.keys(url).some(v => v == ev)) {
        return console.error('exist params')
    }
    console.log('evn:',ev)
}


const child_process = require('child_process');

let subProcess = child_process.exec("npm -v", function (err, stdout) {
    if (err) console.log(err);
    console.log(stdout);
    subProcess.kill()
});

const readline = require('readline');
const unloadChar = '-';
const loadedChar = '=';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('运行环境？ ',(param)=>{
    let i = 0;
    let time = setInterval(()=>{
        if(i>10){
            clearInterval(time);
            readline.cursorTo(process.stdout, 0, 0);
            readline.clearScreenDown(process.stdout);
            getEv(param)
            process.exit(0)
            return
        }
        readline.cursorTo(process.stdout,0,1);
        readline.clearScreenDown(process.stdout);
        renderProgress('loadding',i);
        i++
    },200);
});

function renderProgress(text,step){
    const PERCENT = Math.round(step*10);
    const COUNT = 2;
    const unloadStr = new Array(COUNT*(10-step)).fill(unloadChar).join('');
    const loadedStr = new Array(COUNT*(step)).fill(loadedChar).join('');
    process.stdout.write(`${text}:【${loadedStr}${unloadStr}|${PERCENT}%】`)
}

// module.exports = getEv(process.argv[2])