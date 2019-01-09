//
//
var VSHADER_SOURCE = 
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = 10.0;\n' +
  '}\n';
  
  //
var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +
  'void main(){\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';
  
function main() {
	//获取《canvas》元素
  var canvas = document.getElementById('webgl');
	  
  //获取绘图上下文
  var gl = getWebGLContext(canvas);
  if (!gl) {
	console.log('Failed to get the rendering context for Webgl');
    return;
  }
  
  //初始化着色器
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }
  
  //获取a_Position变量的存储位置
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
	return;
  }
  
  //
  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (u_FragColor < 0) {
    console.log('Failed to get the storage location of u_FragColor');
	return;
  }
  
  //
  canvas.onmousedown = function(ev) {click(ev, gl, canvas, a_Position, u_FragColor)};
  
  //set <canvas> 背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  
  
  //清除《canvas》
  gl.clear(gl.COLOR_BUFFER_BIT);
  }
  
  var g_points = [];
  var g_color = [];
  function click(ev, gl, canvas, a_Position, u_FragColor) {
	  var x = ev.clientX;
	  var y = ev.clientY;
	  var rect = ev.target.getBoundingClientRect();
	  
	  x = ((x-rect.left) - canvas.width/2)/(canvas.width/2);
	  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
	  
	  //
	  g_points.push([x,y]);
	  //
	  if(x >= 0.0 && y >= 0.0) {
		  g_color.push([1.0, 0.0, 0.0, 1.0]);
	  }else if(x <= 0.0 && y<= 0.0) {
		  g_color.push([0.0, 1.0, 0.0, 1.0]);
	  }else {
		  g_color.push([1.0, 1.0, 1.0, 1.0]);
	  }
	  
	//	  
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	var len = g_points.length;
	for(var i = 0; i < len; i++){
		var xy = g_points[i];
		var rgba = g_color[i];
		
		//
		gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
		//
		gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2],rgba[3]);
		//
		gl.drawArrays(gl.POINTS, 0, 1);
	}
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  