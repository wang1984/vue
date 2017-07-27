<template>
  <div>
     <app-header :seller="seller"></app-header>
     <div class="tab border-1px">
         <div class="tab-item">
             <a v-link="{path:'/goods'}" >商品</a>
         </div>
         <div class="tab-item">
             <a v-link="{path:'/ratings'}" >评论</a>
         </div>
         <div class="tab-item">
             <a v-link="{path:'/seller'}" >商家</a>
         </div>
     </div>
     <router-view></router-view>    
  </div>
</template>

<script>
import appHeader from './components/header/header.vue' ;

const ERR_OK =0;
export default {
   data() {
      return {
         seller:{}
      }
   },
   created(){
      this.$http.get('/api/seller').then((res)=>{
           res= res.data 
           if(res.errno===ERR_OK)
           {
            this.seller=res.data;
           }
            
      })
   },
   components:{
    appHeader
   }
}
</script>

<style scoped>
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px; 
    position:relative; 
  }
  .tab:after{
   display: block;
   position: absolute;
   left:0;
   bottom:0;
   width: 100%;
   border-top: 1px solid rgba(7,17,27,0.1);
   content:''; 
 } 

  .tab .tab-item{
    flex:1;
    text-align: center;
  }
  .tab .tab-item a{
    display: block;
    font-size: 14px;
    color: rgb(78,85,93);
  }
  .tab .tab-item a.active{
     color: rgb(240,20,20)
  }
</style>
