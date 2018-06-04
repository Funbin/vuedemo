<template>
  <div class="home">
    <div class="home__title">
      <div class="home__title_default" :class="{'home__title_selected':currentType === 'in_theaters'}" @click="submit('in_theaters')">正在热映</div>
      <div class="home__title_default" :class="{'home__title_selected':currentType === 'coming_soon'}" @click="submit('coming_soon')">即将上映</div>
    </div>
    <movie :type="currentType"></movie>
  </div>
</template>
<script>
  import Movie from '../components/movie'
  export default {
    name: 'home',
    data() {
      return {
        currentType: 'in_theaters',
      }
    },
    components: {
      Movie,
    },
    mounted() {
    },
    methods: {
      submit(value) {
        this.currentType = value;
      },
    }
  }
</script>

<style lang="less" scoped>
  @import url(../assets/less/base);
  @borderColor: #FF2244;
  .home {}

  .home__title {
    display: flex;
    padding: 0 .25rem;
  }

  .home__title_default {
    flex: 1;
    height: .9rem;
    line-height: .9rem;
    font-size: .4rem;
    border-bottom: 1px solid @borderColor;
    text-align: center;
    color: #6A6A6A;
    box-sizing: border-box;
  }

  .home__title_selected {
    border-bottom: 3px solid @borderColor;
    color: @borderColor;
  }
</style>
