# build-time-info
一个打包后可查看版本时间等信息
## 快速使用
```shell
npm i build-time-info -D

```

```js
import buildInfo, { buildFn, buildTime } from 'build-time-info'

console.log(buildInfo)
console.log(buildTime)
// 构建时间:3/9/2023, 12:11:32 PM;构建人:xxx;分支:master;最后提交msg:xxx;最后提交时间:2023-02-17 09:34:29;最后提交commitId:xxx;
console.log(buildFn)
/**
 * {
    buildTime,
    publishPerson,
    branch,
    lastSubmitTxt,
    lastSubmitTime,
    lastId,
  }
 */

// or
const buildInfo = require('build-time-info')

```
