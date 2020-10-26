# plotly-challenge


In this assignment, I built an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

Using the D3 library to read in `samples.json`, I created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual. I used `sample_values` as the values for the bar chart, `otu_ids` as the labels for the bar chart and `otu_labels` as the hovertext for the chart.

I then created a bubble chart that displays each sample. I used `otu_ids` for the x values, `sample_values` for the y values,`sample_values` for the marker size, made my own marker colours and used 'otu_labels` for the text values.

I displayed the sample metadata for an individual's demographic information which changes on a new selection. I also displayed each key-value pair from the metadata JSON object somewhere on the page.

All of the plots are updatable any time that a new sample is selected.
