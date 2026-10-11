<template>
  <div class="context-menu" v-show="isVisible" :style="{ top: props.top + 'px', left: props.left + 'px' }">
    <ul>
      <li v-for="item in menuItems" :key="item.label" @click="item.action" class="menu-item">
        <component :is="item.icon" v-if="item.icon" class="icon"></component>
        <span class="label">{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ContextMenuItem } from '../types'

interface Props {
  menuItems: ContextMenuItem[]
  top: number
  left: number
  isVisible: boolean
}

const props = defineProps<Props>()
</script>

<style></style>
