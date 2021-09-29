<script>
import VueCharts from "vue-chartjs";
import { Bar, mixins } from "vue-chartjs";
const { reactiveData } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveData],
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      options: {
        scales: {
            yAxes:[{  ticks: {
                       fontColor: "white",
                       //fontSize: 18,
                       //este es para detallar el numero o valores exactos que se estan mostrando
                      // stepSize: 1,
                       //beginAtZero: true
                   }
                   }],
            xAxes:[
              { ticks:{
                fontColor:"white"
              }

              }
            ]
          
          },
        legend: {
          labels: {
            // This more specific font property overrides the global property
            fontColor: "white",
          },
        },
        animation: { easing: "easeOutBounce" },
        responsive:true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
    console.log(this.chartdata);
  },
};
</script>