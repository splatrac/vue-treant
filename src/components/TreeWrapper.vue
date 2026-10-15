<template>
  <div id="treemain">
    <Tree :data="treeNodes" @on-node-activate="onNodeActivate" @on-node-expand="onNodeExpand" />
  </div>
</template>

<script setup lang="ts">
import { reactive, provide } from 'vue';
import { uuid } from 'vue-uuid'
import Tree from './Tree.vue';
import { addProperties, findNode } from '../helpers';
import { Node, ActivateNode, AddNode, ExpandNode } from '../types';

const props = defineProps<{
  data?: Node[]
  node?: Node[]
  contextMenu?: any[]
}>()

const emit = defineEmits(['onNodeExpand', 'onNodeActivate', 'node-expand', 'node-activate', 'onNodeAdd', 'node-add'])

const inputData = props.data ?? props.node ?? []

const initializeNodes = (nodes: Node[]) => {
  return nodes.map(addProperties);
};

const treeNodes = reactive(initializeNodes(inputData))

const expandNode = (id: string) => {
  const node = findNode(id, treeNodes)
  if (node) {
    node.expanded = !node.expanded
    emit('onNodeExpand', id, node.expanded)
    emit('node-expand', id, node.expanded)
  }
}

const activateNode: ActivateNode = (id: string, active: boolean) => {
  emit('onNodeActivate', id, active)
  emit('node-activate', id, active)
}

// Child-only add: the new node is appended as a child of an existing node.
// `parentId` must resolve to a node already in the tree; root-level adds are not supported.
const addNode: AddNode = (parentId, node = {}) => {
  const parent = findNode(parentId, treeNodes)
  if (!parent) return

  const newNode: Node = {
    ...node,
    title: node.title ?? 'New node',
    id: node.id ?? uuid.v4(),
    active: node.active ?? false,
    children: node.children ?? [],
    parentId,
  }

  parent.children = parent.children ?? []
  parent.children.push(newNode)

  emit('onNodeAdd', newNode, parentId)
  emit('node-add', newNode, parentId)
}

const onNodeExpand = expandNode as ExpandNode
const onNodeActivate = activateNode

provide('activateTreeNode', activateNode)
provide('expandNode', expandNode)
provide('addNode', addNode)

defineExpose({
  addNode,
})

</script>
