export interface Node {
    title: string;
    id?: string;
    children?: Node[];
    expanded?: boolean;
    active?: boolean;
}
