import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Chart} from 'chart.js';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {

  public dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [],
        }
    ],
    labels: []
};

constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.http.get('http://161.35.96.14/expense/expenseData')
    .subscribe((res: any) => {
      console.log(res);
      for(var i = 0; i < res.length; i++) {
       this.dataSource.datasets[0].data[i] = res[i].value;
       this.dataSource.labels[i] = res[i].title;
       this.dataSource.datasets[0].backgroundColor[i] = res[i].color;
       this.createChart();

      }
    });
  }

  createChart() {
    var ctx = document.getElementById('myPiChart');
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
    var ctx = document.getElementById('myBarChart');
    var mybarChart = new Chart(ctx, {
      type: 'bar',
      data: this.dataSource
  });

    var ctx = document.getElementById('myDoughnutChart');
    var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: this.dataSource
});
  }
}
