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
  <section class="p-10">
    <h1 class="text-3xl font-bold mb-6">Blogs</h1>

    <div v-if="pending">Loading...</div>

    <div v-else-if="error">Failed to load posts.</div>

    <div v-else class="grid gap-6 grid-cols-1 md:grid-cols-3">
      <NuxtLink
        v-for="post in posts"
        :key="post.id"
        :to="`/blogs/${post.slug}`"
        class="border p-4 rounded"
      >
        <img
          v-if="post.image"
          :src="`${directusUrl}/assets/${post.image}`"
          :alt="post.title"
          class="w-full h-48 object-cover"
        />

        <h2 class="text-xl font-bold mt-2">
          {{ post.title }}
        </h2>

        <p>{{ post.description }}</p>
      </NuxtLink>
    </div>
  </section>
</template>