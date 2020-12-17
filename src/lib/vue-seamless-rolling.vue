<template>
  <div class="wfgd">
    <ul
      :style="[ulStyle, ulAnimate]"
      :class="[{ wfgdUl: true }, { ulAnimate: isAnimate ? true : false }]"
    >
      <li
        :class="[itemClass, 'wfgdLi']"
        v-for="(item, index) in list"
        :key="index + 1"
        :style="liStyle"
      >
        <span v-for="(it, index) in item" :key="index + 2">{{ it }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "VueSeamlessRolling",
  props: {
    dataList: {
      type: Array,
      default: null,
    },
    // 每行高度
    itemHeight: {
      type: Number,
      default: 24,
    },
    // 每行字号
    itemFontSize: {
      type: Number,
      default: 14,
    },
    // 每屏显示几个
    itemSum: {
      type: Number,
      default: 5,
    },
    // 每屏显示条数
    animate: {
      type: Boolean,
      default: false,
    },
    // 向上滚动动画时间
    animateTime: {
      type: Number,
      default: 500,
    },
    // 滚动速度(ms)
    step: {
      type: Number,
      default: 2000,
    },
    // 自定义样式
    itemClass: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      list: this.dataList,
      isAnimate: this.animate,
      interval: null,
      ulStyle: {
        width: "100%",
        height: this.itemHeight * this.itemSum + "px",
        overflow: "hidden",
        paddingTop: this.paddingTop + "px",
      },
      liStyle: {
        width: "100%",
        height: this.itemHeight + "px",
        lineHeight: this.itemHeight + "px",
        fontSize: this.itemFontSize + "px",
      },
    };
  },
  computed: {
    ulAnimate() {
      if (this.isAnimate) {
        let res = {
          transition: " all " + this.animateTime / 1000 + "s",
          marginTop: "-" + this.itemHeight + "px",
          height: this.itemHeight * (this.itemSum + 1) + "px",
        };
        return res;
      } else {
        return {};
      }
    },
  },
  watch: {
    dataList: {
      handler(ne) {
        this.isAnimate = false;
        clearInterval(this.interval);
        this.list = [];
        this.list = JSON.parse(JSON.stringify(ne));
        this.goScroll();
      },
      deep: true,
    },
  },
  methods: {
    goScroll() {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.isAnimate = true;
        this.list.push(this.list[0]);
        setTimeout(() => {
          this.list.shift();
          this.isAnimate = false;
        }, this.animateTime);
      }, this.step);
    },
  },
  beforeDestroy() {
    this.isAnimate = false;
    this.list = [];
    clearInterval(this.interval);
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.wfgd {
  overflow: hidden;
}
.wfgdUl {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.wfgdLi {
  display: flex;
  justify-content: space-around;
}
</style>