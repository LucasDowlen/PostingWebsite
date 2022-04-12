<template>
  <div class="wrapper">
    <div> Collection of Images Posted </div>

    <div ref="grid">

          <img v-for="image in imagesToPreload" v-bind:key="image" :src=image />

<!--      <img src="https://imgs.search.brave.com/SPCXBWlnYTK2ygGCIAcL3FsfVI-qIQqAY_BDP4YU-fs/rs:fit:448:336:1/g:ce/aHR0cDovLzIuYnAu/YmxvZ3Nwb3QuY29t/L184SDBrZW4zd3d0/RS9UTFJRN0ZSZl9v/SS9BQUFBQUFBQVY3/US9HZEw4Z19kUk1X/US9zMTYwMC9Db29s/X0Rlc2t0b3BfV2Fs/bHBhcGVyc19JbWFn/ZXMzLmpwZw">-->
<!--      <img src="https://imgs.search.brave.com/LEXrBpwM34YF5faailaUS2v3vHsAvuNOuW-xGlZ7h6k/rs:fit:425:425:1/g:ce/aHR0cDovL2ltYWdl/cy5hbGwtZnJlZS1k/b3dubG9hZC5jb20v/aW1hZ2VzL2dyYXBo/aWNsYXJnZS9jb29s/X3BpY3R1cmVzX29m/X2VhcnRoXzNfMTY1/NTE0LmpwZw">-->
<!--      <img src="https://imgs.search.brave.com/0EoauFDLhxVl-mIvF_RC6Z8bXoiwpt4HIy239_13psM/rs:fit:450:338:1/g:ce/aHR0cHM6Ly9ibHVl/YmxvdHMuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDA5LzA3/L3NwYWNlOC5qcGc">-->
<!--      <img src="https://imgs.search.brave.com/AppKJea4mMaA6_WhVr3I4_YeM9wfm1kDiU6eheuLW8Q/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDYxMjQy/MDguanBn">-->
<!--      <img src="https://imgs.search.brave.com/h76vkcTGN7cjcDstWdD-NrxPZhitHLfsaIHyJ0PgtEw/rs:fit:1200:1024:1/g:ce/aHR0cDovL3d3dy5w/aWNzaHVuZ2VyLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAx/NC8wNC85MTEuanBn">-->
<!--      <img src="https://imgs.search.brave.com/sk8_L2PiKrdU6unxesv2h8VXrS9d3-W8DBdPLYp5E7Q/rs:fit:1200:1200:1/g:ce/aHR0cDovL3d3dy5w/aWNzaHVuZ2VyLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAx/NC8wNC84OC5qcGc">-->
<!--      <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/15951/production/_117310488_16.jpg">-->
    </div>
  </div>
</template>



<script>

  import Masonry from 'masonry-layout';

  // var imagesToPreload = ["https://imgs.search.brave.com/SPCXBWlnYTK2ygGCIAcL3FsfVI-qIQqAY_BDP4YU-fs/rs:fit:448:336:1/g:ce/aHR0cDovLzIuYnAu/YmxvZ3Nwb3QuY29t/L184SDBrZW4zd3d0/RS9UTFJRN0ZSZl9v/SS9BQUFBQUFBQVY3/US9HZEw4Z19kUk1X/US9zMTYwMC9Db29s/X0Rlc2t0b3BfV2Fs/bHBhcGVyc19JbWFn/ZXMzLmpwZw",
  // "https://imgs.search.brave.com/LEXrBpwM34YF5faailaUS2v3vHsAvuNOuW-xGlZ7h6k/rs:fit:425:425:1/g:ce/aHR0cDovL2ltYWdl/cy5hbGwtZnJlZS1k/b3dubG9hZC5jb20v/aW1hZ2VzL2dyYXBo/aWNsYXJnZS9jb29s/X3BpY3R1cmVzX29m/X2VhcnRoXzNfMTY1/NTE0LmpwZw",
  //   "https://imgs.search.brave.com/0EoauFDLhxVl-mIvF_RC6Z8bXoiwpt4HIy239_13psM/rs:fit:450:338:1/g:ce/aHR0cHM6Ly9ibHVl/YmxvdHMuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDA5LzA3/L3NwYWNlOC5qcGc"];

  // console.log("Masonry:");
  // const masonry = new Masonry(this.$refs.grid);
  // console.log(masonry);

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
          img.src = imageSrc; //make this run masonry even if bad image is loaded.
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

  /*.wrapper {*/
  /*  !*width: 100%;*!*/
  /*  !*background: blue;*!*/
  /*  */
  /*  !*display: flex;*!*/
  /*  */
  /*  !*align-content: center;*!*/
  /*}*/

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
