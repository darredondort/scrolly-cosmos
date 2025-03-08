// import { Chart, ChartConfiguration, ChartTypeRegistry } from 'chart.js/auto'

// interface DataPoint {
//   label: string;
//   value: number;
// }

// async function createChart() {
//   const chData: DataPoint[] = [
//       {
//         "label" : "Vens Venes Venat Venal",
//         "value" : 756,
//       },
//       {
//         "label" : "Carrer Bici Carril Carrers",
//         "value" : 555,
//       },
//       {
//         "label" : "Barcelona Ciutat Metropolitana Activa",
//         "value" : 502,
//       },
//       {
//         "label" : "Infants Infantils Infantil Famlies",
//         "value" : 494,
//       },
//       {
//         "label" : "Economia Econmics Econmica Solidria",
//         "value" : 290,
//       },
//       {
//         "label" : "Habitatge Habitatges Pisos Lloguer",
//         "value" : 219,
//       },
//       {
//         "label" : "Bus Parada Freqncia Autobusos",
//         "value" : 205,
//       },
//       {
//         "label" : "Escolars Escolar Escola Camins",
//         "value" : 171,
//       },
//       {
//         "label" : "Trnsit Transit Pacificar Pacificaci",
//         "value" : 146,
//       },
//       {
//         "label" : "Energtica Eficincia Energtic Energies",
//         "value" : 144,
//       },
//       {
//         "label" : "Zones Verdes Gossos Nomencltor",
//         "value" : 136,
//       },
//       {
//         "label" : "Socials Social Serveis Drets",
//         "value" : 133,
//       },
//       {
//         "label" : "Treball Xarxa Treballar Treballs",
//         "value" : 129,
//       },
//       {
//         "label" : "Font Fonts Fargues Guatlla",
//         "value" : 129,
//       },
//       {
//         "label" : "Plantes Planta Arbres Basuras",
//         "value" : 124,
//       },
//       {
//         "label" : "Rehabilitaci Rehabilitar Finques Edificis",
//         "value" : 122,
//       },
//       {
//         "label" : "Educaci Educativa Educatiu Educatives",
//         "value" : 122,
//       },
//       {
//         "label" : "Pblic Espai Espais Pblics",
//         "value" : 121,
//       },
//       {
//         "label" : "Solars Solar Buits Dess",
//         "value" : 119,
//       },
//       {
//         "label" : "Barrio Barrios Espacios Ciudad",
//         "value" : 114,
//       }
//   ];

//   const config: ChartConfiguration<keyof ChartTypeRegistry, DataPoint[], number> = {
//     type: 'bar',
//     data: {
//       labels: chData.map(row => row.label),
//       datasets: [
//         {
//           label: 'Acquisitions by year',
//           data: chData.map(row => row.value)
//         }
//       ]
//     }
//   };

//   const ctx = document.getElementById('acquisitions') as HTMLCanvasElement;
//   new Chart(ctx, config);
// }

// createChart();






























// import { Chart, ChartConfiguration, ChartTypeRegistry } from 'chart.js/auto';
// import { interpolatePlasma } from 'd3-scale-chromatic';

// interface DataPoint {
//   label: string;
//   value: number;
// }

// async function createChart() {
//   const chData: DataPoint[] = [
//     {
//       "label" : "Vens Venes Venat Venal",
//       "value" : 756,
//     },
//     {
//       "label" : "Carrer Bici Carril Carrers",
//       "value" : 555,
//     },
//     {
//       "label" : "Barcelona Ciutat Metropolitana Activa",
//       "value" : 502,
//     },
//     {
//       "label" : "Infants Infantils Infantil Famlies",
//       "value" : 494,
//     },
//     {
//       "label" : "Economia Econmics Econmica Solidria",
//       "value" : 290,
//     },
//     {
//       "label" : "Habitatge Habitatges Pisos Lloguer",
//       "value" : 219,
//     },
//     {
//       "label" : "Bus Parada Freqncia Autobusos",
//       "value" : 205,
//     },
//     {
//       "label" : "Escolars Escolar Escola Camins",
//       "value" : 171,
//     },
//     {
//       "label" : "Trnsit Transit Pacificar Pacificaci",
//       "value" : 146,
//     },
//     {
//       "label" : "Energtica Eficincia Energtic Energies",
//       "value" : 144,
//     },
//     {
//       "label" : "Zones Verdes Gossos Nomencltor",
//       "value" : 136,
//     },
//     {
//       "label" : "Socials Social Serveis Drets",
//       "value" : 133,
//     },
//     {
//       "label" : "Treball Xarxa Treballar Treballs",
//       "value" : 129,
//     },
//     {
//       "label" : "Font Fonts Fargues Guatlla",
//       "value" : 129,
//     },
//     {
//       "label" : "Plantes Planta Arbres Basuras",
//       "value" : 124,
//     },
//     {
//       "label" : "Rehabilitaci Rehabilitar Finques Edificis",
//       "value" : 122,
//     },
//     {
//       "label" : "Educaci Educativa Educatiu Educatives",
//       "value" : 122,
//     },
//     {
//       "label" : "Pblic Espai Espais Pblics",
//       "value" : 121,
//     },
//     {
//       "label" : "Solars Solar Buits Dess",
//       "value" : 119,
//     },
//     {
//       "label" : "Barrio Barrios Espacios Ciudad",
//       "value" : 114,
//     }
// ];

