<script setup lang="ts">
import type { PageBlock } from '#shared/types/schema'

const props = defineProps<{
  block: PageBlock
}>()

const componentMap: Record<string, any> = {
  block_hero: defineAsyncComponent(() => import('~/components/block/Hero.vue')),
  block_gallery: defineAsyncComponent(() => import('~/components/block/Gallery.vue')),
  block_posts: defineAsyncComponent(() => import('~/components/block/Posts.vue')),
  block_pricing: defineAsyncComponent(() => import('~/components/block/Pricing.vue')),
  block_richtext: defineAsyncComponent(() => import('~/components/block/RichText.vue')),
  block_form: defineAsyncComponent(() => import('~/components/block/FormBlock.vue')),
}

const component = computed(() => {
  return componentMap[props.block.collection] || null
})
</script>

<template>
  <component
    v-if="component"
    :is="component"
    :data="block.item"
  />
</template>