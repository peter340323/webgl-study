//HelloPoint1.js
//定点着色器程序
var VSHADER_SOURCE =
  'void main() {\n' +
  '  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n'+//一个四维变量 当最后一个参数为1.0时,就可以代表三维变量
  '  gl_PointSize = 10.0;\n' +//设置尺寸,必须为folat类型
  '}\n';

//片元着色器程序
var FSHADER_SOURCE=
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +//设置颜色 也是一个四维变量
  '}\n';

function main(){
	//获取<canvas>元素
  var canvas = document.getElementById('webgl');
	
	//获取Webgl上下文
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for Webgl');
    return;
  }
	
	//初始化着色器
  if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
    console.log('Failed to initialize shader');
    return;
  }
	
	//设置<canvas>的背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
	
	//清空<canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
	
	//绘制一个点
  gl.drawArrays(gl.POINTS,0,1);//第一个参数画一个什么东西，第二个参数从哪个顶点画，第三个参数画几次
}