<template>
    <ul class="ptree">
        <template v-for="node in props.data" :key="node.id">
            <li class="container">
                <TreeNode :id="node.id">
                    <template #left-control v-if="node.children?.length">
                        <a @click.prevent="node.id ? expandNode(node.id) : null" class="node-control fold-control">
                            <IconPlus v-show="!node.expanded" />
                            <IconMinus v-show="node.expanded" />
                        </a>
                    </template>
                    <template #title>
                        {{ node.title }}
                    </template>
                </TreeNode>
                <Tree v-if="node.children?.length" v-show="node.expanded" :data="node.children" />
            </li>
        </template>
    </ul>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import IconPlus from './icons/IconPlus.vue'
import IconMinus from './icons/IconMinus.vue'
import TreeNode from './Node.vue'
import { Node, ExpandNode } from '../types'

const expandNode = inject<ExpandNode>('expandNode')!
const emit = defineEmits(['onNodeExpand', 'onNodeActivate'])
const props = withDefaults(defineProps<{
    data: Node[],
    expanded?: boolean
}>(), {
    expanded: false
})


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


.fold-control {
    margin: auto 0 0px 6px;
    cursor: pointer;
}

.node-control {
    color: #2d2d2d;
    font-size: 14px;
    font-family: monospace, "Open Sans";
    text-decoration: none;
}
</style>
