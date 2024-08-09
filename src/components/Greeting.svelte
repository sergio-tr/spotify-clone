<!--
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let greeting = "";
  let currentTime = new Date();

  function updateGreeting() {
    currentTime = new Date();
  }

  // Reactive statement to update greeting based on current time
  $: {
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes()

    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Buenos días";
    } else if (currentHour >= 12 && currentHour < 19) {
      greeting = "Buenas tardes";
    } else {
      greeting = "Buenas noches";
    }
  }

  let interval: number;

  onMount(() => {
    updateGreeting(); // Initialize greeting
    interval = setInterval(updateGreeting, 60000); // Update every minute
  });

  onDestroy(() => {
    console.log("Component destroyed"); // Debugging line
    clearInterval(interval);
  });
</script>

<h1 class="text-6xl font-bold">{greeting}, bienvenido a Spotify</h1>

-->

<script lang="ts">

  let greeting = "";
  
  const currentHour = new Date().getHours();

  if (currentHour >= 3 && currentHour < 12) {
    greeting = "Buenos días";
  } else if (currentHour >= 12 && currentHour < 19) {
    greeting = "Buenas tardes";
  } else {
    greeting = "Buenas noches";
  }

</script>

<h1 class="text-6xl font-bold">{greeting}, bienvenido a Spotify</h1>
