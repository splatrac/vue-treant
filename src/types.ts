export interface Node {
  title: string;
  id?: string;
  children?: Node[];
  expanded?: boolean;
  active?: boolean;
  context?: any;
}

export type ExpandNode = (_id?: string) => void;
export type ActivateNode = (id: string, active: boolean) => void;
