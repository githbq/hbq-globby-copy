#!/usr/bin/env node
import * as  yargs from 'yargs'
import copy from '../index'


async function start() {
    let argv = yargs.version().argv
    if (argv._.length === 0) {
        console.log(`请提供 glob pattern 多个pattern以空格分割,如：[命令名] '*.js' '*.abc' -d '/home/temp'`)
        return
    }
    if (!argv.d) {
        console.log(`请提供目标文件夹 如：[命令名] '*.js' '*.abc' -d '/home/temp'`)
        return
    }
    try {
        await copy(argv._, argv.d)
    } catch (e) {
        console.error(e.message)
    }
}

start()
