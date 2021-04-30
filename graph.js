
//*****Global var
var lineA = {
  x: [],
  y: [],
  type: 'scatter',
  mode: 'lines',
  name: 'Object A',
  line: {
    color: 'rgb(219, 64, 82)'
  }
};

var lineB = {
  x: [],
  y: [],
  type: 'scatter',
  mode: 'lines',
  name: 'Object B',
  line: {
    color: 'rgb(55, 128, 191)'
  }
};

var data = [lineA,lineB];


var axis_layout={
  showgrid: true,
  zeroline: true,
  showline: true,
  mirror: false,
  /*
  gridcolor: '#bdbdbd',
  gridwidth: 2,
  zerolinecolor: '#969696',
  zerolinewidth: 4,
  linecolor: '#636363',
  linewidth: 6,
  */
  
};
//clone Obj
var xaxis_layout=Object.assign({},axis_layout);
xaxis_layout.title= 'Time';
xaxis_layout.showticklabels=false;
//clone Obj
var yaxis_layout=Object.assign({},axis_layout);
yaxis_layout.title= 'Temperature (°C)';


var layout = {
  width: 700,
  height: 700,
  title: 'Temperature Changes towards thermal equilibrium',
  xaxis:xaxis_layout ,
  yaxis:yaxis_layout,
  annotations: [
    //x-axis arrow
    {
      // arrow head
      xref: 'paper',
      yref: 'paper',
      x: 1,
      y: 0,
      // arrow tail
      axref: "paper",
      ayref: "paper",
      ax: -0.0075,
      ay: 0,
      showarrow: true
    },
    //y-axis arrow
    {
      // arrow head
      xref: 'paper',
      yref: 'paper',
      x: 0,
      y: 1,
      // arrow tail
      axref: "paper",
      ayref: "paper",
      ax: 0,
      ay: -0.025,
      showarrow: true
    }
  ]
};
//***** End of Global var


function plotGraph(){
  Plotly.newPlot('graph', data,layout);
};
