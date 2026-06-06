<template>
  <div>

    <section class="hero">
      <div class="overlay">
        <h1>Travel Blogs</h1>
        <p>Explore travel tips, guides and destinations</p>
      </div>
    </section>

    <section class="blog-container">

      <div class="blog-card">

        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          alt=""
        >

        <div class="content">
          <h2>Travel Tips</h2>

          <p>
            Discover the best places to visit in Coimbatore and nearby regions.
          </p>

          <NuxtLink to="/blogs/travel-tips">
            Read More →
          </NuxtLink>
        </div>

      </div>

      <div class="blog-card">

        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c"
          alt=""
        >

        <div class="content">
          <h2>Taxi Guide</h2>

          <p>
            Learn how to choose the perfect taxi service for your trip.
          </p>

          <NuxtLink to="/blogs/taxi-guide">
            Read More →
          </NuxtLink>
        </div>

      </div>

      <div class="blog-card">

        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
          alt=""
        >

        <div class="content">
          <h2>Top Destinations</h2>

          <p>
            Explore hidden gems and popular tourist attractions.
          </p>

          <NuxtLink to="/blogs/top-destinations">
            Read More →
          </NuxtLink>
        </div>

      </div>

    </section>

  </div>
</template>

<style scoped>
.hero{
  height:40vh;
  background:url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')
  center/cover;
  display:flex;
  justify-content:center;
  align-items:center;
}

.overlay{
  color:white;
  text-align:center;
  background:rgba(0,0,0,.5);
  padding:30px;
  border-radius:10px;
}

.blog-container{
  max-width:1200px;
  margin:auto;
  padding:60px 20px;
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
  gap:30px;
}

.blog-card{
  border-radius:15px;
  overflow:hidden;
  box-shadow:0 5px 20px rgba(0,0,0,.1);
  transition:.3s;
}

.blog-card:hover{
  transform:translateY(-8px);
}

.blog-card img{
  width:100%;
  height:220px;
  object-fit:cover;
}

.content{
  padding:20px;
}

.content h2{
  margin-bottom:10px;
}

.content p{
  margin-bottom:15px;
}
</style>