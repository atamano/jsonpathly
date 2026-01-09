import { expect } from 'chai';
import * as path from 'path';
import * as fs from 'fs';
import { createRequire } from 'module';

// Use process.cwd() - tests are always run from project root
const projectRoot = process.cwd();

// Create require function that works in both ESM and CJS
const requireCjs = createRequire(import.meta.url);

describe('Module Resolution (Issue #9)', () => {
  const distPath = path.join(projectRoot, 'dist');
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8')
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

    it('should have index.d.mts for ESM types', () => {
      expect(fs.existsSync(path.join(distPath, 'index.d.mts'))).to.be.true;
    });

    it('should have source maps', () => {
      expect(fs.existsSync(path.join(distPath, 'index.cjs.map'))).to.be.true;
      expect(fs.existsSync(path.join(distPath, 'index.mjs.map'))).to.be.true;
    });

    it('should NOT have platform-specific files', () => {
      expect(fs.existsSync(path.join(distPath, 'index.node.cjs'))).to.be.false;
      expect(fs.existsSync(path.join(distPath, 'index.node.mjs'))).to.be.false;
      expect(fs.existsSync(path.join(distPath, 'index.web.cjs'))).to.be.false;
      expect(fs.existsSync(path.join(distPath, 'index.web.mjs'))).to.be.false;
    });
  });

  describe('type declarations', () => {
    it('should export all public APIs', () => {
      const dts = fs.readFileSync(path.join(distPath, 'index.d.ts'), 'utf8');
      // tsup bundles exports at the end
      expect(dts).to.include('export {');
      expect(dts).to.include('query');
      expect(dts).to.include('paths');
      expect(dts).to.include('parse');
      expect(dts).to.include('stringify');
      expect(dts).to.include('JSONPathSyntaxError');
    });

    it('should include function/const declarations', () => {
      const dts = fs.readFileSync(path.join(distPath, 'index.d.ts'), 'utf8');
      // tsup may declare as const or function depending on export style
      expect(dts).to.match(/declare (function|const) query/);
      expect(dts).to.match(/declare (function|const) paths/);
      expect(dts).to.include('declare function parse');
      expect(dts).to.include('declare function stringify');
      expect(dts).to.include('declare class JSONPathSyntaxError');
    });
  });

  describe('package.json exports', () => {
    it('should have flat exports structure (not nested node/browser)', () => {
      const exports = packageJson.exports['.'];
      expect(exports).to.have.property('types', './dist/index.d.ts');
      expect(exports).to.have.property('browser', './dist/index.mjs');
      expect(exports).to.have.property('import', './dist/index.mjs');
      expect(exports).to.have.property('require', './dist/index.cjs');
      expect(exports).to.not.have.property('node');
    });

    it('should have correct main field', () => {
      expect(packageJson.main).to.equal('dist/index.cjs');
    });

    it('should have correct module field', () => {
      expect(packageJson.module).to.equal('dist/index.mjs');
    });

    it('should have correct browser field', () => {
      expect(packageJson.browser).to.equal('dist/index.mjs');
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
      const cjs = requireCjs('../dist/index.cjs');
      expect(typeof cjs.query).to.equal('function');
      expect(typeof cjs.paths).to.equal('function');
      expect(typeof cjs.parse).to.equal('function');
      expect(typeof cjs.stringify).to.equal('function');
      expect(typeof cjs.JSONPathSyntaxError).to.equal('function');
    });

    it('should work with query from CJS', () => {
      const { query } = requireCjs('../dist/index.cjs');
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

  describe('build functionality', () => {
    it('should handle complex queries in CJS build', () => {
      const { query } = requireCjs('../dist/index.cjs');
      const data = {
        store: {
          book: [
            { title: 'Book 1', price: 10 },
            { title: 'Book 2', price: 20 },
          ],
        },
      };
      // Filter queries return arrays
      expect(query(data, '$.store.book[?(@.price < 15)].title')).to.deep.equal(['Book 1']);
      expect(query(data, '$.store.book[*].price')).to.deep.equal([10, 20]);
      // Direct property access returns single value
      expect(query(data, '$.store.book[0].title')).to.equal('Book 1');
    });

    it('should handle complex queries in ESM build', async () => {
      const { query } = await import('../dist/index.mjs');
      const data = {
        store: {
          book: [
            { title: 'Book 1', price: 10 },
            { title: 'Book 2', price: 20 },
          ],
        },
      };
      // Filter queries return arrays
      expect(query(data, '$.store.book[?(@.price < 15)].title')).to.deep.equal(['Book 1']);
      expect(query(data, '$.store.book[*].price')).to.deep.equal([10, 20]);
      // Direct property access returns single value
      expect(query(data, '$.store.book[0].title')).to.equal('Book 1');
    });

    it('should handle RFC 9535 functions in CJS build', () => {
      const { query } = requireCjs('../dist/index.cjs');
      const data = [{ name: 'hello' }, { name: 'world' }];
      expect(query(data, '$[?(match(@.name, "hel.*"))]')).to.deep.equal([{ name: 'hello' }]);
      expect(query(data, '$[?(length(@.name) == 5)]')).to.deep.equal(data);
    });

    it('should handle RFC 9535 functions in ESM build', async () => {
      const { query } = await import('../dist/index.mjs');
      const data = [{ name: 'hello' }, { name: 'world' }];
      expect(query(data, '$[?(match(@.name, "hel.*"))]')).to.deep.equal([{ name: 'hello' }]);
      expect(query(data, '$[?(length(@.name) == 5)]')).to.deep.equal(data);
    });

    it('should parse and stringify round-trip in CJS build', () => {
      const { parse, stringify } = requireCjs('../dist/index.cjs');
      const path = "$.store.book[?(@.price < 10)].title";
      const ast = parse(path);
      expect(stringify(ast)).to.equal(path);
    });

    it('should parse and stringify round-trip in ESM build', async () => {
      const { parse, stringify } = await import('../dist/index.mjs');
      const path = "$.store.book[?(@.price < 10)].title";
      const ast = parse(path);
      expect(stringify(ast)).to.equal(path);
    });

    it('should throw JSONPathSyntaxError for invalid paths in CJS', () => {
      const { parse, JSONPathSyntaxError } = requireCjs('../dist/index.cjs');
      expect(() => parse('$[invalid')).to.throw(JSONPathSyntaxError);
    });

    it('should throw JSONPathSyntaxError for invalid paths in ESM', async () => {
      const { parse, JSONPathSyntaxError } = await import('../dist/index.mjs');
      expect(() => parse('$[invalid')).to.throw(JSONPathSyntaxError);
    });

    it('should return paths in CJS build', () => {
      const { paths } = requireCjs('../dist/index.cjs');
      const data = { a: { b: 1 } };
      expect(paths(data, '$.a.b')).to.deep.equal(["$['a']['b']"]);
    });

    it('should return paths in ESM build', async () => {
      const { paths } = await import('../dist/index.mjs');
      const data = { a: { b: 1 } };
      expect(paths(data, '$.a.b')).to.deep.equal(["$['a']['b']"]);
    });
  });
});
