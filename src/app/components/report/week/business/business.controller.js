import echarts from 'echarts';
class BusinessController {
	constructor() {
		this.name = 'business';
		this.chartOptions = {
			
			legend: {
				data:['直接访问','搜索引擎']
			},
			grid: {
				left: '0',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis : [
				{
					type : 'category',
					boundaryGap : false,
					data : ['周一','周二','周三','周四','周五','周六','周日']
				}
			],
			yAxis : [
				{
					type : 'value',
					show : false
				}
			],
			series : [
				
				{
					name:'直接访问',
					type:'line',
					stack: '总量',
					areaStyle: {normal: {}},
					data:[320, 332, 301, 334, 390, 330, 320]
				},
				{
					name:'搜索引擎',
					type:'line',
					stack: '总量',
					label: {
						normal: {
							show: true,
							position: 'top'
						}
					},
					areaStyle: {normal: {}},
					data:[820, 932, 901, 934, 1290, 1330, 1320]
				}
			]
		};
	}
}

export default BusinessController;
