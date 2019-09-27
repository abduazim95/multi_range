<template>
  <div class="multi-range-block">
    <div class="range-inputs">
      <input type="number" v-model.lazy="minValue" />
      -
      <input type="number" v-model.lazy="maxValue" />
    </div>
    <div class="range-sliders">
      <i
        id="slider-min"
        class="sliders icon dot circle outline"
        :style="'left:' + getMinPos + '%'"
        @mousedown="changeMin"
      ></i>
      <div id="line"></div>
      <i
        id="slider-max"
        class="sliders icon dot circle outline"
        :style="'left:' + getMaxPos + '%'"
        @mousedown="changeMax"
      ></i>
    </div>
  </div>
</template>
<script>
export default {
  props: ['name'],
  data() {
    return {
      minValue: parseInt($(`[data-name=${this.name}]`).attr('min-value')),
      maxValue: parseInt($(`[data-name=${this.name}]`).attr('max-value')),
      minLimit: parseInt($(`[data-name=${this.name}]`).attr('data-min')),
      maxLimit: parseInt($(`[data-name=${this.name}]`).attr('data-max')),
      current: null
    };
  },
  computed: {
    getMaxPos() {
      return ((this.maxValue - this.minLimit) * 100 / (this.maxLimit - this.minLimit));
    },
    getMinPos() { 
      return ((this.minValue - this.minLimit) * 100 / (this.maxLimit - this.minLimit));
    }
  },
  watch: {
    minValue(value) {
      if (value > this.maxValue) {
        this.minValue = this.maxValue;
      }
      if (value < this.minLimit) {
        this.minValue = this.minLimit;
      }
    },
    maxValue(value) {
      if (value < this.minValue) {
        this.maxValue = this.minValue;
      }
      if (value > this.maxLimit) {
        this.maxValue = this.maxLimit;
      }
    }
  },
  methods: {
    changeMin() {
      const self = this;
      this.current = "minValue";
      $(window).on("mousemove", self.changePos);
    },
    changeMax() {
      const self = this;
      this.current = "maxValue";
      $(window).on("mousemove", self.changePos);
    },

    changePos(e) {
      let value = Math.ceil(
        ((e.pageX - $(".range-sliders").offset().left - $('.sliders').width()/2) * 100) /
          $(".range-sliders").width() * this.maxLimit/100
      );
      this[this.current] = value;
    },
    getValues() {
      return { minValue: this.minValue, maxValue: this.maxValue };
    }
  },
  created() {
    $(window).on("mouseup", function() {
      $(window).off("mousemove", self.changePos);
    });
  }
};
</script>
<style lang="scss">

$size: 30;

.range-inputs {
  margin: 25px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input[type="number"] {
    height: #{$size}px;
    border-radius: 5px;
    border: none;
    border: 1px solid black;
    width: 40%;
    text-align: right;
  }
}

.range-sliders {
  position: relative;
  height: #{$size}px;
  width: calc(100% - #{$size}px);
  .sliders {
    position: absolute;
    top:0;
    font-size: #{$size}px;
    cursor: pointer;
  }
  #line { 
    width: calc(100% + #{$size}px);
    top: 9px;
    position: absolute;
    border-top: 1px solid black;
  }
}
</style>