export interface Node {
    title: string;
    children?: Node[];
    isExpanded?: boolean;
    isActive?: boolean;
}
