<template>
     <div class="header">
          <div class="content-wrapper">
          	 <div class="avatar">
          	 	 <img :src="seller.avatar" alt="" width="64" height="64">
          	 </div>
          	 <div class="content">
          	 	 <div class="title">
          	 	 	<span class="brand bg-img"></span>
          	 	 	<span class="name">{{seller.name}}</span>
          	 	 </div>
          	 	 <div class="description">
          	 	 	{{seller.description}} / {{seller.deliveryTime}}分钟送达
          	 	 </div>
          	 	 <div v-if="seller.supports" class="support">
          	 	     <!--这里为什么要使用if进行判断
                         因为初始化的时候 seller是一个空对象，空对象通过prop传递给header组件
                         此时收到的seller还是一个空对象
                         然后app.vue的ajax将数据接收完毕后seller才有数据-->
          	 	 	 <!--我们只要第一条数据所以不需要循环-->
          	 	 	 <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          	 	 	 <span class="text">{{seller.supports[0].description}}</span>
          	 	 </div>
          	 </div>
          	 <div v-if="seller.supports" class="support-count" @click="showDetail">
          	 	 <span class="count">{{seller.supports.length}}个</span>
          	 	 <i class="icon-keyboard_arrow_right"></i>
          	 </div>
          </div>  
          <div class="bulletin-wrapper" @click="showDetail">
          	 <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
          	 <i class="icon-keyboard_arrow_right"></i>
          </div>
          <div class="background">
          	 <img :src="seller.avatar" alt="" width="100%" height="100%">
          </div>
          <!-- sticky footer 布局 -->
          <div v-show="detailShow" class="detail" transition="fade">
          	  <div class="detail-wrapper clearfix">
          	  	 <div class="detail-main">
          	  	 	  <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrapper">
                        <star :size="48" :score="seller.score"></star>
                    </div>
                   <!--  flex 布局  --参考 阮一峰flex  -->
                    <div class="title">
                         <div class="line"></div>
                         <div class="text">优惠信息</div>
                         <div class="line"></div>
                    </div> 
                     <ul v-if="seller.supports" class="supports">
                       <li class="support-item" v-for="item in seller.supports">
                          <span class="icon" :class="classMap[seller.supports[$index].type ]"></span>
                          <span class="text">{{seller.supports[$index].description}}</span>
                       </li>
                     </ul>
                      <!--  flex 布局  --参考 阮一峰flex  -->
                      <div class="title">
                           <div class="line"></div>
                           <div class="text">商家公告</div>
                           <div class="line"></div>
                      </div> 
                      <div class="bulletin">
                          <p class="cont">{{seller.bulletin}}</p>
                      </div>
          	  	 </div>
          	  </div>
              <div class="detail-close" @click="hideDetail">
              	<i class="icon-close"></i>
              </div>
          </div>  
     </div>
</template>

<script>
 import star from '../star/star.vue';
export default {
    props:{
    	seller:{
    		type: Object,
    	}
    },
    data(){
    	return {
    		classMap:['discrease','discount','special','invoice','guarantee'],
    		detailShow:false
    	}
    },
    methods:{
    	showDetail(){
    	  this.detailShow=true	
    	},
      hideDetail(){
        this.detailShow=false 
      } 
    },
   
    components:{
      star
    } 
   
}
</script>

