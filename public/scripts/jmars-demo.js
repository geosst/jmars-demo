var QueryForm = React.createClass({
  getInitialState: function() {
    return {
      layers: 'MOLA_128ppd_shade_ne',
      styles: '',
      bbox: '-84.0,-26.0,-52.0,6.0',
      srs: 'JMARS:1,180.0,90.0',
      width: '256',
      height: '256',
      format: 'image/png',
      transparent: ''
    }
  },
  handleLayersChange: function(e) {
    this.setState({layers: e.target.value});
  },
  handleStylesChange: function(e) {
    this.setState({styles: e.target.value});
  },
  handleBBoxChange: function(e) {
    this.setState({bbox: e.target.value});
  },
  handleSRSChange: function(e) {
    this.setState({srs: e.target.value});
  },
  handleWidthChange: function(e) {
    this.setState({width: e.target.value});
  },
  handleHeightChange: function(e) {
    this.setState({height: e.target.value});
  },
  handleFormatChange: function(e) {
    this.setState({format: e.target.value});
  },
  handleTransparentChange: function(e) {
    this.setState({transparent: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var layers = this.state.layers.trim();
    var styles = this.state.styles.trim();
    var bbox = this.state.bbox.trim();
    var srs = this.state.srs.trim();
    var width = this.state.width.trim();
    var height = this.state.height.trim();
    var format = this.state.format.trim();
    var transparent = this.state.transparent.trim();

    this.props.onQuerySubmit({
      layers: layers,
      styles: styles,
      bbox: bbox,
      srs: srs,
      width: width,
      height: height,
      format: format,
      transparent: transparent
    });
  },
  render: function() {
    return (
      <form className="queryForm" onSubmit={this.handleSubmit}>
        <div>
          <input type="text" placeholder="Layers: layer1,layer2, ..." value={this.state.layers} onChange={this.handleLayersChange} />
          <input type="text" placeholder="Styles: layer1_style,layer2_style, ..." value={this.state.styles} onChange={this.handleStylesChange} />
        </div>
        <div>
          <input type="text" placeholder="BBox: minX,minY,maxX,maxY" value={this.state.bbox} onChange={this.handleBBoxChange} />
          <input type="text" placeholder="SRS: EPSG Code, e.g EPSG:4326" value={this.state.srs} onChange={this.handleSRSChange} />
        </div>
        <div>
          <input type="text" placeholder="Width:" value={this.state.width} onChange={this.handleWidthChange} />
          <input type="text" placeholder="Height:" value={this.state.height} onChange={this.handleHeightChange} />
        </div>
        <div>
          <input type="text" placeholder="Format: e.g image/png" value={this.state.format} onChange={this.handleFormatChange} />
          <input type="text" placeholder="Transparent: TRUE/FALSE" value={this.state.transparent} onChange={this.handleTransparentChange} />
        </div>
        <input type="submit" />
      </form>
    );
  }
});

var Map = React.createClass({
  render: function() {
    return (
      <div className="map">
        <img src={this.props.wmssrc} />
      </div>
    );
  }
});

var MapBox = React.createClass({
  handleQuerySubmit: function(q) {
    var baseUrl = "http://ms-mars.mars.asu.edu/?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1";
    this.setState({
      wmssrc: baseUrl + "&LAYERS=" + q.layers + "&STYLES=" + q.styles + "&BBOX=" + q.bbox + "&SRS=" + q.srs + "&WIDTH=" + q.width + "&HEIGHT=" + q.height + "&FORMAT=" + q.format + "&TRANSPARENT=" + q.transparent
    });
  },
  getInitialState: function() {
    return {
      wmssrc: "http://ms-mars.mars.asu.edu/?SERVICE=WMS&REQUEST=GetMap&FORMAT=image/png&SRS=JMARS:1,180.0,90.0&STYLES=&VERSION=1.1.1&LAYERS=MOLA_128ppd_shade_ne&WIDTH=256&HEIGHT=256&BBOX=-84.0,-26.0,-52.0,6.0"
    }
  },
  render: function() {
    return (
      <div className="mapBox">
        <h1>Java Mission-planning and Analysis for Remote Sensing</h1>
        <div>
          WMS Request:
          <pre>{this.state.wmssrc}</pre>
        </div>
        <QueryForm onQuerySubmit={this.handleQuerySubmit} />
        <Map wmssrc={this.state.wmssrc} />
      </div>
    );
  }
});

ReactDOM.render(<MapBox />, document.getElementById('content'));
