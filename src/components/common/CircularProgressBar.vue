<template>
  <canvas id="arc" width="60" height="60"></canvas>
  <!-- <div class="flex-wrapper">
    <div class="" v-if="value < 40">
      <svg viewBox="0 0 36 36" class="circular-chart orange">
        <path
          class="circle-bg"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          class="circle"
          :stroke-dasharray="`${(value, 100)}`"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20.35" class="percentage" value="value">
          {{ value }}
        </text>
      </svg>
      {{ value }}
    </div>

    <div class="single-chart" v-else-if="value >= 40 && value <= 75">
      <svg viewBox="0 0 36 36" class="circular-chart green">
        <path
          class="circle-bg"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          class="circle"
          :stroke-dasharray="`${(value, 100)}`"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20.35" class="percentage">60%</text>
      </svg>
    </div>

    <div class="single-chart">
      <svg viewBox="0 0 36 36" class="circular-chart blue">
        <path
          class="circle-bg"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          class="circle"
          stroke-dasharray="90, 100"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20.35" class="percentage">90%</text>
      </svg>
    </div>
  </div> -->
</template>
<script>
export default {
  name: 'Donut',
  props: {
    data: Number
  },
  data() {
    return {
      value: parseInt(this.data)
    }
  },
  methods: {
    setPercentClass() {
      this.value = parseInt(this.data)
      //* 10
      this.drawChartArc(0.33, 'arc')
    },
    toRadians(degrees) {
      return degrees * (Math.PI / 180)
    },

    // building from: http://jsfiddle.net/HETvZ/
    drawChartArc(percentage, canvasId) {
      // canvas and context for drawing
      var canvas = document.querySelector(`#${canvasId}`)
      var context
      if (canvas) {
        context = canvas.getContext('2d')
        var degrees = percentage * 360.0
        // degrees to radians
        var radians = this.toRadians(degrees)
        var arcX = 30
        var arcY = 30
        var radius = 25
        var startAngle = this.toRadians(270) // in radians
        var endAngle = radians + startAngle // in radians
        var anticlockwise = false

        // draw the arc
        context.beginPath()
        context.lineWidth = 5
        context.strokeStyle = 'rgb(250,50,50)'
        context.arc(arcX, arcY, radius, startAngle, endAngle, anticlockwise)
        context.stroke()
      }

      // calculating the arc
    }
  },
  created() {
    this.value = parseInt(this.data)

    let val = this.value / 100
    console.log('value', val)
    this.drawChartArc(val, 'arc')
  }
}
</script>
<style>
.flex-wrapper {
  display: flex;
  flex-flow: row nowrap;
}

.single-chart {
  width: 33%;
  justify-content: space-around;
}

.circular-chart {
  display: block;
  margin: 10px auto;
  max-width: 80%;
  max-height: 50px;
}

.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 3.8;
}

.circle {
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}

@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}

.circular-chart.orange .circle {
  stroke: #ff9f00;
}

.circular-chart.green .circle {
  stroke: #4cc790;
}

.circular-chart.blue .circle {
  stroke: #3c9ee5;
}

.percentage {
  fill: #666;
  font-family: sans-serif;
  font-size: 0.5em;
  text-anchor: middle;
}
</style>
