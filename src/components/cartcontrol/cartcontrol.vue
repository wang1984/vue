<template>
	<div class="cartcontrol">
		<div class="decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart($event)">
			
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
       font-size: 24px;
       line-height: 24px; 
	   color: rgb(0,160,220);
	   
	   
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