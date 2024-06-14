import { Byte } from "@angular/compiler/src/util";


export interface MenuItem {
  id?: number;
  label?: string;
  icon?: string;
  link?: string;
  expanded?: boolean;
  subItems?: any;
  isTitle?: boolean;
  badge?: any;
  parentId?: number;
}

export interface Profile{
  Role_Id_FK?: string;
  Rolename?: string;
  Inactive?: string;
  FirstName?: string;
  LastName?: string;
  Gender?: string;
  DOB?: Date;
  Imagename?: string;
  IsEnabled?: boolean;
  Remarks?: string;
  Imagebyte?: Byte[];
}