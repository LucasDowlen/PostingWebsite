<template>
  <div class="wrapper">
    <div> Collection of Images Posted </div>

    <div ref="grid">
          <img v-for="image in imagesToPreload" v-bind:key="image" :src=image />
    </div>
  </div>
</template>



<script>

  import Masonry from 'masonry-layout';

  export default {
    name: "Images",

    data() {
      return {
        //make imagesToPreloadList be loaded from Firebase instead of hardCoded
        imagesToPreload: ["https://images.unsplash.com/photo-1563305157-a68b080cc7e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1566377869454-20ae52bdf7f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1563494270-4e133aea0ede?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://imgs.search.brave.com/QFeNnbwA6OiUfWxCz5KvplNmKqPW54tp0PI39YRLIXo/rs:fit:500:750:1/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vNzM2/eC9mMC84Ny8yYS9m/MDg3MmE5ZTYwMGZm/ZTkyYzcyZjMwZGZj/ZjNkNjQzNi5qcGc",
        "https://media.istockphoto.com/photos/abstract-wavy-object-picture-id1198271727?b=1&k=20&m=1198271727&s=170667a&w=0&h=b626WM5c-lq9g_yGyD0vgufb4LQRX9UgYNWPaNUVses=",
        "https://images.unsplash.com/photo-1563468426843-8d6107699d10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1566216645689-ea2278e1e449?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        "https://cdn.wallpapersafari.com/89/50/nvCrWQ.jpg",
        "https://mobimg.b-cdn.net/v3/fetch/8b/8b5f9a5b6169235da82745d771c3b24e.jpeg",
        "https://images.unsplash.com/photo-1563303042-b9fe51ff7227?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",]
      }
    },

    created() {
      const images = this.imagesToPreload.map(imageSrc => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = imageSrc;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      Promise.all(images).then(() => {
        const masonry = new Masonry(this.$refs.grid, {
          fitWidth: true,
        });
        console.log(masonry);

        this.isLoading = false;
      }).catch(error => {
        console.error("Some image(s) failed loading!");
        console.error(error.message)
      });
    },
  }

</script>
<style scoped>
  .wrapper  div{
    margin: 5vh auto;
    font-size: 2em;
    color: white;
    /*background: green;*/
    text-align: center;
  }

  img {
    width: 400px;
  }
</style>
