<template>
  <div class="home" v-loading.fullscreen.lock="isLoading">
    <div class="home__title">
      <div class="home__title_line"></div>
      <h1 class="home__title_value">{{ title }}</h1>
      <div class="home__title_line"></div>
    </div>
    <ul>
      <li class="home__li" v-for="article in articles" @click="toDouBan(article.alt)">
        <div>
          <img class="m-img" v-bind:src="article.images.large" />
        </div>
        <div class="m__content">
          <div class="m__title">
            <span class="m__title_name">{{article.title}}</span>
            <span class="m__title_points" v-show="isHot">{{article.rating.average}}</span>
          </div>
          <div>
            <span class="m__content_type">{{article.genres.join('/')}}</span>
          </div>
          <p class="m__content_other" v-show="article.directors.length">导演：{{article.directors.length>0?article.directors[0].name:''}}</p>
          <div class="m__content_other">
            <label>主演：</label>
            <span v-for="(item,index) in article.casts">{{item.name}} </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'home',
    props: {
      type: {
        type: String,
        default: 'in_theaters',
      }
    },
    data() {
      return {
        title: '正在热映',
        articles: [],
        isLoading: false,
      }
    },
    computed: {
      isHot() {
        return this.type === 'in_theaters';
      }
    },
    mounted() {
      document.title = this.title;
      this.isLoading = true;
      if (this.type === 'in_theaters') {
        this.title = '正在热映';
      } else {
        this.title = '即将上映';
      }
      this.$http.jsonp('https://api.douban.com/v2/movie/' + this.type + '?count=100', {}, {
        headers: {
        },
        emulateJSON: true
      }).then(function (response) {
        this.isLoading = false;
        this.articles = response.data.subjects;
        console.log(response);
      }, function (response) {
        console.log(response)
      });
    },
    methods: {
      toDouBan: function (value) {
        window.open(value, '_blank');
      }
    },
    watch: {
      title(newValue) {
        document.title = this.title;
      },
      type(newValue) {
        this.isLoading = true;
        if (newValue === 'in_theaters') {
          this.title = '正在热映';
        } else {
          this.title = '即将上映';
        }
        this.$http.jsonp('https://api.douban.com/v2/movie/' + newValue + '?count=30', {}, {
          headers: {
          },
          emulateJSON: true
        }).then(function (response) {
          this.isLoading = false;
          if (newValue === 'in_theaters') {
            this.articles = response.data.subjects.sort((a, b) => {
              return b.collect_count - a.collect_count;
            });
          } else {
            this.articles = response.data.subjects;
          }
        }, function (response) {
          console.log(response)
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url(../../assets/less/base);
  .home__li {
    border-bottom: 1px solid #eee;
    padding: 0.1rem 0.25rem;
    display: flex; // align-items: center;
    &:active {
      background: #f9f9f9;
    }
  }

  .home__title {
    display: flex;
    align-items: center;
    height: 1rem;
  }

  .home__title_value {
    color: #ff2244;
    font-size: 0.35rem;
  }

  .home__title_line {
    border-top: 1px solid #bbb;
    margin: 0 0.2rem;
    flex: 1;
  }

  .m-img {
    width: 2rem;
  }

  .m__content {
    margin-left: 0.15rem;
    flex: 1;
  }

  .m__title {
    display: flex;
    justify-content: space-between;
  }

  .m__title_name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 3.5rem;
  }

  .m__title_points {
    color: #ff7e0f;
    font-style: italic;
    white-space: nowrap;
  }

  .m__content_type {
    background: #eee;
    border-radius: 1rem;
    font-size: 0.24rem;
    color: #555;
    padding: 0.1rem;
    margin-left: -0.1rem;
  }

  .m__content_other {
    font-size: 0.24rem;
    color: #aaa;
    margin-top: 0.1rem;
  }

  .loading {
    position: fixed;
    z-index: 999;
    top: 50%;
    left: 50%;
    .transform(translate(-50%, -50%));
  }

  .loading img {
    width: 1rem;
    height: 1rem;
    .keyframes(loading, {
              from {
                transform: rotate(0);
                transform-origin: 50% 50%;
              }
              to {
                transform: rotate(360deg);
                transform-origin: 50% 50%;
              }
            }
            );
    .animation(loading 0.8s infinite linear);
  }
</style>
