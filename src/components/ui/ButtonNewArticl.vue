<template>
  <router-link
    :to="{ name: 'CreateArticlPage', query: { articlType: $route.params.articlType || '', slug: $route.params.slug || '0' } }">
    <button class="modern-button">Add Articl</button>
  </router-link>
</template>

<script>
export default {
  name: "ButtonNewArticl",
};
</script>

<style scoped>
button {
  font-size: 0.7rem;
}

.modern-button {
  background-color: #83ba37; /* Primary color */
  color: #FFFFFF; /* White text */
  margin: 0.5rem;
  border: none; /* Remove border */
  border-radius: 4px; /* Slightly rounded corners */
  padding: 10px 20px; /* Padding for better click area */
  font-size: 0.8rem; /* Slightly larger font size for readability */
  font-weight: 500; /* Medium font weight */
  text-transform: uppercase; /* Uppercase text */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
  width: 20%; /* Set width to 20% of the container */
}

.modern-button:hover {
  background-color: #66912b; /* Darker shade on hover */
}

.modern-button:focus {
  outline: none; /* Remove focus outline */
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.25); /* Custom focus outline */
}
</style>
