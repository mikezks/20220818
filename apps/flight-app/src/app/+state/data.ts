import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';


export interface DataPassenger {
  id: number;
  firstName: string;
  name: string;
}

const entityMetadata: EntityMetadataMap = {
  Passenger: {
    selectId: (p: DataPassenger) => p.id
  }
};

export const pluralNames = {
  Passenger: 'passenger'
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

export const defaultDataServiceConfig = {
  root: 'http://www.angular.at/api'
};
