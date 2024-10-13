import { Node } from './types'
import { uuid } from 'vue-uuid'
// Adds missing properties recursively
function addProperties(node: Node): Node {
    const updatedNode = {
        ...node,
        active: node.active ?? false,
        children: node.children ? node.children.map(addProperties) : [],
        id: node.id ?? uuid.v4()
    }
    // Add expanded property only if the node has children
    if (Array.isArray(node.children) && node.children.length > 0) {
        updatedNode.expanded = false; // Set default value for expanded
    }

    return updatedNode
}

function findNode(id: string, array: Node[]): any {
    for (const node of array) {
        if (node.id === id) return node;
        if (node.children) {
            const child = findNode(id, node.children);
            if (child) return child;
        }
    }
}

export { addProperties, findNode }

