<template>
  <div id="app">
    <div class="nav">
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <ul class="nav__ul">
        <li class="nav__li">
          <router-link class="nav__li_link" :class="{'nav__link_selected':currentLink === '/home'}" to="/home">电影</router-link>
        </li>
        <li class="nav__li">
          <router-link class="nav__li_link" :class="{'nav__link_selected':currentLink === '/about'}" to="/about">测试1</router-link>
        </li>
        <!-- <li class="nav__li"><router-link class="nav__li_link" :class="{'nav__link_selected':currentLink === '/test'}" to="/test">测试2</router-link></li> -->
      </ul>
    </div>
    <div class="main">
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    computed: {
      currentLink() {
        return this.$route.path;
      }
    }
  }
</script>

<style>
  @import "./assets/reset.css";
  * {
    margin: 0;
    padding: 0;
  }

  .nav {
    font-size: .3rem;
    z-index: 9999;
    border-bottom: 1px solid #eee;
  }

  .nav__ul {
    list-style: none;
    width: 100%;
    display: flex;
    color: #333;
  }

  .nav__li {
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    background: white;
    flex: 1;
  }

  .nav__li_link {
    text-decoration: none;
    color: #333;
  }

  .nav__link_selected {
    color: #20A0FF;
  }

  .main {
    width: 100%;
    margin-right: 25px;
    font-size: .3rem;
    padding-bottom: .8rem;
    box-sizing: border-box;
    color: #333;
    background: #fff;
  }
</style>
