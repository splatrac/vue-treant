export interface Node {
    title: string;
    children?: Node[];
    expanded?: boolean;
    active?: boolean;
}
