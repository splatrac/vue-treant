<script setup lang="ts">
import VueTreant from './components/TreeWrapper.vue'
import { Node } from './types'
import treantLogo from './assets/logo.png'


const callback1 = () => {
  alert('callback1')
}

const callback2 = () => {
  alert('callback2')
}

const contextMenu1 = [
  {
    label: 'entry1',
    icon: 'icon1',
    action: callback1
  },
  {
    label: 'entry2',
    icon: 'icon2',
    action: callback2
  }
]

const treeData: Node[] = [{
  title: 'Root',
  id: 'root',
  children: [
    {
      title: 'Node 1',
      id: 'node_1',
      children: [
        { title: 'Node 1.1', id: 'node_1_1', context: contextMenu1 },
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
  <img :src="treantLogo" class="logo" />
  <VueTreant id="tree" class="tree-wrapper" ref="vueTreant" :data="treeData" @on-node-expand="handleExpand"
    @on-node-activate="handleActivate" :contextMenu="contextMenu1" />
</template>

<style scoped>
#tree {
  align-items: center;
  margin-left: auto;
  margin-right: auto;

}

.logo {
  height: 10em;
  padding: 1.2em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #98de5e);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #98de5e);
}
</style>
