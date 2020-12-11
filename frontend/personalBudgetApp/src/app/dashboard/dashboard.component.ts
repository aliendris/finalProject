import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {Chart} from 'chart.js';

interface color{
  value: string;
  viewValue: string;
  }


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private configuredService: ConfigService,
              private validateInput: ActivatedRoute) {
    this.dashboardForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      value: new FormControl(null, Validators.required),
      color: new FormControl(null, Validators.required)

    });
  }


  successMessage: String = '';
  dashboardForm: FormGroup;

  selectedValue: string;
  colors: color[] = [
    {value: '#008000', viewValue: 'Green'},
    {value: '#00FF00', viewValue: 'Lime'},
    {value: '#00FFFF', viewValue: 'Aqua'},
    {value: '#FF0000', viewValue: 'Red'},
    {value: '#FFFF00', viewValue: 'Yellow'},
    {value: '#800080', viewValue: 'Purple'},
    {value: '	#E9967A', viewValue: 'DarkSalmon'}
  ];




//    dataSource = {
//     datasets: [
//         {
//          data: [],
//          backgroundColor: [],
//         }
//     ],

//     labels: []
// };

  // onColorPick(colorSelection) {
  //   console.log('piked color...');
  //   let selectedColor = colorSelection.value;
  //   console.log(selectedColor);
  // }

       ngOnInit() {
       }
         isValid(controlName) {
           return this.dashboardForm.get(controlName).invalid && this.dashboardForm.get(controlName).touched;
         }

      add(){
        console.log(this.dashboardForm.value);

        if (this.dashboardForm.valid) {
         this.configuredService.addExpense(this.dashboardForm.value)
          .subscribe(
            data => this.successMessage = 'Expense successfully added',
             error => this.successMessage = 'Registration error'
         );
        }
      }


// this.configuredService.getExpense(this.dataSource).subscribe((res: any) => {
//         for (var i = 0; i < res.dataSource.length; i++) {
//           this.dataSource.datasets[0].data[i] = res.data[i].value;
//           this.dataSource.labels[i] = res.data[i].title;
//           this.dataSource.datasets[0].backgroundColor[i] = res.data[i].color;

//         }
//         this. createChart();
//       });


// createChart(){
//       var ctx = document.getElementById('myChart');
//       var myPieChart = new Chart(ctx, {
//       type: 'pie',
//       data: this.dataSource
//       })
//     }

}
