<script setup lang="ts">
interface HeroProps {
  data: {
    id: string
    tagline?: string
    headline?: string
    description?: string
    layout?: string
    image?: string
    button_group?: {
      id?: string
      buttons: Array<{
        id: string
        label: string | null
        variant: string | null
        url: string | null
        type: 'url' | 'page' | 'post'
        page?: { permalink: string } | null
        post?: { slug: string } | null
      }>
    }
  }
}

const { setAttr } = useVisualEditing()
const config = useRuntimeConfig()
const directusUrl = config.public.directusUrl
const props = defineProps<HeroProps>()

function resolveButtonHref(btn: HeroProps['data']['button_group']['buttons'][0]) {
  if (btn.type === 'page' && btn.page?.permalink) return btn.page.permalink
  if (btn.type === 'post' && btn.post?.slug) return `/blog/${btn.post.slug}`
  return btn.url || '#'
}
</script>

<template>
  <section class="relative w-full min-h-[92vh] flex flex-col overflow-hidden bg-[var(--background-variant-color)]">

    <!-- Background image -->
    <div v-if="data.image" class="absolute inset-0 z-0">
      <img
        :src="`${directusUrl}/assets/${data.image}`"
        :alt="data.headline || 'Hero'"
        class="w-full h-full object-cover"
        :data-directus="setAttr({ collection: 'block_hero', item: data.id, fields: ['image', 'layout'], mode: 'modal' })"
      />
      <div class="absolute inset-0 bg-black/55" />
    </div>

    <!-- Content -->
    <div class="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-24">

      <p
        v-if="data.tagline"
        class="text-white/80 uppercase tracking-widest text-sm md:text-base mb-4"
        :data-directus="setAttr({ collection: 'block_hero', item: data.id, fields: 'tagline', mode: 'popover' })"
      >
        {{ data.tagline }}
      </p>

      <h1
        v-if="data.headline"
        class="font-heading font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight max-w-4xl uppercase"
        :data-directus="setAttr({ collection: 'block_hero', item: data.id, fields: 'headline', mode: 'popover' })"
      >
        {{ data.headline }}
      </h1>

      <p
        v-if="data.description"
        class="mt-6 text-white/80 text-base md:text-lg max-w-2xl"
        :data-directus="setAttr({ collection: 'block_hero', item: data.id, fields: 'description', mode: 'popover' })"
      >
        {{ data.description }}
      </p>

      <div
        v-if="data.button_group?.buttons?.length"
        class="mt-8 flex flex-wrap justify-center gap-4"
      >
        <NuxtLink
          v-for="btn in data.button_group.buttons"
          :key="btn.id"
          :to="resolveButtonHref(btn)"
          class="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition-all duration-200"
          :class="btn.variant === 'outline'
            ? 'border-2 border-white text-white hover:bg-white hover:text-gray-900'
            : 'bg-white text-gray-900 hover:bg-white/90'"
        >
          {{ btn.label }}
          <span>→</span>
        </NuxtLink>
      </div>

    </div>

    <!-- Wave divider — uses white fill to match light mode page background -->
    <div class="relative z-10 w-full leading-none -mb-1">
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        class="w-full h-16 md:h-20 block"
      >
        <path
          d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1440,20 1440,20 L1440,80 L0,80 Z"
          fill="white"
          class="dark:fill-[#0e1a2b]"
        />
      </svg>
    </div>

  </section>
</template>