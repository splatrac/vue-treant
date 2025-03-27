<template>
  <div id="treemain">
    <Tree :data="treeNodes" @on-node-activate="activateNode" @on-node-expand="expandNode" />
    <!-- <ContextMenu :isVisible="true" :menuItems="contextMenu"></ContextMenu> -->
  </div>
</template>

<script setup lang="ts">
import { reactive, provide, ref } from 'vue';
import Tree from './Tree.vue'; // Your recursive tree component
// import ContextMenu from './ContextMenu.vue';
import { addProperties, findNode } from '../helpers'; // Your utility function to add properties

const props = defineProps<{
  data: any[]
  contextMenu: any[]
}>()

const emit = defineEmits(['onNodeExpand', 'onNodeActivate'])
const showMenu = ref(false)

// Initialize tree nodes with properties
const initializeNodes = (nodes: any[]) => {
  return nodes.map(addProperties);
};

const treeNodes = reactive(initializeNodes(props.data))

// Event handlers
const expandNode = (id: string) => {
  const node = findNode(id, treeNodes)

  node.expanded = !node.expanded
  emit('onNodeExpand', id, node.expanded)
};

const activateNode = (id: string, active: boolean) => {
  emit('onNodeActivate', id, active)
};

const activateContextMenu = (active: boolean) => {
  showMenu.value = active
}

provide('activateTreeNode', activateNode)
provide('expandNode', expandNode)
provide('activateContextMenu', activateContextMenu)

</script>
