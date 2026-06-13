<script setup lang="ts">
import Text from '~/components/base/Text.vue'

interface RichTextProps {
  data: {
    id?: string
    tagline?: string
    headline?: string
    content?: string
    alignment?: 'left' | 'center' | 'right'
    className?: string
  }
}

withDefaults(defineProps<RichTextProps>(), {
  data: () => ({ alignment: 'center' }),
})

const { setAttr } = useVisualEditing()
</script>

<template>
  <div
    :class="[
      'mx-auto max-w-3xl space-y-4',
      {
        'text-center': data.alignment === 'center' || !data.alignment,
        'text-right': data.alignment === 'right',
        'text-left': data.alignment === 'left',
      },
      data.className,
    ]"
  >
    <Tagline
      v-if="data.tagline"
      :tagline="data.tagline"
      :data-directus="setAttr({ collection: 'block_richtext', item: data.id, fields: 'tagline', mode: 'popover' })"
    />
    <Headline
      v-if="data.headline"
      :headline="data.headline"
      :data-directus="setAttr({ collection: 'block_richtext', item: data.id, fields: 'headline', mode: 'popover' })"
    />
    <Text
      v-if="data.content"
      :content="data.content"
      class="text-foreground/70 text-base md:text-lg leading-relaxed"
      :data-directus="setAttr({ collection: 'block_richtext', item: data.id, fields: 'content', mode: 'drawer' })"
    />
  </div>
</template>