<style scoped>
   .header{
   	position: relative;
   	color: #fff;
   	background-color: rgba(7,17,27,0.5);
   	overflow: hidden;
   } 
   .content-wrapper{
   	padding:24px 12px 18px 24px;
   	font-size:0;
   	position: relative;
     /*消除空白字符的影响；父级的字体大小为 0 */
   }
   .avatar{
   	display: inline-block;
   	font-size: 14px;
   	vertical-align: top;
   }
   .avatar img{
   	border-radius: 2px
   }
   .content{
   	display: inline-block;
    
   	margin-left:16px;
   }
   .title{
   	 margin:2px 0 8px 0;
   }
   .brand{
   	width: 30px;
   	height: 18px;
   	vertical-align: top;
   	display: inline-block;
   	-webkit-background-size: ;
   	background-size:30px 18px ;
   	background-repeat: no-repeat;
   }
   .bg-img{
		  background-image: url('images/brand@2x.png')
		}
   @media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
	 .bg-img{
		   background-image: url('images/brand@3x.png')
		}
    }

  .title .name{
  	margin-left:6px;
  	font-size: 16px;
  	line-height: 18px;
  	font-weight: bold;
  }  
  .description{
  	margin-bottom: 10px;
  	line-height: 12px;
  	font-size: 12px;
  }
 
  .support .icon{
  	display: inline-block;
  	width: 12px;
  	height: 12px;
  	margin-right:4px;
  	background-size: 12px 12px;
  	background-repeat: no-repeat;
  	vertical-align: top;
  }
  .support .icon.discrease{
       background-image: url('images/decrease_1@2x.png')
  }
 
  .support .icon.discount{
       background-image: url('images/discount_1@2x.png')
  }
 
  .support .icon.special{
       background-image: url('images/special_1@2x.png')
  }
  .support .icon.invoice{
	   background-image: url('images/invoice_1@2x.png')
  }
  .support .icon.guarantee{
      background-image: url('images/guarantee_1@2x.png')
  }
  .text{
  	color: #fff;
  	font-size: 10px;
  	line-height: 12px;
  }
  .support-count{
  	position: absolute;
  	right: 12px;
  	bottom:18px;
  	height: 24px;
  	line-height: 24px;
  	padding: 0 8px;
  	border-radius: 14px;
  	background:rgba(0,0,0,0.2);
  	text-align: center;
  }
  .count{
  	font-size: 14px;
    vertical-align: top;
  }
 .support-count .icon-keyboard_arrow_right{
  	font-size: 14px;
    line-height: 24px;
    margin-left:2px;
  }
  .bulletin-wrapper{
  	height: 28px;
  	line-height: 28px;
  	padding: 0 22px 0 12px;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    background-color: rgba(7,17,27,0.2);
  } 
  /* font-size: 0; 会影响省略号；所以这里可以将两个span标签之间的空隙删除 */
 .bulletin-title{
 	display: inline-block;
 	width: 22px;
 	height: 12px;
 	background-image: url('images/bulletin@3x.png');
 	background-size: 22px 12px;
 	background-repeat: no-repeat;
  vertical-align: top;
  margin-top:8px;
 }
 .bulletin-text{
   font-size: 10px;
   margin:0 4px;
   vertical-align: top;
 }
 .bulletin-wrapper .icon-keyboard_arrow_right{
 	font-size: 10px;
 	position: absolute;
 	right: 12px;
 	top:8px;
 }
 .background{
 	position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%; 
    z-index: -1;
    filter: blur(10px); /* 模糊效果*/

 }

 /* sticky footer 布局  */
 .detail{
 	position: fixed;
 	z-index:100;
 	width: 100%;
 	height: 100%;
 	top:0;
 	left: 0;
 	overflow: auto;
 	background-color: rgba(7,17,27,0.8);
  transition: all 0.5s
 }

 .fade-transition{
   opacity: 1;
   background: rgba(7,17,27,0.8)
 }
 .fade-enter,.fade-leave{
   opacity: 0;
   background: rgba(7,17,27,0)
 }
  
 .detail-wrapper{
 	min-height: 100%;
 	width: 100%;
 }
 .detail-main{
    margin-top:64px;
    padding-bottom:64px;
  
 }
 .detail-close{
	position: relative;
	width: 32px;
	height: 32px;
	margin:-64px auto 0 auto;
	clear: both;
	font-size: 32px;
 }
 .detail-main .name{
 	line-height: 16px;
 	text-align: center;
 	font-size: 16px;
 	font-weight: 700;

 }
 .detail-main .star-wrapper{
   margin-top:18px;
   padding: 2px 0;
   text-align: center;
 }
 /* flex布局 */
 .detail-main .title{
   width: 80%;
   margin: 28px auto 24px auto ;
   display: flex;
 }
 .detail-main .title .line{
    flex:1;
    position: relative;
    top:-6px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
 }
 .detail-main .title .text{
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700
 }
 .detail-main .supports{
    width: 80%;
    margin:0 auto;
 }
 .detail-main .supports .support-item{
  padding: 0 12px;
  margin-bottom:12px;
  font-size: 0;
 } 
 .detail-main .supports .support-item:last-child{
  margin-bottom:0;
 }
 .detail-main .supports .support-item .icon{
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: top;
  margin-right:6px;
  background-size: 16px;
  background-repeat: no-repeat;
 }
  .support-item .icon.discrease{
       background-image: url('images/decrease_2@2x.png')
  }
 
  .support-item .icon.discount{
       background-image: url('images/discount_2@2x.png')
  }
 
  .support-item .icon.special{
       background-image: url('images/special_2@2x.png')
  }
  .support-item .icon.invoice{
     background-image: url('images/invoice_2@2x.png')
  }
  .support-item .icon.guarantee{
      background-image: url('images/guarantee_2@2x.png')
  }
  .detail-main .supports .support-item .text{
    line-height: 16px;
    font-size: 12px;
  }
  .bulletin{
    width: 80%;
    margin:0 auto;
  } 
  .bulletin .cont{
    padding: 0 12px;
    line-height: 24px;
    font-size: 12px;
  }
</style>
