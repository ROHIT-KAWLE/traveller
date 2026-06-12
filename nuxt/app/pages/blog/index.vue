<script setup lang="ts">
const config = useRuntimeConfig()
const directusUrl = config.public.directusUrl

const { data, pending, error } = await useFetch('/api/posts')
const posts = computed(() => data.value?.posts || [])

useSeoMeta({
  title: 'Blog',
  description: 'Read our latest posts',
})
</script>

<template>
  <div>
    <div class="bg-[var(--background-variant-color)] text-white py-16 text-center">
      <h1 class="font-heading text-4xl md:text-5xl font-bold uppercase">Blog</h1>
      <p class="text-white/70 mt-2 text-sm">Stories, guides and updates</p>
    </div>

    <Container class="py-16">
      <div v-if="pending" class="text-center py-20 text-foreground/50">Loading...</div>
      <div v-else-if="error" class="text-center py-20 text-red-500">Failed to load posts.</div>
      <div v-else class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="post in posts"
          :key="post.id"
          :to="`/blog/${post.slug}`"
          class="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-background-muted"
        >
          <div class="relative w-full h-52 overflow-hidden bg-gray">
            <img
              v-if="post.image"
              :src="`${directusUrl}/assets/${post.image}`"
              :alt="post.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div class="p-5">
            <h2 class="font-heading text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2 mb-2">
              {{ post.title }}
            </h2>
            <p class="text-sm text-foreground/70 line-clamp-3 mb-4">{{ post.description }}</p>
            <span class="inline-flex items-center gap-1 text-sm font-semibold text-accent">Read more →</span>
          </div>
        </NuxtLink>
      </div>
    </Container>
  </div>
</template>