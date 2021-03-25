import * as path from 'path'
import * as fs from 'fs-extra'
import * as globby from 'globby'

const replacePathSplit = (path) => path.replace(/\\/g, '/')

export default async (patterns, targetPath, options?, successCallback?, errorCallback?) => {
    options.cwd = options.cwd || process.cwd()
    const isAbsolute = path.isAbsolute(targetPath)
    const newTargetPath = replacePathSplit(isAbsolute ? targetPath : path.join(options.cwd, targetPath))
    await fs.ensureDir(newTargetPath)

    const filePaths = await globby([].concat(patterns || '**/*'), { dot: true, ...options, absolute: false })
    if (!targetPath) return
    const promises = filePaths.map(async (filePath, i) => {
        try {
            await fs.copy(filePath, path.join(options.cwd, newTargetPath, filePath))
            successCallback && successCallback(filePath, i)
        } catch (e) {
            errorCallback && errorCallback(e, filePath, i)
        }
    })
    return Promise.all(promises)
}

