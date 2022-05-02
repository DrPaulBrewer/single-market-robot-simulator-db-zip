/* eslint-env node, mocha */

// Copyright 2022 Paul Brewer
// Economic and Financial Technology Consulting LLC
// Open Source License: MIT License

// import assert from 'assert';
import 'should';
import {StudyFolderForZip} from '../src/index.mjs';
import fsPromises from 'fs/promises';
const latin1 = {encoding: 'latin1'};

function testZipExists(zipFileName){
  it('Prerequisite:  input zip file should exist and be accessible', async ()=>{
    const zipdata = await fsPromises.readFile(zipFileName, latin1);
    // encoding:latin1 is best encoding to stringify binary data
    zipdata.should.be.type('string');
    return zipdata.length.should.be.above(10);
  });
}

describe('StudyFolderForZip', ()=>{
  it('constructor should be a function', ()=>{
    StudyFolderForZip.should.be.type('function');
  });

  it('constructor should throw error if properties unsupplied', ()=>{
    function bad(){
      new StudyFolderForZip();
    }
    bad.should.throw();
  });

  it('constructor should throw error if zipName unsupplied', ()=>{
    function bad(){
      const param = {
        zipPromise: Promise.resolve({})
      };
      new StudyFolderForZip(param);
    }
    bad.should.throw(/zipName/);
  });;

  describe('constructor defaults', ()=>{
    let zipPromise = Promise.resolve({});
    let zipName = 'zipName';
    it('constructor accepts name parameter', ()=>{
      const param = {zipPromise,zipName,name:'Hello'};
      const f = new StudyFolderForZip(param);
      f.name.should.deepEqual('Hello');
    });
    it('constructor creates a default name', ()=>{
      const f = new StudyFolderForZip({zipPromise,zipName});
      f.name.should.be.type('string');
      f.name.length.should.be.above(0);
    });
  });
  describe('.getConfig', ()=>{
    it('should pass existing folder.config', async ()=>{
      const zipPromise = Promise.resolve({});
      const zipName = 'zipName';
      const f = new StudyFolderForZip({zipPromise,zipName});
      f.config = {b:52};
      const result = await f.getConfig();
      result.should.deepEqual({b:52});
    });
  });
  describe('.search', ()=>{
    it('should perform as expected', async ()=>{
      const zipPromise = Promise.resolve({});
      const zipName = 'zipName';
      const zipSize = 12345;
      const f1 = new StudyFolderForZip({zipPromise,zipName,zipSize});
      const expected1 = [
        {
          id: 1,
          name: zipName,
          mimeType: 'application/zip',
          size: zipSize
        }
      ];
      const result1A = await f1.search();
      result1A.should.deepEqual(expected1);
      const result1B = await f1.search(zipName);
      result1B.should.deepEqual(expected1);
      const result1C = await f1.search("nothere");
      result1C.should.deepEqual([]);
      const f2 = new StudyFolderForZip({zipPromise,zipName});
      const expected2 = [
        {
          id: 1,
          name: zipName,
          mimeType: 'application/zip',
          size: undefined
        }
      ];
      const result2 = await f2.search();
      result2.should.deepEqual(expected2);
    });
  });
  describe('.download', ()=>{
    let zipPromise, zipName, f;
    beforeEach(function(){
      zipPromise = Promise.resolve(42);
      zipName = 'zipname';
      f = new StudyFolderForZip({zipPromise,zipName});
    });
    [
      {id:1},
      {name:'zipname'}
    ].forEach((param)=>{
      it(`.download(${JSON.stringify(param)}) should resolve to zipPromise`, async ()=>{
        const result = await f.download(param);
        return result.should.equal(42);
      });
    });
    [
      {id:0},
      {name:'foo'}
    ].forEach((param)=>{
      it(`.download(${JSON.stringify(param)}) should be rejected `, async()=>{
        return f.download(param).should.be.rejectedWith('StudyFolderForZip: file not found');
      });
    });
  });
  describe('data extraction test with test/data/20201004T001600.zip', ()=>{
    const zipFileName = 'test/data/20201004T001600.zip'
    testZipExists(zipFileName);
    it('.getConfig matches test/config.json', async ()=>{
      const configText = await fsPromises.readFile('test/data/config.json', latin1);
      const expected = JSON.parse(configText);
      const zipPromise = fsPromises.readFile(zipFileName, latin1);
      const zipName = '20201004';
      const f = new StudyFolderForZip({zipPromise,zipName});
      const result = await f.getConfig();
      // these runtime properties can be different
      delete expected.common.periods;
      delete expected.common.withoutOrderLogs;
      delete result.common.periods;
      delete result.common.withoutOrderLogs;
      // everything else should match
      return result.should.deepEqual(expected);
    });
  });
  describe('data extraction test with test/data/noconfig.zip', ()=>{
    const zipFileName = 'test/data/noconfig.zip';
    testZipExists(zipFileName);
    it('.getConfig is rejected with error', async ()=>{
      const zipPromise = fsPromises.readFile(zipFileName, latin1);
      const zipName = 'bad';
      const f = new StudyFolderForZip({zipPromise,zipName});
      return f.getConfig().should.be.rejectedWith('zip file does not contain config.json');
    });
  });
});
