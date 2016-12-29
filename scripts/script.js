

var nativeAPIs = {
    printBattery: function(){

        navigator.getBattery().then(function(battery) {           

            document.getElementById("battery").innerHTML = "Battery level: "+Math.floor(battery.level * 100) + "%, "
                    +(battery.charging ? 
                        "Plugged in, "+((battery.chargingTime == Infinity)?"Not charging":" ("+nativeAPIs.toHHMMSS(battery.chargingTime)+" to the complete charge)") : 
                        "Discharging"+((battery.dischargingTime != Infinity)? " ("+nativeAPIs.toHHMMSS(battery.dischargingTime)+" remaining"+")":"" ));

        }, function(){
            var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery || navigator.msBattery;

        
            if (battery) {
                document.getElementById("battery").innerHTML = "Battery level: "+Math.floor(battery.level * 100) + "%, "
                    +(battery.charging ? 
                        "Plugged in, "+((battery.chargingTime == Infinity)?"Not charging":" ("+nativeAPIs.toHHMMSS(battery.chargingTime)+" to the complete charge)") : 
                        "Discharging"+((battery.dischargingTime != Infinity)? " ("+nativeAPIs.toHHMMSS(battery.dischargingTime)+" remaining"+")":"" ));
                
            } else {
                document.getElementById("battery").innerHTML = "No battery found. Are you on a desktop computer ?";
            }
        });

    },
    printScreenResolution: function(){
        document.getElementById("resolution").innerHTML = "Resolution: "+screen.width+"px x "+screen.height+"px";
    },

    lastLoop: null,
    combinedFPS: 0,
    numLoop: 10,
    gameLoop: function(){
        if(nativeAPIs.numLoop == 0){
            document.getElementById("fps").innerHTML = ", Average : "+Math.floor(nativeAPIs.combinedFPS*10)/100+" FPS";
            return;
        }
        
        nativeAPIs.numLoop--;
        var thisLoop = new Date;
        var fps = 1000 / (thisLoop - nativeAPIs.lastLoop);
        nativeAPIs.lastLoop = thisLoop;
        nativeAPIs.combinedFPS += fps;
        setTimeout(function(){nativeAPIs.gameLoop();}, 0);
        
    },
    printFPS: function(){
        nativeAPIs.lastLoop = new Date;
        setTimeout(function(){nativeAPIs.gameLoop()}, 0);
    },
    toHHMMSS : function (num) {
        var hours   = Math.floor(num / 3600);
        var minutes = Math.floor((num - (hours * 3600)) / 60);
        var seconds = num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds;
    },
    printIP: function(){
        document.getElementById("network").innerHTML = userIp;
    },
    printLanguage: function(){
        var userLanguage = navigator.language || navigator.userLanguage;
        document.getElementById("language").innerHTML = getLanguageName(userLanguage)+" ( "+getLanguageNativeName(userLanguage)+" )";
    },
    printTouchPoints: function(){
        document.getElementById("touchpoints").innerHTML = navigator.maxTouchPoints;
    }
};


(function(){


    nativeAPIs.printBattery();
    nativeAPIs.printScreenResolution();
    nativeAPIs.printFPS();
    nativeAPIs.printIP();
    nativeAPIs.printLanguage();
    nativeAPIs.printTouchPoints();

    console.log(navigator);
    console.log(navigator.mediaDevices.enumerateDevices());
    navigator.mediaDevices.enumerateDevices()
.then(function(devices) {
  devices.forEach(function(device) {
    console.log(device);
  });
})

})();