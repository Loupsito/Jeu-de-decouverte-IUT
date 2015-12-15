<input id="test" type="file" />
 
<script type="text/javascript">
window.onload=function() {
  var inp = document.getElementById('test');
  inp.onchange = function() {
    readFile(this,function(res) { alert(res); });
  };
};



function readFile(input,callback) {
  if(typeof FileReader !== 'undefined') {
    var fr = new FileReader();
    fr.readAsText(input.files[0]);
    fr.onload = function() {
      callback(fr.result);
    };
  } else if(typeof ActiveXObject !== 'undefined') {
    var path = input.value,
    ts = (new ActiveXObject("Scripting.FileSystemObject")).GetFile(path).OpenAsTextStream(1,-2),
    res = '';
    while (!ts.AtEndOfStream) {
      res += ts.ReadLine() + '\n';
    }
    ts.Close();
    callback(res);
  }
};
</script>