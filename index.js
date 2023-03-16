'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var execa = require('execa');

const defaultIdLog = 'git rev-parse HEAD';
const defaultBranchLog = 'git symbolic-ref --short HEAD';
function getGitCommitInfo (sign, commitId) {
  const log = `git log --pretty=format:"${sign}" ${commitId} -1`;
  return execa.shellSync(log).stdout;
}
function getGitInfo (idLog = defaultIdLog) {
  try {
    const lastId = execa.shellSync(idLog).stdout;
    const branch = execa.shellSync(defaultBranchLog).stdout;
    const lastSubmitTxt = getGitCommitInfo('%s', lastId);
    const lastSubmitTime = getGitCommitInfo('%cd', lastId);
    const publishPerson = getGitCommitInfo('%an', lastId);
    return {
      lastId,
      branch,
      lastSubmitTxt,
      lastSubmitTime,
      publishPerson,
    };
  } catch (error) {
    console.log('BuildTime Plugin Err', error);
    return {};
  }
}
const {
  lastId,
  branch,
  lastSubmitTxt,
  lastSubmitTime,
  publishPerson,
} = getGitInfo();
const time = new Date().toLocaleString();
const buildTime = `构建时间:${time};构建人:${publishPerson};分支:${branch};最后提交msg:${lastSubmitTxt.trim()};最后提交时间:${lastSubmitTime};最后提交commitId:${lastId};`;
const buildFn = () => {
  return {
    buildTime: time,
    publishPerson,
    branch,
    lastSubmitTxt,
    lastSubmitTime,
    lastId,
  };
};

exports.buildFn = buildFn;
exports.buildTime = buildTime;
exports.default = buildTime;
