import { expect } from 'chai';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

describe('Module Resolution (Issue #9)', () => {
  const distPath = path.join(__dirname, '..', 'dist');
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')
  );

  describe('dist files exist', () => {
    it('should have index.cjs', () => {
      expect(fs.existsSync(path.join(distPath, 'index.cjs'))).to.be.true;
    });

    it('should have index.mjs', () => {
      expect(fs.existsSync(path.join(distPath, 'index.mjs'))).to.be.true;
    });

    it('should have index.d.ts', () => {
      expect(fs.existsSync(path.join(distPath, 'index.d.ts'))).to.be.true;
    });

    it('should NOT have platform-specific files', () => {
      expect(fs.existsSync(path.join(distPath, 'index.node.cjs'))).to.be.false;
      expect(fs.existsSync(path.join(distPath, 'index.node.mjs'))).to.be.false;
      expect(fs.existsSync(path.join(distPath, 'index.web.cjs'))).to.be.false;
      expect(fs.existsSync(path.join(distPath, 'index.web.mjs'))).to.be.false;
    });
  });

  describe('package.json exports', () => {
    it('should have flat exports structure (not nested node/browser)', () => {
      const exports = packageJson.exports['.'];
      expect(exports).to.have.property('types', './dist/index.d.ts');
      expect(exports).to.have.property('import', './dist/index.mjs');
      expect(exports).to.have.property('require', './dist/index.cjs');
      expect(exports).to.not.have.property('node');
      expect(exports).to.not.have.property('browser');
    });

    it('should have correct main field', () => {
      expect(packageJson.main).to.equal('dist/index.cjs');
    });

    it('should have correct module field', () => {
      expect(packageJson.module).to.equal('dist/index.mjs');
    });

    it('should have correct types field', () => {
      expect(packageJson.types).to.equal('dist/index.d.ts');
    });

    it('should have sideEffects false for tree-shaking', () => {
      expect(packageJson.sideEffects).to.equal(false);
    });
  });

  describe('CJS import', () => {
    it('should export all public APIs from CJS build', () => {
      const cjs = require('../dist/index.cjs');
      expect(typeof cjs.query).to.equal('function');
      expect(typeof cjs.paths).to.equal('function');
      expect(typeof cjs.parse).to.equal('function');
      expect(typeof cjs.stringify).to.equal('function');
      expect(typeof cjs.JSONPathSyntaxError).to.equal('function');
    });

    it('should work with query from CJS', () => {
      const { query } = require('../dist/index.cjs');
      const result = query({ a: 1 }, '$.a');
      expect(result).to.equal(1);
    });
  });

  describe('ESM import', () => {
    it('should export all public APIs from ESM build', async () => {
      const esm = await import('../dist/index.mjs');
      expect(typeof esm.query).to.equal('function');
      expect(typeof esm.paths).to.equal('function');
      expect(typeof esm.parse).to.equal('function');
      expect(typeof esm.stringify).to.equal('function');
      expect(typeof esm.JSONPathSyntaxError).to.equal('function');
    });

    it('should work with query from ESM', async () => {
      const { query } = await import('../dist/index.mjs');
      const result = query({ a: 1 }, '$.a');
      expect(result).to.equal(1);
    });
  });
});
