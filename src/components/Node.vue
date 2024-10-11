<script setup lang="ts">
import { ref } from 'vue'
import { Node } from '../types'
import IconPlus from './icons/IconPlus.vue'
import IconMinus from './icons/IconMinus.vue'
import IconMore from './icons/IconMore.vue'

const props = defineProps<{
    children?: Node[],
    hasChildren?: boolean,
    active?: boolean,
    expanded?: boolean
}>()

const active = ref(props.active) || ref(false)
const expanded = ref(props.expanded) || ref(false)
const emit = defineEmits(['expand', 'activate'])
const expand = () => {
    expanded.value = !expanded.value
    emit('expand', expanded.value)
}

const activate = () => {
    emit('activate', active.value)
}
</script>

<template>
    <div class="node">
        <a @click.prevent="expand" v-if="props.hasChildren" class="fold-control node-control">
            <IconPlus v-show="!expanded" />
            <IconMinus v-show="expanded" />
        </a>
        <span class="title">
            <slot name="title"></slot>
        </span>
        <label class="switch">
            <input type="checkbox" v-model="active" @change="activate" value="1">
            <span class="slider round"></span>
        </label>
        <a class="context-menu node-control">
            <IconMore class="menuIcon" />
        </a>
    </div>
</template>
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

.fold-control {
    margin: auto 0 0px 6px;
    cursor: pointer;
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
</style>
