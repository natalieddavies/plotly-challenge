const url = "https://raw.githubusercontent.com/natalieddavies/plotly-challenge/master/data/samples.json"
  
// READ IN DATA
d3.json(url).then(data => {
  // ADD TO THE DROPDOWN ID SELECTION MENU
  var dropdownSelection = data.names
  dropdownSelection.forEach(name => {d3.select("select").append("option").text(String(name)).attr("value", String(name));})
}); 
              
// WHEN DROPDOWN ID SELECTION IS CHANGED IN selDataset, CALL OPTION CHANGE AS LINKED IN HTML
d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged(){
  var dropdownMenu = d3.select("#selDataset");
  var selectedFromMenu = dropdownMenu.property("value");

    d3.json(url).then(data => {
        var samplesArray = data.samples
        var idList = samplesArray.map(d => d.id);
        var indexFromSampleIDList = idList.findIndex(data => {
          return data === String(selectedFromMenu) 
        });          
          
        makeBarChart(indexFromSampleIDList);
        makeBubbleChart(indexFromSampleIDList);
        loadMetadata(indexFromSampleIDList);
    });

};

function loadMetadata(index){
  d3.json(url).then(selectedFromMenu => {
     var paneldata = selectedFromMenu.metadata[index];
   d3.select("#sample-metadata").html(`ID: ${paneldata.id}<br/>Ethnicity: ${paneldata.ethnicity}<br/> Gender: ${paneldata.gender}<br/> Age: ${paneldata.age}<br/> Location: ${paneldata.location}<br/> BBType: ${paneldata.bbtype}<br/> Wfreq: ${paneldata.wfreq}<br/>`)})
  };


// _______________________________________________________________BAR  CHART _______________________________________________________________________//
function makeBarChart(index) {
  d3.json(url).then(selectedFromMenu => {

   var sampleID =  selectedFromMenu.samples[index]
   var sortedList = [];
   var x = [];
   var y = [];
   var labels = [];
   
// SORT SAMPLE VALUES
  for (var $ = 0; $ < sampleID.sample_values.length; $++) 
      sortedList.push({'sample_values': sampleID.sample_values[$], 'otu_ids': "OTU" + String(sampleID.otu_ids[$]), 'otu_labels':sampleID.otu_labels[$]});

  sortedList.sort(function(a, b) { 
      return ((b.sample_values - a.sample_values));
      });

  if (sampleID.sample_values.length >= 10){

  for (var _ = 0; _ < 10; _++) {
      x.push(sortedList[_].sample_values);
      y.push(sortedList[_].otu_ids);
      labels.push(sortedList[_].otu_labels);
   };
  };

// SHOW UP TO 10 VALUES
   if (sampleID.sample_values.length < 10){
      for (var _ = 0; _ < sampleID.sample_values.length ; _++) {
        x.push(sortedList[_].sample_values);
        y.push(sortedList[_].otu_ids);
        labels.push(sortedList[_].otu_labels);
       };
  };
      var x = x;
      var y = y;
      var data = [{type: 'bar', x: x, y: y, text: labels, orientation: 'h'}];

    var layout = {yaxis:{autorange:'reversed'}}

    Plotly.newPlot('bar', data, layout)})};

// _______________________________________________________________BUBBLE  CHART _______________________________________________________________________//    

function makeBubbleChart(index) {
      d3.json(url).then(selectedFromMenu => {
  
      var sampleID =  selectedFromMenu.samples[index]
      var x = sampleID.otu_ids
      var y = sampleID.sample_values
      var markerSize = sampleID.sample_values
      // var markerColor = sampleID.otu_ids

      var trace1 = {x: x, y: y, mode: 'markers', marker: {color:
        ['#ff0000', '#ffa500', '#ffff00', '#008000', '	#0000ff', '#0000ff', '#ee82ee', '	#cf9239', '	#68bd6f', '	#19d3bf', '	#8d8a71', 
        '#e66d88', '#ff0000', '#ffa500', '#ffff00', '#008000', '	#0000ff', '#0000ff', '#ee82ee', '	#cf9239', '	#68bd6f', '	#19d3bf', 
        '#8d8a71', '#e66d88', '#ff0000', '#ffa500', '#ffff00', '#008000', '	#0000ff', '#0000ff', '#ee82ee', '	#cf9239', '	#68bd6f', '#19d3bf'],size: markerSize}};
        // REPEATED SAME HEX CODE A FEW TIMES TO ENSURE NO PLAIN COLOURS
        
        var data = [trace1];
        var layout = {xaxis: {title: {text: 'OTU ID'}}};

Plotly.newPlot('bubble', data, layout)})};


// ____________________________________________________________________________________________________________________________________________________//
function init(){
  makeBarChart(0);
  makeBubbleChart(0);
  loadMetadata(0);
};

// ____________________________________________________________________________________________________________________________________________________
init();