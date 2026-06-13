<script setup lang="ts">
import type { PageBlock } from '#shared/types/schema'

const props = defineProps<{
  sections: PageBlock[]
}>()

// Blocks that must NOT be wrapped in a Container (need full viewport width)
const fullBleedCollections = ['block_hero', 'block_form']

const validBlocks = computed(() => {
  return (props.sections || []).filter((block) => {
    return block?.collection && block?.item
  })
})
</script>

<template>
  <div>
    <template v-for="block in validBlocks" :key="block.id">

      <!-- Full-bleed blocks: hero, form — no container, handle their own width -->
      <div
        v-if="fullBleedCollections.includes(block.collection)"
        :data-background="block.background || undefined"
      >
        <ResolveBlock :block="block" />
      </div>

      <!-- Contained blocks wrapped with vertical padding and optional dark bg -->
      <div
        v-else
        class="py-14 md:py-20"
        :class="block.background === 'dark' ? 'bg-[var(--background-variant-color)] text-white' : ''"
        :data-background="block.background || undefined"
      >
        <Container>
          <ResolveBlock :block="block" />
        </Container>
      </div>

    </template>
  </div>
</template>