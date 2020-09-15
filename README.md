# globby-copy-promise

## 功能介绍

1. 按需复制文件到目标目录
2. 目标目录复制后的文件保持原文件的相对路径结构
3. 支持 glob patterns 自由定义复制规则

## 安装

``` 
yarn add globby-copy-promise 
//or 
npm install globby-copy-promise 
```

## 使用   

``` js
import copy from 'globby-copy-promise'
// in async method
await copy(['**/*.js', '!**/node_modeuls/**/*'], '/home/temp')
```

## cli模式

``` shell
npm i -g globby-copy-promise

globby-copy '**/*.js' '!**/node_modeuls/**/*' -d='/home/temp'
```

 
