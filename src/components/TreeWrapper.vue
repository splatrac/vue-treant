<template>
    <div id="treemain">
        <Tree :data="treeNodes" @activate="activateNode" @on-node-expand="expandNode" />
    </div>
</template>

<script setup lang="ts">
import { reactive, provide } from 'vue';
import Tree from './Tree.vue'; // Your recursive tree component
import { addProperties, findNode } from '../helpers'; // Your utility function to add properties

const props = defineProps<{ data: any[] }>()
const emit = defineEmits(['onNodeExpand', 'onNodeActivate'])

// Initialize tree nodes with properties
const initializeNodes = (nodes: any[]) => {
    return nodes.map(addProperties);
};

const treeNodes = reactive(initializeNodes(props.data))

// Event handlers
const expandNode = (id: any) => {
    const node = findNode(id, treeNodes)

    node.expanded = !node.expanded
    emit('onNodeExpand', id, node.expanded)
};

const activateNode = (id: string, active: boolean) => {
    emit('onNodeActivate', id, active)
};

provide('activateNode', activateNode)
provide('expandNode', expandNode)
</script>