//   // Sort data in descending order for better visualization
//   chData.sort((a, b) => b.value - a.value);

//   // Calculate color scale based on data values
//   const maxValue = Math.max(...chData.map(d => d.value));
//   const getColor = (value: number) => interpolatePlasma(value / maxValue);

//   const config: ChartConfiguration<keyof ChartTypeRegistry, DataPoint[], number> = {
//     type: 'bar',
//     data: {
//       labels: chData.map(row => row.label),
//       datasets: [
//         {
//           label: 'chart-01',
//           data: chData.map(row => row.value),
//           backgroundColor: chData.map(row => getColor(row.value)),
//           borderColor: 'rgba(40, 32, 48, 0.1)',
//           borderWidth: 1
//         }
//       ]
//     },
//     options: {
//       indexAxis: 'y', // Make the chart horizontal
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         tooltip: {
//           enabled: false,
//           external: externalTooltipHandler
//         },
//         legend: {
//           display: false // Hide legend as it's not needed for this chart
//         }
//       },
//       scales: {
//         x: {
//           beginAtZero: true,
//           title: {
//             display: true,
//             text: 'Value'
//           },
//           grid: {
//             color: 'rgba(200, 200, 200, 0.3)',
//             display: false
//           }
//         },
//         y: {
//           ticks: {
//             autoSkip: false,
//             callback: function(value) {
//               const label = this.getLabelForValue(value as number);
//               return label.length > 100 ? label.substr(0, 180) + '...' : label;
//             },
//           color: '#ECE6F0'
//           },
//           grid: {
//             color: 'rgba(200, 200, 200, 0.3)',
//             display: false
//           }
//         }
//       }
//     }
//   };

//   const ctx = document.getElementById('chart-01') as HTMLCanvasElement;
//   new Chart(ctx, config);
// }

// // Custom tooltip handler
// function externalTooltipHandler(context: any) {
//   const { chart, tooltip } = context;
//   let tooltipEl = chart.canvas.parentNode.querySelector('div');

//   if (!tooltipEl) {
//     tooltipEl = document.createElement('div');
//     tooltipEl.style.background = 'rgba(40, 32, 48, 0.7)';
//     tooltipEl.style.borderRadius = '3px';
//     tooltipEl.style.color = '#ECE6F0';
//     tooltipEl.style.opacity = '1';
//     tooltipEl.style.pointerEvents = 'none';
//     tooltipEl.style.position = 'absolute';
//     tooltipEl.style.transform = 'translate(-50%, 0)';
//     tooltipEl.style.transition = 'all .1s ease';

//     const table = document.createElement('table');
//     table.style.margin = '0px';

//     tooltipEl.appendChild(table);
//     chart.canvas.parentNode.appendChild(tooltipEl);
//   }

//   if (tooltip.opacity === 0) {
//     tooltipEl.style.opacity = '0';
//     return;
//   }

//   if (tooltip.body) {
//     const titleLines = tooltip.title || [];
//     const bodyLines = tooltip.body.map((b: any) => b.lines);

//     const tableHead = document.createElement('thead');
//     titleLines.forEach((title: string) => {
//       const tr = document.createElement('tr');
//       tr.style.borderWidth = '0';

//       const th = document.createElement('th');
//       th.style.borderWidth = '0';
//       const text = document.createTextNode(title);

//       th.appendChild(text);
//       tr.appendChild(th);
//       tableHead.appendChild(tr);
//     });

//     const tableBody = document.createElement('tbody');
//     bodyLines.forEach((body: string[], i: number) => {
//       const colors = tooltip.labelColors[i];

//       const tr = document.createElement('tr');
//       tr.style.backgroundColor = 'inherit';
//       tr.style.borderWidth = '0';

//       const td = document.createElement('td');
//       td.style.borderWidth = '0';

//       const text = document.createTextNode(body.join(': '));

//       td.appendChild(text);
//       tr.appendChild(td);
//       tableBody.appendChild(tr);
//     });

//     const tableRoot = tooltipEl.querySelector('table');
//     while (tableRoot.firstChild) {
//       tableRoot.firstChild.remove();
//     }

//     tableRoot.appendChild(tableHead);
//     tableRoot.appendChild(tableBody);
//   }

//   const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

//   tooltipEl.style.opacity = '1';
//   tooltipEl.style.left = positionX + tooltip.caretX + 'px';
//   tooltipEl.style.top = positionY + tooltip.caretY + 'px';
//   tooltipEl.style.font = tooltip.options.bodyFont.string;
//   tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
// }

// createChart();
