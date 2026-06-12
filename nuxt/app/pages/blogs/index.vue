<script setup lang="ts">
const config = useRuntimeConfig()
const directusUrl = config.public.directusUrl

const { data, pending, error } = await useFetch('/api/posts')
const posts = computed(() => data.value?.posts || [])

useSeoMeta({
  title: 'Blog',
  description: 'Read our latest posts',
  ogTitle: 'Blog',
  ogDescription: 'Read our latest posts',
})
</script>

<template>
  <div>

    <!-- Page header -->
    <div class="bg-[var(--background-variant-color)] text-white py-16 text-center">
      <h1 class="font-heading text-4xl md:text-5xl font-bold uppercase">Blogs</h1>
      <p class="text-white/70 mt-2 text-sm">Stories, guides and updates</p>
    </div>

    <!-- Posts grid -->
    <Container class="py-16">
      <div v-if="pending" class="text-center py-20 text-foreground/50">Loading posts...</div>
      <div v-else-if="error" class="text-center py-20 text-red-500">Failed to load posts.</div>

      <div v-else class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="post in posts"
          :key="post.id"
          :to="`/blogs/${post.slug}`"
          class="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-background-muted"
        >
          <!-- Thumbnail -->
          <div class="relative w-full h-52 overflow-hidden bg-gray">
            <img
              v-if="post.image"
              :src="`${directusUrl}/assets/${post.image}`"
              :alt="post.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-foreground/30 text-sm">
              No image
            </div>
          </div>

          <!-- Card body -->
          <div class="p-5">
            <h2 class="font-heading text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-200 line-clamp-2 mb-2">
              {{ post.title }}
            </h2>
            <p class="text-sm text-foreground/70 line-clamp-3 mb-4">
              {{ post.description }}
            </p>
            <span class="inline-flex items-center gap-1 text-sm font-semibold text-accent">
              Read more <span>→</span>
            </span>
          </div>
        </NuxtLink>
      </div>
    </Container>

  </div>
</template>