export interface JODOptions {
  outputNameMappings?: {
    type?: string;
    path?: string;
    before?: string;
    after?: string;
  };
  outputDiffTypeMappings?: {
    replace?: string;
    delete?: string;
    add?: string;
  };
  outputDiffKeyPathType?: 'string' | 'array';
}

export type KeyPathGroupType = 'intersection'| 'delete' | 'add';
