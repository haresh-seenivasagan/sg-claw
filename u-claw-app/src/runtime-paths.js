const fs = require('fs');
const path = require('path');

function runtimeDirNames(platform, arch) {
  const archNames = arch === 'x64' ? ['x64', 'x86_64'] : [arch];
  let platformNames;

  if (platform === 'darwin') {
    platformNames = ['mac', 'darwin'];
  } else if (platform === 'win32') {
    platformNames = ['win', 'win32'];
  } else {
    platformNames = [platform];
  }

  const names = [];
  for (const platformName of platformNames) {
    for (const archName of archNames) {
      names.push(`node-${platformName}-${archName}`);
    }
  }
  return names;
}

function nodeExecutableForRuntime(runtimeDir, platform) {
  return platform === 'win32'
    ? path.join(runtimeDir, 'node.exe')
    : path.join(runtimeDir, 'bin', 'node');
}

function findNodeBinary(runtimeRoot, platform = process.platform, arch = process.arch) {
  for (const dirName of runtimeDirNames(platform, arch)) {
    const candidate = nodeExecutableForRuntime(path.join(runtimeRoot, dirName), platform);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

module.exports = {
  findNodeBinary,
  runtimeDirNames,
};
