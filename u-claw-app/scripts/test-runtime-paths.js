const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const { findNodeBinary, runtimeDirNames } = require('../src/runtime-paths');

assert.deepStrictEqual(runtimeDirNames('darwin', 'arm64'), ['node-mac-arm64', 'node-darwin-arm64']);
assert.deepStrictEqual(runtimeDirNames('darwin', 'x64'), [
  'node-mac-x64',
  'node-mac-x86_64',
  'node-darwin-x64',
  'node-darwin-x86_64',
]);
assert.deepStrictEqual(runtimeDirNames('win32', 'x64'), [
  'node-win-x64',
  'node-win-x86_64',
  'node-win32-x64',
  'node-win32-x86_64',
]);

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'sg-claw-runtime-'));
try {
  const macNode = path.join(tempRoot, 'node-mac-arm64', 'bin', 'node');
  fs.mkdirSync(path.dirname(macNode), { recursive: true });
  fs.writeFileSync(macNode, '');
  assert.strictEqual(findNodeBinary(tempRoot, 'darwin', 'arm64'), macNode);

  const winNode = path.join(tempRoot, 'node-win-x64', 'node.exe');
  fs.mkdirSync(path.dirname(winNode), { recursive: true });
  fs.writeFileSync(winNode, '');
  assert.strictEqual(findNodeBinary(tempRoot, 'win32', 'x64'), winNode);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}

console.log('runtime path tests passed');
