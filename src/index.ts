import * as path from 'path'
import * as fs from 'fs-extra'
import * as globby from 'globby'

const replacePathSplit = (path) => path.replace(/\\/g, '/')

export default async (patterns, targetPath, options?, successCallback?, errorCallback?) => {
    const newTargetPath = replacePathSplit(path.resolve(targetPath))
    await fs.ensureDir(newTargetPath)

    const filePaths = await globby([].concat(patterns || '**/*'), { ...options, absolute: false })
    if (!targetPath) return
    const promises = filePaths.map(async (filePath, i) => {
        try {
            await fs.copy(filePath, path.resolve(newTargetPath, filePath))
            successCallback && successCallback(filePath, i)
        } catch (e) {
            errorCallback && errorCallback(e, i)
        }
    })
    return await Promise.all(promises)
}

