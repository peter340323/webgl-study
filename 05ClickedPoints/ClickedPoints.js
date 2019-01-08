//ClickedPoints.js
//顶点着色器
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = 10.0;\n' +
  '}\n';
  
  //fragment shader
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';
  
function main() {
	console.log('main');
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
  console.log('getAttribLocation');
  
  //注册鼠标点击事件响应函数
  canvas.onmousedown = function(ev) { click(ev, gl, canvas, a_Position);};
  console.log('canvas.onmousedown');

  //set <canvas> 背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  
  
  //清除《canvas》
  gl.clear(gl.COLOR_BUFFER_BIT);
  }
  
  var g_points = [];
  function click(ev, gl, canvas, a_Position)  {
	  // console.log('click');
	  var x = ev.clientX;
	  var y = ev.clientY;
	  var rect = ev.target.getBoundingClientRect();
	  // alert(ev.target.getBoundingClientRect().left);
	  // alert(x);
	  // alert(canvas.height);
	  
	  x = ((x-rect.left) - canvas.height/2)/(canvas.height/2);
	  y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);
	  //将坐标存储到g_points数组中
	  g_points.push(x);g_points.push(y);
	  
	  //clear <canvas>
	  gl.clear(gl.COLOR_BUFFER_BIT);
	  
	  var len = g_points.length;
	  for(var i = 0; i < len; i+=2) {
		  //
		  gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0);
		  
		  //
		  gl.drawArrays(gl.POINTS, 0, 1);
	  }
  }
  