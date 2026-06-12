<script setup lang="ts">
import { ZoomIn, ArrowLeft, ArrowRight, X } from 'lucide-vue-next'

interface GalleryItem {
  id: string
  directus_file: string
  sort?: number
}

interface GalleryProps {
  data: {
    id: string
    tagline?: string
    headline?: string
    items: GalleryItem[]
  }
}

const props = defineProps<GalleryProps>()
const { setAttr } = useVisualEditing()
const config = useRuntimeConfig()
const directusUrl = config.public.directusUrl

const isLightboxOpen = ref(false)
const currentIndex = ref(0)

const sortedItems = computed(() => {
  if (!props.data.items) return []
  return [...props.data.items].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
})

const currentItem = computed(() => {
  if (!sortedItems.value.length || currentIndex.value < 0 || currentIndex.value >= sortedItems.value.length) {
    return null
  }
  return sortedItems.value[currentIndex.value]
})

function handleOpenLightbox(index: number) {
  if (index >= 0 && index < sortedItems.value.length) {
    currentIndex.value = index
    isLightboxOpen.value = true
  }
}

function handlePrev() {
  if (!sortedItems.value.length) return
  currentIndex.value = currentIndex.value > 0 ? currentIndex.value - 1 : sortedItems.value.length - 1
}

function handleNext() {
  if (!sortedItems.value.length) return
  currentIndex.value = currentIndex.value < sortedItems.value.length - 1 ? currentIndex.value + 1 : 0
}

function handleKeyDown(e: KeyboardEvent) {
  if (!isLightboxOpen.value) return
  e.preventDefault()
  e.stopPropagation()
  switch (e.key) {
    case 'ArrowLeft': handlePrev(); break
    case 'ArrowRight': handleNext(); break
    case 'Escape': isLightboxOpen.value = false; break
  }
}

onMounted(() => window.addEventListener('keydown', handleKeyDown))
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown))
</script>

<template>
  <section class="relative">

    <!-- Section heading -->
    <div class="text-center mb-10">
      <Tagline
        v-if="data.tagline"
        :tagline="data.tagline"
        :data-directus="setAttr({ collection: 'block_gallery', item: data.id, fields: 'tagline', mode: 'popover' })"
      />
      <Headline
        v-if="data.headline"
        :headline="data.headline"
        :data-directus="setAttr({ collection: 'block_gallery', item: data.id, fields: 'headline', mode: 'popover' })"
      />
      <p v-if="!data.headline && !data.tagline" class="text-foreground/60 text-sm">Gallery</p>
    </div>

    <!-- Cards grid -->
    <div
      v-if="sortedItems.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      :data-directus="setAttr({ collection: 'block_gallery', item: data.id, fields: 'items', mode: 'modal' })"
    >
      <div
        v-for="(item, index) in sortedItems"
        :key="item.id"
        class="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white"
        @click="handleOpenLightbox(index)"
      >
        <!-- Image -->
        <div class="relative h-52 overflow-hidden">
          <img
            :src="`${directusUrl}/assets/${item.directus_file}`"
            :alt="`Service ${index + 1}`"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <!-- Zoom overlay -->
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
            <ZoomIn class="w-8 h-8 text-white" />
          </div>
        </div>
        <!-- Card footer -->
        <div class="p-4 flex items-center justify-between">
          <span class="text-sm font-medium text-foreground">View Details</span>
          <span class="text-xs text-accent font-semibold">→</span>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Dialog v-model:open="isLightboxOpen">
      <DialogContent
        class="flex max-w-full max-h-full items-center justify-center p-2 bg-transparent border-none z-50"
        hideCloseButton
      >
        <DialogTitle class="sr-only">Gallery Image</DialogTitle>
        <DialogDescription class="sr-only">
          Viewing image {{ currentIndex + 1 }} of {{ sortedItems.length }}.
        </DialogDescription>
        <DialogHeader />
        <div class="relative w-[90vw] h-[90vh] flex items-center justify-center">
          <img
            v-if="currentItem"
            :src="`${directusUrl}/assets/${currentItem.directus_file}`"
            alt="Gallery image"
            class="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
        <div v-if="sortedItems.length > 1" class="absolute bottom-4 inset-x-0 flex justify-between px-4">
          <button
            class="flex items-center gap-2 text-white bg-black/70 rounded-full px-4 py-2 hover:bg-black/90"
            @click="handlePrev"
          >
            <ArrowLeft class="w-5 h-5" />
            <span>Prev</span>
          </button>
          <button
            class="flex items-center gap-2 text-white bg-black/70 rounded-full px-4 py-2 hover:bg-black/90"
            @click="handleNext"
          >
            <span>Next</span>
            <ArrowRight class="w-5 h-5" />
          </button>
        </div>
        <DialogClose asChild>
          <button
            class="absolute top-4 right-4 bg-black/70 text-white rounded-full p-2 hover:bg-black/90"
            aria-label="Close Lightbox"
          >
            <X class="w-6 h-6" />
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>

  </section>
</template>