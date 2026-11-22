const { packager } = require('@electron/packager');

async function main() {
  if (process.platform !== 'darwin' || !['arm64', 'x64'].includes(process.arch)) {
    throw new Error('Build macOS trên máy Mac arm64 hoặc x64.');
  }

  const included = new Set([
    'main.cjs', 'preload.cjs', 'storage.cjs', 'catalog.cjs', 'package.json',
  ]);

  await packager({
    dir: __dirname,
    name: 'SN AI LIVE STUDIO',
    appBundleId: 'vn.sngroup.sn-ai-live-studio',
    platform: 'darwin',
    arch: process.arch,
    out: 'mac-release',
    overwrite: true,
    asar: true,
    ignore: path => path !== '' && !path.startsWith('/dist/') &&
      path !== '/dist' && !included.has(path.slice(1)),
    prune: false,
  });
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
