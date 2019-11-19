/* Copyright 2019- Paul Brewer, Economic and Financial Technology Consulting LLC */
/* This file is open source software.  The MIT License applies to this software. */

/* eslint-disable no-console */
import openZip from "single-market-robot-simulator-openzip";
import { StudyFolder } from "single-market-robot-simulator-db-studyfolder";

export class StudyFolderForZip extends StudyFolder {

  constructor(props){
    super(props);
    if (!this.zipPromise) throw new Error("StudyFolderForZip: zipPromise required");
    if (!this.zipName) throw new Error("StudyFolderForZip: zipName required");
    this.readOnly = true;
    if (!this.name) this.name = "External .zip file "+this.zipName;
    if (!this.description) this.description = '';
  }

  async getConfig(){
    const folder = this;
    if (!folder.config){
      const data = await openZip(this.zipPromise);
      if (!data.config)
        throw new Error("zip file does not contain config.json");
      folder.config = data.config;
    }
    const config = folder.config;
    return {folder, config};
  }

  async setConfig(){
    throw new Error("cannot setConfig, zip-based study folder is read only");
  }

  async search(name){
    if ((name===this.zipName) || (name===undefined)){
      return [
        {
          id: 1,
          name: this.zipName,
          mimeType: 'application/zip'
        }
      ];
    }
    return [];
  }

  async download({name, id}){
    if ((name===this.zipName) || (id===1)){
      return this.zipPromise;
    }
    throw new Error("StudyFolderForZip: file not found");
  }
}
