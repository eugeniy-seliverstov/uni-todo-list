<template>
  <div class="app-wrap">
    <div id="app" class="app">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@import '~vuejs-noty/dist/vuejs-noty.css'; 

body {
  margin: 0;
  padding: 0;
}
.app-wrap {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #090909;
  background: #fcfcfc;
}
.app {
  max-width: 500px;
  margin: 0 auto;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>