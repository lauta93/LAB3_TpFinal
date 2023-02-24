<template>
    <div class="popUp">
        <div class="recuadro-inner">
            <div>{{message}}</div>
           <button @click="cerrar">Entendido</button>

        </div>
    </div>
  
</template>

<script>
export default {

    props: {
     message: {
        Type: String,
        required: true
     }
    },
    methods: {
        cerrar(){
            this.$store.state.mostrarPopUp=false
        }
    }

}
</script>

<style>
.popUp{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    
}
.recuadro-inner{
    position: relative;
    background: #FFF;
    padding: 30px;
    border-radius: 2%;
}
</style>