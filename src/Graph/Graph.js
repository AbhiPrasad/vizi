import React from 'react';
import '../../bower_components/c3/c3.min.css';
import C3Chart from 'react-c3js';

const Graph = ({ data, axis }) => {
  return (
    <div className="graph">
      <C3Chart data={data} axis={axis}> </C3Chart>
    </div>
  );
}

export default Graph;