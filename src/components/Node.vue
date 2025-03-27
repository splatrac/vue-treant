<template>
  <div class="node">
    <slot name="left-control" class="fold-control node-control"></slot>
    <span class="title">
      <slot name="title"></slot>
    </span>
    <label class="switch">
      <input type="checkbox" v-model="active" value="1" @change="handleToggle">
      <span class="slider round"></span>
    </label>
    <a class="context-menu node-control" @click="$emit('activateContextMenu')">
      <IconMore class="menuIcon" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, watch } from 'vue'
// import { Node } from '../types'
import { uuid } from 'vue-uuid'
import IconMore from './icons/IconMore.vue';
import { ActivateNode } from '../types';


const activateTreeNode = inject<ActivateNode>('activateTreeNode', () => {
  throw new Error('activateTreeNode injection failed')
})

interface NodeProps {
  id?: string,
  active?: boolean,
}

const props = withDefaults(defineProps<NodeProps>(), {
  id: uuid.v1(),
  active: false,
})

const active = ref(props.active)
const emit = defineEmits(['activateContextMenu'])
const activateNode = inject<ActivateNode>('activateNode', () => {
  throw new Error('activateNode injection failed')
})

const handleToggle = (event: Event) => {
  const target = event.target as HTMLInputElement
  active.value = target.checked
}

watch(() => props.active, (newValue) => {
  // The props.active changes only on the children
  if (newValue !== active.value) {
    active.value = newValue
  }

}, { immediate: true })

watch(active, (newValue) => {
  // When this changes alone, it means the node is a parent node
  if (newValue !== props.active) {
    activateNode(props.id, newValue)
  }
  activateTreeNode(props.id, newValue)
})

</script>


<style scoped>
.node {
  background-color: white;
  align-items: center;
  display: flex;
  padding: 5px;
  margin: 2px;
  border-radius: 5px;
}

.title {
  color: #2d2d2d;
  margin: 1px auto auto 6px;
  text-align: left;
}


.context-menu {
  line-height: 0;
  cursor: pointer;
}

.switch {
  position: relative;
  display: inline-block;
  height: 15px;
  padding-inline: 18px;
  margin-left: 12px;
  width: auto;
}

.switch input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

input:checked+.slider {
  background-color: #66bb6a;
}

input:checked+.slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}

.slider {
  position: absolute;
  cursor: pointer;
  max-width: 35px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 13px;
  left: 1px;
  top: 1px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.node-control {
  color: #2d2d2d;
  font-size: 14px;
  font-family: monospace, "Open Sans";
  text-decoration: none;
}

.fold-control {
  margin: auto 0 0px 6px;
  cursor: pointer;
}
</style>
