<template>
	<div class="shopcart">
		 <div class="content" @click="toggleList()">
			 	<div class="content-left">
			 	 	<div class="logo-wrapper">
			 	 		<div class="logo" :class="{'highlight':totalCount>0}">
			 	 			<i class="icon-shopping_cart"></i>
			 	 		</div>
			 	 		<div class="num" v-show="totalCount>0">
			 	 			{{totalCount}}
			 	 		</div>
			 	 	</div>
			 	 	<div class="price" :class="{'highlight':totalPrice>0}">
			 	 		 ￥{{totalPrice}}
			 	 	</div>
			 	 	<div class="desc">
			 	 		 另需配送费￥{{deliveryPrice}}元
			 	 	</div> 
			 	</div> 
			 	<div class="content-right">
			 	 	<div class="pay" :class="payclass">
			 	 		 {{paydesc}}
			 	 	</div>
			 	</div> 
		 </div>
		 <!-- <div class="ball-container">
		 	 <div v-for="ball in balls" v-show="ball.show" transition="drop" class="ball">
		 	 	 <div class="inner inner-hook"></div>
		 	 </div>
		 </div>  -->
		<div class="shopcart-list" v-show="listShow" transition="fold">
			<div class="list-header">
				<h1 class="title">购物车</h1>
				<span class="empty" @click="empty()">清空</span>
			</div>
			<div class="list-content" v-el:list-content>
				<ul>
					<li class="food border-1px" v-for="food in selectFoods">
						<span class="name">{{food.name}}</span>
						<div class="price">
							<span>￥{{food.price * food.count}}</span>
						</div>
    					<div class="cartcontrol-wrapper">
    						<cartcontrol :food="food"></cartcontrol>
    					</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template> 

<script>
import cartcontrol from 'components/cartcontrol/cartcontrol.vue'
import BScroll from 'better-scroll';

export default {
    data(){
        return {
        	/*balls:[
        		{
        			show:false,
        		},
        		{
        			show:false,
        		},
        		{
        			show:false,
        		},
        		{
        			show:false,
        		},
        		{
        			show:false,
        		}
        	],
        	dropBall:[]*/
        	fold:true
        } 
	},	
	components:{
      cartcontrol
    },
   props:{
   		selectFoods:{
   			type:Array,
   			default(){
   				return [
   				{
   					price:10,
   					count:1
   				}
   				];
   			}
   		},
 		deliveryPrice:{
 			type:Number,
 			default:0
 		},
 		minPrice:{
 			type:Number,
 			default:0
 		}
    },
    computed:{
    	totalPrice(){
    		let total=0;
    		this.selectFoods.forEach((food)=>{
    			total += food.price * food.count

    		})

    		return total; 

    	},
    	totalCount(){
    		let count= 0;
    		this.selectFoods.forEach((food)=>{
    			count +=food.count
    		})
    		return count;
    	},
    	paydesc(){
    		 
    		if(this.totalPrice===0)
    		{
    			return  `￥${this.minPrice}元起送` 
    		}
    		else if(this.totalPrice<this.minPrice)
    		{
    			let diff=this.minPrice - this.totalPrice
    			return  `还差￥${diff}元起送`	
    		}
    		else
    		{
                return '去结算'
    		}
    	},
    	payclass(){
    		if(this.totalPrice<this.minPrice)
    		{ 
    			return  'not-enough'	
    		}
    		else
    		{
                return 'enough'
    		}
    	},
    	listShow(){
    		if(!this.totalCount)
    		{
    			this.fold=true;
    			return false;
    		}
    		let show = !this.fold;
    		if(show)
    		{
    		  this.$nextTick(()=>{  //vue的dom变化是在$nextTick方法后执行的 
            	if(!this.scroll)
            	 {
            	 	this.scroll = new BScroll(this.$els.listContent,{
	   	 		      click:true                   
	   	 	        }); 
            	 }   
              })
    		} 
    		return show;
    	}
    },
    methods:{
    	drop(el){
            /*for(let i= 0;i<this.balls.length;i++){
           		let ball =this.balls[i]
				if(!ball.show)
				{
					ball.show = true;
					ball.el=el;
					this.dropBall.push(ball);
					return ;
				}          			
           }   */
           console.log(el)
    	},
    	toggleList(){
    		if(!this.totalCount){
    			return ;
    		}
    		this.fold=!this.fold;	
    	},
    	empty(){
    		this.selectFoods.forEach((food)=>{
    			food.count=0
    		})
    	}
    }/*,
    transitions:{
    	drop:{
    		beforeEnter(el){
    			let count= this.balls.length;
    			while(count--){
    				let ball =this.balls[count];
    				if(ball.show)
    				{
    					let  rect =ball.el.getBoundingClientRect();
    					let x=rect.left-32;
    					let y=-(window.innerHeight- rect.top -22);
    					el.style.display='';
    					el.style.webkitTransform=`translate3d(0,${y}px,0)`;
    					el.style.transform=`translate3d(0,${y}px,0)`;
    					let inner =el.getElementsByClassName('inner-hook')[0];
    					inner.style.webkitTransform=`translate3d(0,${x}px,0)`;
    					inner.style.transform=`translate3d(0,${x}px,0)`;
    				}
    			}
    		},
    		enter(el){
    			let rf = el.offsetHeight;
    			this.$nextTick(()=>{
    				el.style.webkitTransform='translate3d(0,0,0)';
					el.style.transform='translate3d(0,0,0)';
					let inner =el.getElementsByClassName('inner-hook')[0];
					inner.style.webkitTransform='translate3d(0,0,0)';
    				inner.style.transform='translate3d(0,0,0)';
    			})
    		},
    		afterEnter(el){
    			let ball =this.dropBalls.shift()
    			if(ball)
    			{
    				ball.show=false;
    				el.style.display='none'	
    			}
    		}	
    	}
    }*/
}	
</script>

