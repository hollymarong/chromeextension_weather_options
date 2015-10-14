(function(){
  var weatherCity = localStorage.city;
  weatherCity = weatherCity ? weatherCity : "beijing";
  document.getElementById("city").value =  weatherCity;
  document.getElementById("save").onclick = function(){
    localStorage.weatherCity = document.getElementById("city").value;
    alert("设置成功,点击图标查看！");
  }
})();