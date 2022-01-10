import {Country} from "./country";
import {User} from "./User";
import {WorkFlowState} from "./workflowstate";

export class Intervention {
  constructor(public id?:number,
              public codeOfTheInter?: string | null,
              public shortName?: string,
              public officialInterName?: string | null,
              public country?: Country,
              public status?: WorkFlowState,
              public lastUpdatedBy?: User | null,
              public interDescription?: string | null,
              public from?: string,
              public to?: string,
              public lastUpdatedOn?:number) {
  }
}
