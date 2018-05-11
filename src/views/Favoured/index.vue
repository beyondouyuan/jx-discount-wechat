<template>
	<div class="favoured-body">
		<img :src="'./static/image/'+item" v-for="(item,index) in imgList" :index="index">
	</div>	
</template>
<script>
	export default{
		name: 'Favoured',
		data(){
			return {
				imgList:['img_01@2x.png','img_02@2x.png','img_03@2x.png']
			}
		}
	}
</script>
<style lang="scss">
	.favoured-body img{
		width: 100%;
	    display: block;
	}
</style>