<template>
    <ul id="treemain" class="ptree">
        <template v-for="node in treeNodes" :key="node.title">
            <li class="container">
                <TreeNode :id="node.id" :hasChildren="Object.hasOwn(node, 'children')" @expand="expandNode(node)">
                    <template #title>
                        {{ node.title }}
                    </template>
                </TreeNode>
                <Tree v-if="node.children" v-show="node.expanded" :data="node.children" />
            </li>
        </template>
    </ul>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import TreeNode from './Node.vue'
import { Node } from '../types'

const props = defineProps<{ data: Node[] }>()
const treeNodes = reactive(props.data)
const expandNode = (node: Node) => {
    node.expanded = !node.expanded
}

</script>
<style scoped>
.ptree li {
    list-style-type: none;
}

.ptree .menuIcon {
    color: black;
}

.ptree .drag-handler {
    color: #ef5350;
}

.ptree .drag-handler i {
    pointer-events: none;
}

.ptree {
    height: 100%;
}

.disabled>* {
    pointer-events: none;
}

.ptreemenuCont i {
    pointer-events: none;
}

.ptree ul.not-active {
    max-height: 0;
    transition: max-height 0.25s ease-out;
    overflow: hidden;
}

.dragging-element li {
    border: 0px !important;
}

.ptree::-webkit-scrollbar {
    width: 2px !important;
}

.ptree::-webkit-scrollbar-track {
    background: whitesmoke !important;
}

.ptree::-webkit-scrollbar-thumb {
    background: grey !important;
}

/* fixes menu click event problem */
.menuIcon>svg {
    pointer-events: none;
}
</style>
