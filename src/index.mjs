/* Copyright 2019- Paul Brewer, Economic and Financial Technology Consulting LLC */
/* This file is open source software.  The MIT License applies to this software. */

import openZip from "single-market-robot-simulator-openzip";
import { StudyFolder } from "single-market-robot-simulator-db-studyfolder";

export class StudyFolderForZip extends StudyFolder {

  constructor(props){
    super(props);
    this.readOnly = true;
    if (!this.zipPromise) throw new Error("StudyFolderForZip: zipPromise required");
    if (!this.zipName) throw new Error("StudyFolderForZip: zipName required");
    if (!this.name) this.name = "External .zip file "+this.zipName;
  }

  async getConfig(){
    const folder = this;
    if (!folder.config){
      // openZip is time-consuming but can be avoided by supplying config to constructor
      // the openZip single-parameter call only unzips the config.json data
      const data = await openZip(this.zipPromise);
      if (!data.config)
        throw new Error("zip file does not contain config.json");
      folder.config = data.config;
    }
    const config = folder.config;
    return config;
  }

  async search(name){
    if ((name===this.zipName) || (name===undefined)){
      return [
        {
          id: 1,
          name: this.zipName,
          mimeType: 'application/zip',
          size: this.zipSize
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