<style scoped>
	 .shopcart{
	 	position: fixed;
	 	left:0;
	 	bottom:0;
	 	z-index:50;
	 	width: 100%;
	 	height: 48px;
	  
	 }
	 .content{
	 	display: flex;
	 	background-color: #141d27;
	 	 
	 }
	 .content .content-left{
        flex:1;
        font-size: 0;
	 }
	 .logo-wrapper{
 		display: inline-block;
		position: relative;
		top:-10px;
		margin:0 12px;
		padding: 6px;
		width: 56px;
		height: 56px;
		box-sizing: border-box;
		background-color: #141d27;
		vertical-align: top;
		border-radius: 50%;
	 }
	 .logo-wrapper .logo{
	 	width: 100%;
	 	height: 100%;
	 	border-radius: 50%;
	 	background-color: #2B343C;
	 	text-align: center;
	 } 
	 .logo-wrapper .icon-shopping_cart{
	 	color: #80858A;
	 	font-size: 24px;
	 	line-height:44px ;
	 }
	 .logo.highlight{
	 	background-color: rgb(0,160,220);
	 }
     .logo.highlight .icon-shopping_cart{
	 	color: #fff;

	  }
	 .logo-wrapper .num{
        position: absolute;
        top:0 ;
        right: 0;
        width: 24px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 16px;
        font-size: 9px;
        font-weight: 700;
        color: #fff;
        background:rgb(240,20,20);
        box-shadow:0 4px 8px 0 rgba(0,0,0,0.4);
	 }
	 .price{
		display: inline-block;
		vertical-align: top;
		line-height: 24px;
		margin-top:12px;
		box-sizing: border-box;
		padding-right:12px;
		border-right: 1px solid rgba(255,255,255,0.1);
		font-size: 16px;
		font-weight: 700;
		color: #80858A; 
	 }
	 .price.highlight{
	 	color: #fff
	 }
	 .desc{
		display: inline-block;
		vertical-align: top;
		margin:12px 0 0 12px;
		line-height: 24px;
		color:rgba(255,255,255,0.4);
		font-size: 12px;
	 }

	 .content .content-right{
	 	flex:0 0 105px;
	 	width: 105px ;
	 	
	 }
	 .content .content-right .pay{
	 	line-height: 48px;
	 	height: 48px;
	 	text-align: center;
	 	font-size: 14px;
	 	color:rgba(255,255,255,0.4);
	 	
	 }
	 .content .content-right .pay.not-enough{
		background-color: #2B333B;
	 }
	 .content .content-right .pay.enough{
	 	background-color: #00b43c;
	 	color: #fff
	 }

	 /* .ball-container{
	 
	 } 
	 .ball{
	 	position: fixed;
	 	left:32px;
	 	bottom:22px;
	 	z-index:200;
	 }
	 .drop-transition{
	 	transition: all 0.4s;
	 	transition:all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
	 }
	 .inner{
	 	width: 16px;
	 	height: 16px;
	 	border-radius: 50%;
	 	background: rgb(0,160,220);
	 	transition: all 0.4s linear;
	 } */
     .shopcart-list{
     	position: absolute;
        top:0;
        left:0;
        z-index:-1;
        width: 100%;
     } 
     .fold-transition{
     	transition: all 0.5s;
     	transform: translate3d(0,-100%,0);	
     }
     .fold-enter,.fold-leave{
     	transform: translate3d(0,0,0);
     }
     .list-header{
     	height: 40px;
     	line-height: 40px;
     	padding: 0 18px;
     	background: #eee;
     	border-bottom:1px solid rgba(7,17,27,0.1);
     }
     .list-header .title{
		float: left;
		font-size: 14px;
		color: rgb(7,17,27)
     }
     .list-header .empty{
        float: right;
        font-size: 12px;
        color: rgb(0,160,220)
     }
	 .list-content{
	 	pading:18px;
	 	max-height: 217px;
	 	background: #fff;
	 	overflow:hidden;

	 }
	 .list-content .food{
		position: relative;
		padding: 12px 0;
		box-sizing: border-box;
	 }
	 .list-content .food:after{
	 	display: block;
   		position: absolute;
   		left:0;
   		bottom:0;
   		width: 100%;
   		border-top: 1px solid #C1BFBF;
   		content:''; 
	 }
	 .food .name{
	 	line-height: 24px;
	 	font-size: 14px;
	 	color: rgb(7,17,27);
	 }
	 .food .price{
	 	position: absolute;
	 	right: 90px;
	 	bottom:12px;
	 	line-height: 24px;
	 	font-size:14px;
	 	font-weight: 700;
	 	color: rgb(240,20,20)
	 }
	 .food .cartcontrol-wrapper{
	 	position: absolute;
	 	right:0px;
	 	bottom:11px;
	 }
</style>