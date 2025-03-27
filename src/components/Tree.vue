<template>
  <ul class="ptree">
    <template v-for="node in props.data" :key="node.id">
      <li class="container">
        <TreeNode :id="node.id" :active="node.active">
          <template #left-control v-if="node.children?.length">
            <a @click.prevent="expandNode(node.id)" class="node-control fold-control">
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
import { provide, inject } from 'vue'
import IconPlus from './icons/IconPlus.vue'
import IconMinus from './icons/IconMinus.vue'
import TreeNode from './Node.vue'
import { Node, ExpandNode, ActivateNode } from '../types'


const expandNode = inject<ExpandNode>('expandNode')!
const emit = defineEmits(['onNodeExpand'])
const props = withDefaults(defineProps<{
  data: Node[],
  expanded?: boolean
}>(), {
  expanded: false
})

const activateNode: ActivateNode = (id: string, isActive: boolean) => {
  const parent = findById(props.data, id)
  toggleActive(parent, isActive)
}

function findById(obj: any, targetId: string): Node | null {
  // If the object is an object (and not null), check its properties
  if (typeof obj === 'object' && obj !== null) {
    // Check if the current object has the target id
    if (obj.id === targetId) {
      return obj; // Return the object if the id matches
    }
    // Recursively search in nested objects
    for (let key in obj) {
      const result = findById(obj[key], targetId);
      if (result) return result; // Return the result if found
    }
  }
  // Return null if the object is not found
  return null;
}

function toggleActive(obj: any, shouldActivate: boolean) {
  // If the object is an array, iterate through its elements
  if (Array.isArray(obj)) {
    for (let item of obj) {
      toggleActive(item, shouldActivate); // Recursively toggle for each item
    }
  }
  // If the object is an object (and not null), update its properties
  else if (typeof obj === 'object' && obj !== null) {
    // Toggle the `active` property if it exists
    if (obj.hasOwnProperty('active')) {
      obj.active = shouldActivate;
    }
    // Recursively toggle for nested objects
    for (let key in obj) {
      toggleActive(obj[key], shouldActivate);
    }
  }
}

provide('activateNode', activateNode)
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
