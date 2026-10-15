<template>
  <ul class="ptree">
    <template v-for="node in props.data" :key="node.id">
      <li class="container">
        <TreeNode :id="node.id" :active="node.active">
          <template #left-control>
            <a v-if="node.children?.length" @click.prevent="expandNode(node.id)" class="node-control fold-control" role="button" aria-label="Toggle expand">
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
const props = withDefaults(defineProps<{
  data: Node[],
  expanded?: boolean
}>(), {
  expanded: false
})

const activateNode: ActivateNode = (id: string, isActive: boolean) => {
  const node = findById(props.data, id)
  if (node) {
    toggleActive(node, isActive)
  }
}

function findById(obj: any, targetId: string): Node | null {
  if (typeof obj === 'object' && obj !== null) {
    if (obj.id === targetId) {
      return obj
    }
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        const result = findById(obj[i], targetId)
        if (result) return result
      }
    } else {
      for (let key in obj) {
        if (key === 'children' || key === 'data') {
          const result = findById(obj[key], targetId)
          if (result) return result
        } else if (typeof obj[key] === 'object') {
          const result = findById(obj[key], targetId)
          if (result) return result
        }
      }
    }
  }
  return null
}

function toggleActive(obj: any, shouldActivate: boolean) {
  if (Array.isArray(obj)) {
    for (let item of obj) {
      toggleActive(item, shouldActivate)
    }
  } else if (typeof obj === 'object' && obj !== null) {
    if (Object.prototype.hasOwnProperty.call(obj, 'active')) {
      obj.active = shouldActivate
    }
    for (let key in obj) {
      if (key === 'children') {
        toggleActive(obj[key], shouldActivate)
      }
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
