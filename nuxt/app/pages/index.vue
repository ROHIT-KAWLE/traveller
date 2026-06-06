<script setup>
const { $directus, $createItem } = useNuxtApp()

const form = reactive({
  pickup_location: '',
  date: '',
  mobile: ''
})

const submitted = ref(false)
const error = ref(null)

async function submitBooking() {
  try {
    await $directus.request($createItem('bookings', form))
    submitted.value = true
  } catch (e) {
    error.value = 'Booking failed, please try again.'
  }
}
</script>

<template>
  <div>

    <!-- Navbar -->
    <nav class="navbar">
      <div class="logo">Traveller</div>

      <div class="links">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/">Services</NuxtLink>
        <NuxtLink to="/blogs">Blogs</NuxtLink>
        <NuxtLink to="/">Contact</NuxtLink>
      </div>
    </nav>

    <!-- Hero -->
    <section class="hero">
      <div class="overlay">
        <h1>Journey Through Coimbatore & Beyond</h1>
        <p>Your trusted taxi and tour partner</p>
        <button>Book Your Ride Today</button>
      </div>
    </section>

    <!-- Services -->
    <section class="services">
      <h2>Services We Offer</h2>

      <div class="cards">

        <div class="card">
          <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee">
          <h3>Airport Pickup</h3>
          <p>Reliable airport transportation.</p>
        </div>

        <div class="card">
          <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c">
          <h3>City Tours</h3>
          <p>Explore Coimbatore comfortably.</p>
        </div>

        <div class="card">
          <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70">
          <h3>Taxi Booking</h3>
          <p>Book rides anytime.</p>
        </div>

        <div class="card">
          <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800">
          <h3>Pilgrimage Tours</h3>
          <p>Travel with comfort and safety.</p>
        </div>

      </div>
    </section>

    <!-- Booking -->
    <section class="booking">

      <div class="booking-left">
        <h2>QUICK BOOKING</h2>

        <p>
          Swift and Simple Booking: Our user-friendly online platform lets
          you reserve your taxi or tour in just a few clicks.
        </p>
      </div>

      <div class="booking-right">

        <input
          type="text"
          placeholder="Enter your pickup location"
        >

        <div class="row">

          <input
            type="date"
          >

          <input
            type="tel"
            placeholder="Mobile number"
          >

        </div>

        <button>
          Book Now
        </button>

      </div>

    </section>

    <!-- Blogs -->
    <section class="blogs">

      <h2>Recent Blogs</h2>

      <div class="cards">

        <NuxtLink
          to="/blogs/travel-tips"
          class="card blog-link"
        >
          <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee">
          <h3>Travel Tips</h3>
          <p>Best places to visit in Coimbatore.</p>
        </NuxtLink>

        <NuxtLink
          to="/blogs/taxi-guide"
          class="card blog-link"
        >
          <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c">
          <h3>Taxi Guide</h3>
          <p>Choose the best taxi service.</p>
        </NuxtLink>

        <NuxtLink
          to="/blogs/top-destinations"
          class="card blog-link"
        >
          <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70">
          <h3>Tour Destinations</h3>
          <p>Top attractions near Coimbatore.</p>
        </NuxtLink>

      </div>

    </section>

    <!-- Testimonials -->
    <section class="testimonials">

      <h2>Testimonials</h2>

      <div class="cards">

        <div class="card">
          ⭐⭐⭐⭐⭐
          <p>Excellent taxi service.</p>
        </div>

        <div class="card">
          ⭐⭐⭐⭐⭐
          <p>Very professional drivers.</p>
        </div>

        <div class="card">
          ⭐⭐⭐⭐⭐
          <p>Amazing travel experience.</p>
        </div>

      </div>

    </section>

    <!-- Footer -->
    <footer class="footer">
      <h3>Traveller</h3>
      <p>© 2026 All Rights Reserved</p>
    </footer>

  </div>
</template>

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  font-family:Arial,sans-serif;
}

.navbar{
  position:fixed;
  width:100%;
  padding:20px 60px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  z-index:100;
}

.logo{
  color:white;
  font-size:24px;
  font-weight:bold;
}

.links{
  display:flex;
  gap:25px;
}

.links a{
  color:white;
  text-decoration:none;
}

.hero{
  height:100vh;
  background:url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')
  center/cover;
  display:flex;
  justify-content:center;
  align-items:center;
}

.overlay{
  text-align:center;
  color:white;
  background:rgba(0,0,0,.55);
  padding:50px;
  border-radius:20px;
}

.overlay h1{
  font-size:72px;
  max-width:1000px;
}

.overlay p{
  margin:20px 0;
}

.overlay button{
  padding:15px 30px;
}

.services,
.blogs,
.testimonials{
  padding:80px 60px;
}

.cards{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
  gap:25px;
  margin-top:30px;
}

.card{
  border:1px solid #ddd;
  border-radius:12px;
  overflow:hidden;
  background:white;
  transition:.3s;
}

.card:hover{
  transform:translateY(-8px);
  box-shadow:0 10px 25px rgba(0,0,0,.15);
}

.card img{
  width:100%;
  height:220px;
  object-fit:cover;
}

.card h3{
  padding:15px;
}

.card p{
  padding:0 15px 15px;
}

.booking{
  background:black;
  color:white;
  padding:80px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:80px;
}

.booking-left{
  flex:1;
}

.booking-left h2{
  font-size:48px;
  margin-bottom:20px;
}

.booking-left p{
  color:#cfcfcf;
  line-height:1.8;
}

.booking-right{
  flex:1;
  display:flex;
  flex-direction:column;
  gap:20px;
}

.booking-right input{
  padding:18px;
  border:1px solid #444;
  background:#111;
  color:white;
  border-radius:8px;
}

.row{
  display:flex;
  gap:20px;
}

.row input{
  flex:1;
}

.booking-right button{
  padding:18px;
  border:none;
  border-radius:8px;
  background:white;
  color:black;
  font-weight:bold;
}

.blog-link{
  text-decoration:none;
  color:black;
}

.footer{
  background:#111;
  color:white;
  text-align:center;
  padding:40px;
}
</style>