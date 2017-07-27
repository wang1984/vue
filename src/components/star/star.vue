<template>
	<div class="star" :class="starType">
	 
		<span v-for="itemClass in itemClasses" track-by="$index" :class="itemClass" class="star-item"></span>
	    }
	</div>
</template>
<script type="text/javascript">
    const  LENGTH=5;
    const  CLS_ON="on"
    const  CLS_HALF="half"
    const  CLS_OFF="off"

	export default {
		props:{
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		computed:{
			starType(){
				return 'star-'+this.size;
				//现在在样式表中只有48 所以我只用48为例
			},
			itemClasses(){
 				let result=[];
 				let score=Math.floor(this.score * 2 )/2	;  // 4.3=>4   
 				let hasDecimal= score %1 !==0; // 是否有半个星
 				let integer = Math.floor(score)// 全星的数量
 				for(let i=0;i<integer;i++){
 					result.push(CLS_ON);
 				}
 				if(hasDecimal){
 					result.push(CLS_HALF);
 				}
 				while(result.length<LENGTH){
 					result.push(CLS_OFF);
 				}
 				return result
			}
		}
	}
</script>
<style scoped>
      .star{
      	font-size: 0;
      } 
      .star-item{
	  	display: inline-block;
	  	background-repeat: no-repeat;
	  }
	  .star-48 .star-item{
		width: 20px;
		height: 20px;
		margin-right: 22px;
		background-size: 20px;		
	  }
	  .star-48 .star-item:last-child{
	  	margin-right:0;
	  }
      .star-48 .on{
         background-image: url(images/star48_on@2x.png);
      }
      .star-48 .half{
		 background-image: url(images/star48_half@2x.png);	
      }
      .star-48 .off{
         background-image: url(images/star48_off@2x.png);
      }
</style>