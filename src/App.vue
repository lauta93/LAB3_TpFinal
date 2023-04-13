<template>

  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/CompraVenta">Comprar</router-link> | 
    <router-link to="/venta">Vender</router-link> |
    <router-link to="/historial">Historial</router-link> | 
    
      
    {{this.$store.state.username}}  <button class="boton" @click="Logout">Cerrar sesion</button>
  </nav>
  <LoginComponent v-if="$store.state.username===''"></LoginComponent>
  <router-view></router-view>
     
  

</template>
<script>
// @ is an alias to /src

import LoginComponent from "./components/LoginComponent.vue";
export default{
    components: {
      LoginComponent
      },
      methods:{
        Logout(){        
          this.$store.state.username=''
          this.$router.replace('/')
        }
      }

    
}
</script>

<style>
body{  
  background-image: url("https://img.freepik.com/fotos-premium/cielo-azul-claro-como-fondo-pantalla-fondo-pantalla-cielo-colores-pastel_103864-556.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: hard-light;
  
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: rgb(206, 63, 19);
}

</style>
