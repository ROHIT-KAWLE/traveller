<script setup>
const route = useRoute()
</script>

<template>

  <div>

    <section class="banner">

      <div class="overlay">
        <h1>{{ route.params.slug }}</h1>
      </div>

    </section>

    <section class="blog-content">

      <img
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
        alt=""
      >

      <h2>About This Blog</h2>

      <p>
        This is a sample blog page created for the internship project.
      </p>

      <p>
        Here the content will later come from Directus CMS.
      </p>

      <p>
        The frontend structure is already ready and can display dynamic content
        once connected to the backend.
      </p>

      <h3>Related Articles</h3>

      <ul>
        <li>
          <NuxtLink to="/blogs/travel-tips">
            Travel Tips
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/blogs/taxi-guide">
            Taxi Guide
          </NuxtLink>
        </li>
      </ul>

    </section>

  </div>

</template>

<style scoped>
.banner{
  height:50vh;
  background:url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')
  center/cover;
  display:flex;
  justify-content:center;
  align-items:center;
}

.overlay{
  background:rgba(0,0,0,.5);
  color:white;
  padding:30px;
  border-radius:10px;
}

.blog-content{
  max-width:900px;
  margin:auto;
  padding:60px 20px;
}

.blog-content img{
  width:100%;
  border-radius:15px;
  margin-bottom:30px;
}

.blog-content h2,
.blog-content h3{
  margin:20px 0;
}

.blog-content p{
  margin-bottom:20px;
  line-height:1.8;
}
</style>