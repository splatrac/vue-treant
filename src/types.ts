export interface ContextMenuItem {
  label: string;
  icon?: string;
  action: () => void;
}

export interface Node {
  title: string;
  id?: string;
  children?: Node[];
  expanded?: boolean;
  active?: boolean;
  context?: any;
  parentId?: string;
  [key: string]: any;
}

export type ExpandNode = (id?: string) => void;
export type ActivateNode = (id: string, active: boolean) => void;
export type AddNode = (parentId: string, node?: Partial<Node>) => void;
