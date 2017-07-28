<template>
	<div class="goods">
		<div class="menu-wrapper" v-el:menu-wrapper>
			<ul>
				<li v-for="item in goods" class="menu-item border-1px" :class="{current:currntIndex===$index }" @click="selectMenu($index,$event)" >
					<span class="text">
						 <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span> 
							{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" v-el:foods-wrapper>
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook"  >
					 <h1 class="title">{{item.name}}</h1>
	                 <ul>
	    				 <li v-for="food in item.foods" class="food-item border-1px">
	    				 	 <div class="icon" >
	    				 	 	<img :src="food.icon" width="57" height="57">
	    				 	 </div>
	    				 	 <div class="content">
	    				 	    <h2 class="name">{{food.name}}</h2>
	    				 	 	<p class="desc">{{food.description}}</p>
	    				 	
		    				 	<div class="extra">
		    				 	 	 <span class="count">
		    				 	 	 	 月售{{food.sellCount}}份
		    				 	 	 </span>
		    				 	 	 <span>好评率{{food.rating}}%</span>
		    				 	</div>
		    				 	<div class="price">
		    				 	 	<span class="now">￥{{food.price}}</span> 
		    				 	    <span class="old" v-show="food.oldPrice">
		    				 	    	￥{{food.oldPrice}}
		    				 	    </span>
		    				 	</div>
		    				 	<div class="cartcontrol-wrapper">
		    				 		<cartcontrol :food="food"></cartcontrol>
		    				 	</div>
		    				 </div>  	 
	    				 </li>
	    			 </ul>   			
				</li>
			</ul>
		</div> 
		<shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" v-ref:shopcart></shopcart>
	</div>
</template>
 
<script>
import BScroll from 'better-scroll';
import shopcart from 'components/shopcart/shopcart.vue'
import cartcontrol from 'components/cartcontrol/cartcontrol.vue'

const ERR_OK =0;
export default {
    props:{
 		seller:{
 			type:Object
 		}
    }, 
    data(){
        return {
        	goods:[],
        	listenHeight:[],
        	scrollY:0
        };
    },
    components:{
      shopcart,
      cartcontrol
    },
    created(){
      this.classMap=['discrease','discount','special','invoice','guarantee'];	
      this.$http.get('/api/goods').then((res)=>{
           res=res.data
           if(res.errno===ERR_OK)
           {
            this.goods=res.data; 
            this.$nextTick(()=>{  //vue的dom变化是在$nextTick方法后执行的 
            	this._initScroll(); 
            	this._calculateHeight();  
            })
           }  
      })
   },
   computed:{
 	 currntIndex(){
 		for(let i=0;i<this.listenHeight.length;i++)
 		{
 			let height1=this.listenHeight[i];
 			let height2=this.listenHeight[i+1];
 			if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
 				return i;
 			}

 		}
 		return 0;
 	 },
 	 selectFoods(){
 	 	let foods=[];
 	 	this.goods.forEach((good)=>{
 	 		good.foods.forEach((food)=>{
 	 			if(food.count)//这个count属性是由于 cartcontrol组件 为food对象添加的
 	 			{
 	 				foods.push(food);
 	 			}
 	 		})
 	 	})
 	 	return foods;
 	 } 
   },
   methods:{
   	 _initScroll(){
	   	 	this.menuScroll = new BScroll(this.$els.menuWrapper,{
	   	 		 click:true   // 让他可以传递ckick事件                      
	   	 	});                                     
	   	 	this.foodsScroll = new BScroll(this.$els.foodsWrapper,{
	   	 		 probeType:3,
	   	 		 click:true                        
	   	 	});
	   	 	this.foodsScroll.on('scroll',(pos)=>{
	           this.scrollY=Math.abs(Math.round(pos.y))
	   	 	}) 
	   	 },
     _calculateHeight(){
	        let foodList=this.$els.foodsWrapper.getElementsByClassName('food-list-hook');

	        let height =0;
	        this.listenHeight.push(height);

	        for(let i=0;i<foodList.length;i++){
	        	let item=foodList[i];
	        	height+=item.clientHeight;
	        	this.listenHeight.push(height);	
	        }              
	   	 },
   	 selectMenu(index,event){
        if(!event._constructed)
        {
        	return ;
        } 
        let foodList=this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        let el =foodList[index];
        this.foodsScroll.scrollToElement(el,300)
   	  },
   	  _drop(target){
           //父组件调用子组件的事件
           this.$refs.shopcart.drop(target); 
   	  } 
   },
 	events:{
 		'cart.add':function(target){
 			this._drop(target);
 		}
 	}  
}
</script>

