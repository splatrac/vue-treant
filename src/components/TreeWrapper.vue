<template>
  <div id="treemain">
    <Tree :data="treeNodes" @on-node-activate="onNodeActivate" @on-node-expand="onNodeExpand" />
  </div>
</template>

<script setup lang="ts">
import { reactive, provide } from 'vue';
import Tree from './Tree.vue';
import { addProperties, findNode } from '../helpers';
import { Node, ActivateNode, ExpandNode } from '../types';

const props = defineProps<{
  data?: Node[]
  node?: Node[]
  contextMenu?: any[]
}>()

const emit = defineEmits(['onNodeExpand', 'onNodeActivate', 'node-expand', 'node-activate'])

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

const onNodeExpand = expandNode as ExpandNode
const onNodeActivate = activateNode

provide('activateTreeNode', activateNode)
provide('expandNode', expandNode)

</script>
