import { Node } from './types'
import { uuid } from 'vue-uuid'

function addProperties(node: Node): Node {
  const updatedNode: Node = {
    ...node,
    active: node.active ?? false,
    children: node.children ? node.children.map(addProperties) : [],
    id: node.id ?? uuid.v4()
  }

  if (Array.isArray(node.children) && node.children.length > 0) {
    updatedNode.expanded = node.expanded ?? false
  }

  return updatedNode
}

function findNode(id: string, array: Node[]): Node | undefined {
  for (const node of array) {
    if (node.id === id) return node
    if (node.children) {
      const child = findNode(id, node.children)
      if (child) return child
    }
  }
  return undefined
}

export { addProperties, findNode }
