<script setup lang="ts">
const config = useRuntimeConfig()
const directusUrl = config.public.directusUrl

const route = useRoute()
const slug = route.params.slug

const { data, error } = await useFetch(`/api/posts/${slug}`)

if (error.value || !data.value?.post) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found',
  })
}

const post = computed(() => data.value!.post)

useSeoMeta({
  title: post.value?.seo?.title || post.value?.title || '',
  description: post.value?.seo?.meta_description || post.value?.description || '',
  ogTitle: post.value?.seo?.title || post.value?.title || '',
  ogDescription: post.value?.seo?.meta_description || post.value?.description || '',
})
</script>

<template>
  <div v-if="post">

    <section class="banner">
      <div class="overlay">
        <h1>{{ post.title }}</h1>
      </div>
    </section>

    <section class="blog-content">

      <img
        v-if="post.image"
        :src="`${directusUrl}/assets/${post.image}`"
        :alt="post.title"
      />

      <h2>{{ post.title }}</h2>

      <p>{{ post.description }}</p>

      <div v-html="post.content" />

    </section>

  </div>
</template>

<style scoped>
.banner {
  height: 50vh;
  background: url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee') center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 30px;
  border-radius: 10px;
}

.blog-content {
  max-width: 900px;
  margin: auto;
  padding: 60px 20px;
}

.blog-content img {
  width: 100%;
  border-radius: 15px;
  margin-bottom: 30px;
}
</style>