const execa = require('execa')
let lastId = '';
let branch = '';
let lastSubmitTime = '';
let lastSubmitTxt = '';
let publishPerson = '';
try {
  lastId = execa.shellSync('git rev-parse HEAD').stdout;
  branch = execa.shellSync('git symbolic-ref --short HEAD').stdout;
  const lastSubmit = execa.shellSync(`git log -1 --date=iso ${branch}`).stdout;
  const gitInfo = execa.shellSync(`git config --list`).stdout;
  lastSubmitTime = lastSubmit.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/g)[0];
  const lastSubmitMatch = lastSubmit.match(/\[?(Feature|BugFix|feat|fix|chore|docs|style|revert|refactor|perf|test)\]?.*/g)
  lastSubmitTxt = lastSubmitMatch ? lastSubmitMatch[0] : '';
  publishPerson = gitInfo.match(/(?<=user.name=)(.*)/g)[0];
} catch (error) {
}
const time = new Date().toLocaleString()
const buildTime = `构建时间:${time};构建人:${publishPerson};分支:${branch};最后提交msg:${lastSubmitTxt};最后提交时间:${lastSubmitTime};最后提交commitId:${lastId};`
console.log(buildTime)
