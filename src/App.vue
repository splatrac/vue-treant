<script setup lang="ts">
import VueTreant from './components/TreeWrapper.vue'
import { Node } from './types'


const treeData: Node[] = [{
    title: 'Root',
    id: 'root',
    children: [
        {
            title: 'Node 1',
            id: 'node_1',
            children: [
                { title: 'Node 1.1', id: 'node_1_1' },
                { title: 'Node 1.2', id: 'node_1_2', children: [{ title: 'Node 1.2.1', id: 'node_1_2_1' }] },
            ]
        },
        {
            title: 'Node 2',
            id: 'node_2',
            children: [
                { title: 'Node 2.1' },
                { title: 'Node 2.2' }
            ]
        }
    ]
},
{ title: 'Other', id: 'other' }
]


const handleExpand = (id: string, isExpanded: boolean) => {
    // TODO: Goal is to print successfuly for every node
    console.debug(`Node '${id}' expanded = ${isExpanded}`)
}

const handleActivate = (id: string, isActive: boolean) => {
    // TODO: Goal is to print successfuly for every node
    console.debug(`Node '${id}' activated = ${isActive}`)
}
</script>

<template>
    <h1>Vue Treant</h1>
    <VueTreant ref="vueTreant" :data="treeData" @on-node-expand="handleExpand" @on-node-activate="handleActivate" />
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
