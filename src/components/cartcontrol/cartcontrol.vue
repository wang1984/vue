<template>
	<div class="cartcontrol">
		<div class="decrease " v-show="food.count>0" @click="decreaseCart($event)" transition="move">
			<span class="inner icon-remove_circle_outline"></span>
		</div>
		<div class="count" v-show="food.count>0">{{food.count}}</div>
		<div class="add icon-add_circle"  @click="addCart($event)"></div>
	</div>
</template>
<script>
    import Vue from 'vue'

	export default {
		props:{
			food:{
				type:Object
			}
		},
		methods:{
		    addCart(event){//小心click事件因为 scroll框架的原因不生效
		    	if(!event._constructed)
		    	{
		    		return ;
		    	}
		    	if(!this.food.count)
		    	{
		    		Vue.set(this.food,'count',1) //注意这里
		    		this.food.count=1;
		    	}
		    	else
		    	{
		    		this.food.count+=1
		    	}
		    	this.$dispatch('cart.add',event.target)	
		    }, 
		    decreaseCart(event){//小心click事件因为 scroll框架的原因不生效
		    	if(!event._constructed)
		    	{
		    		return ;
		    	}
		    	if(this.food.count)
		    	{
		    		this.food.count--
		    	}
		    	 
		    }		
		}

	}
</script>
<style scoped>
    .cartcontrol{
    	font-size: 0;
    }
	.decrease{
       display: inline-block; 
       transition: all  0.4s linear; 
	}
	.move-transition{
		opacity: 1;
		transform: translate3d(0,0,0);	
	}
	.move-enter,.move-leave{
		opacity:0;
		transform: translate3d(24px,0,0);
	}

    .move-transition .inner{
    	 transition: all  0.4s linear; 
		 transform: rotate(0);
		 font-size: 24px;
		 color: rgb(0,160,220);
		 line-height: 24px; 
		 display: inline-block;
    }

    .move-enter .inner,.move-leave .inner{ 
		transform: rotate(180deg);
	}

	.count{
       display: inline-block;
       font-size: 14px;
       padding:0 12px;
       line-height: 24px;
       color: rgb(147,153,159);
       vertical-align: top ;
       width: 24px;
       text-align: center; 
	}
	.add{
       display: inline-block;
       font-size: 24px;
       line-height: 24px;
       color: rgb(0,160,220);
       
	}

</style>