(function(){
  var weatherCity = localStorage.weatherCity? localStorage.weatherCity : "beijing";

  chrome.contextMenus.create({
      type: 'normal',
      title: '查看时间和天气',
      id: 'a',
      onclick:menuShow
  });

  function menuShow(){
    alert("hahha");
  }
  // var notification = chrome.createNotification(
  //     'icon48.png',
  //     'Notification Demo',
  //     'Merry Christmas'
  // );

  // notification.show();

  // setTimeout(function(){
  //     notification.cancel();
  // },5000);

  chrome.browserAction.setBadgeBackgroundColor({color: "#ce2323"});
  chrome.browserAction.setBadgeText({text: 'time'});
    //获取当前时间
    getNowTime();

    setInterval(function(){
      getNowTime();
    }, 1000);

    //获取北京的天气
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + weatherCity + "&lang=zh_cn";

   createXHR(url, showWeather);

    function getNowTime(){

      var nowDate = new Date();
      var nowYear = nowDate.getFullYear();
      var nowMonth = nowDate.getMonth() + 1;
      var nowDay = nowDate.getDate();
      var nowWeekDay = nowDate.getDay();
      var nowHour = nowDate.getHours();
      var nowMinite = nowDate.getMinutes();
      var nowSeconds = nowDate.getSeconds();

      (nowMinite <= 9) && (nowMinite = "0" + nowMinite);
      (nowSeconds <= 9) && (nowSeconds = "0" + nowSeconds);

      var oTime = document.getElementById("time");
      var oDay = document.createElement("span");
      var oClock = document.createElement("span");

      oDay.className = "day";
      oClock.className ="clock";

      oDay.innerHTML = nowYear + "年" + nowMonth + "月" + nowDay + "日";
      oClock.innerHTML = nowHour + "：" + nowMinite + "：" + nowSeconds;

      oTime.innerHTML = "";
      oTime.appendChild(oDay);
      oTime.appendChild(oClock);
    }

    function createXHR(url, callback){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              if((xhr.status >= 200 && xhr.status < 300) ||  (xhr.status === 304)){
                console.log(xhr.responseText);
                  callback(xhr.responseText);
              }else{
                alert("Weather Requst is unsuccessful" + xhr.status);
              }
            }
        }
        xhr.send(null);
    }

    function showWeather(result){
        result = JSON.parse(result);
        var weatherInfo = result;
        window.dd = weatherInfo;
        var oFrag = "<p class='item'><span class='title'>地点：</span>" + "<span class='describe'>" + weatherCity + "</span></p>";
        oFrag += "<p class='item'><span class='title'>今天天气：</span>" + "<span class='describe'>" + weatherInfo.weather[0].description + "</span></p>";
        oFrag += "<p class='item'><span class='title'>湿度：</span>" + "<span class='describe'>" + weatherInfo.main.humidity + "%" + "</span></p>";
        oFrag += "<p class='item'><span class='title'>气压：</span>" + "<span class='describe'>" + weatherInfo.main.pressure + "hPa" + "</span></p>";
        oFrag += "<p class='item'><span class='title'>平均气温：</span>" + "<span class='describe'>" + ((parseFloat(weatherInfo.main.temp) - 273.15).toFixed(1) + "℃") + "</span></p>";
        oFrag += "<p class='item'><span class='title'>最高气温：</span>" + "<span class='describe'>" + ((parseFloat(weatherInfo.main.temp_max) - 273.15).toFixed(1) + "℃") + "</span></p>";
        oFrag += "<p class='item'><span class='title'>最低气温：</span>" + "<span class='describe'>" + ((parseFloat(weatherInfo.main.temp_min) - 273.15).toFixed(1) + "℃") + "</span></p>";


        document.getElementById('weather').innerHTML = (oFrag);
    }

})();