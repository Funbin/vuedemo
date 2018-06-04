<template>
  <div class="mask" v-show="value">
    <el-button @click="close">关闭</el-button>
    <div>I'm Dialog</div>
  </div>
</template>
<script type="text/babel">
  export default{
    name:"dialog",
    props:['value'],//必须包含value属性
    methods:{
      close(){
        this.$emit('input', false);//必须触发input
      }
    }
  }
</script>
<style type="text/css">
  .mask{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 5rem;
    height: 5rem;
    background: #fff;
    border: 1px solid #c5c5c5;
  }
</style>