<style scoped>
    .goods{
    	position: absolute;
    	width: 100%;
    	top:177px;
    	bottom:46px;
    	display: flex;
    	overflow: hidden;
    }
    .menu-wrapper{
    	flex:0 0 80px;
    	width: 80px;
    	background: #eee;
    }
    .menu-wrapper li.menu-item{
       display: table;   /* 不管是一行文字还是两行文字都可以做到垂直居中 */
       height: 54px;
       width: 56px;
       line-height: 14px; 
       position: relative;
       margin:0 auto;
    } 
    .menu-wrapper li.menu-item.current{
    	position: relative;
    	z-index:10;
    	margin-top: -1px;
    	background-color: #fff;

    }
    .menu-wrapper li.menu-item.current:after{
    	    border:none;
    	}  
     	
    .menu-wrapper li.menu-item:after{
	   display: block;
	   position: absolute;
	   left:0;
	   bottom:0;
	   width: 100%;
	   border-top: 1px solid #C1BFBF;
	   content:''; 
	} 
    .menu-item .icon{
       display: inline-block;
       vertical-align: top;
       width: 12px;
       height: 12px;
       margin-right: 2px;
       background-size: 12px 12px;
       background-repeat: no-repeat;
    }
   .menu-item .icon.discrease{
       background-image: url('images/decrease_3@2x.png')
	}
	 
	.menu-item .icon.discount{
       background-image: url('images/discount_3@2x.png')
	}
	 
	.menu-item .icon.special{
	       background-image: url('images/special_3@2x.png')
	}
	.menu-item .icon.invoice{
	     background-image: url('images/invoice_3@2x.png')
	}
	.menu-item .icon.guarantee{
	      background-image: url('images/guarantee_3@2x.png')
	}
    .menu-item  .text{
    	display: table-cell;
    	width: 56px;
    	vertical-align: middle;
    	font-size: 12px;
    } 


	.foods-wrapper{
		flex:1;
	    }
	.foods-wrapper .title{
		padding-left: 14px;
		height: 26px;
		line-height: 26px;
		border-left: 2px solid #d9dde1;
		font-size: 12px;
		color: rgb(14,153,159);
        background-color: #eee;
	}  
	.food-item{
        display: flex;
        margin:18px; 
        position: relative;
        padding-bottom:18px; 
	} 
	.food-item:after{
		   display: block;
		   position: absolute;
		   left:0;
		   bottom:0;
		   width: 100%;
		   border-top: 1px solid #C1BFBF;
		   content:''; 
		 } 
	.food-item:last-child:after{
		   border:none;
		   margin-bottom: 0 /*防止 margin-bottom：18px 与 padding-bottom：18px 重合 */
		    /* 最后一个没有下划线 */
		 } 	 
    .food-item .icon{
 		flex:0 0 57px;
 		width: 57px;
 		margin-right: 10px; 	
    } 
    .food-item .content{
		flex: 1;
    } 
	.food-item .content .name{
        margin:2px 0 8px 0;
        height: 14px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27)
	}
    .food-item .content .desc{
		margin-bottom:8px;
		line-height: 12px;
		font-size: 10px;
		color: rgb(147,153,159)
	}
	.food-item .content .extra{
		line-height: 10px;
		font-size: 10px;
		color: rgb(147,153,159)
	}
	.food-item .content .extra .count{
		margin-right:12px;
	}
	.food-item .content .price{
		font-weight: 700;
		line-height: 24px;
	}	
    .food-item .content .price .now{
		margin-right:8px;
		font-size: 14px;
		color:rgb(240,20,20);
	}	
	.food-item .content .price .old{
		text-decoration: line-through;
		font-size: 10px;
		color: rgb(147,153,159)
	}	
	.cartcontrol-wrapper{
		position: absolute;
		right: 0;
		bottom:12px;
	} 
</style>
