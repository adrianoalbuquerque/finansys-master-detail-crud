import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  months = [
    {name: 'Selecione um mês', value: 0},
    {name: 'Janeiro', value: 1},
    {name: 'Fevereiro', value: 2},
    {name: 'Março', value: 3},
    {name: 'Abril', value: 4},
    {name: 'Maio', value: 5},
    {name: 'Junho', value: 6},
    {name: 'Julho', value: 7},
    {name: 'Agosto', value: 8},
    {name: 'Setembro', value: 9},
    {name: 'Outubro', value: 10},
    {name: 'Novembro', value: 11},
    {name: 'Dezembro', value: 12},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  generateReports(): void {

  }

}
