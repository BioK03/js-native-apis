/**
 * author: Bertrand CHOUBERT
 * credits : https://gist.github.com/mirontoli/4722797 | http://jsfiddle.net/ChristianL/AVyND/ | http://www.w3schools.com/ | https://developer.mozilla.org 
 *          | https://web.wurfl.io/#wurfl-js |http://stackoverflow.com/questions/16724414/microphone-activity-level-of-webrtc-mediastream 
 */
var nativeAPIs = {
    printBattery: function(){

        navigator.getBattery().then(function(battery) {
            
            document.getElementById("battery").innerHTML = "Battery level: "+Math.floor(battery.level * 100) + "%, "
                    +(battery.charging ? 
                        "Plugged in, "+((battery.chargingTime == Infinity)?"Not charging":" ("+nativeAPIs.toHHMMSS(battery.chargingTime)+" to the complete charge)") : 
                        "Discharging"+((battery.dischargingTime != Infinity)? " ("+nativeAPIs.toHHMMSS(battery.dischargingTime)+" remaining"+")":"" ));
            if(battery.charging){
                document.getElementById("batteryPlug").className += "fa fa-plug";
            }

            if(battery.level < 0.13){
                document.getElementById("batteryIcon").className += "fa fa-battery-empty";
            }
            if(battery.level >= 0.13 && battery.level < 0.37){
                document.getElementById("batteryIcon").className += "fa fa-battery-quarter";
            }
            if(battery.level >= 0.37 && battery.level < 0.66){
                document.getElementById("batteryIcon").className += "fa fa-battery-half";
            }
            if(battery.level >= 0.66 && battery.level < 0.87){
                document.getElementById("batteryIcon").className += "fa fa-battery-three-quarters";
            }
            if(battery.level >= 0.87){
                document.getElementById("batteryIcon").className += "fa fa-battery-full";
            }

        }, function(){
            var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery || navigator.msBattery;

        
            if (battery) {
                document.getElementById("battery").innerHTML = "Battery level: "+Math.floor(battery.level * 100) + "%, "
                    +(battery.charging ? 
                        "Plugged in, "+((battery.chargingTime == Infinity)?"Not charging":" ("+nativeAPIs.toHHMMSS(battery.chargingTime)+" to the complete charge)") : 
                        "Discharging"+((battery.dischargingTime != Infinity)? " ("+nativeAPIs.toHHMMSS(battery.dischargingTime)+" remaining"+")":"" ));

                if(battery.charging){
                    document.getElementById("batteryPlug").className += "fa fa-plug";
                }

                if(battery.level < 0.13){
                    document.getElementById("batteryIcon").className += "fa fa-battery-empty";
                }
                if(battery.level >= 0.13 && battery.level < 0.37){
                    document.getElementById("batteryIcon").className += "fa fa-battery-quarter";
                }
                if(battery.level >= 0.37 && battery.level < 0.66){
                    document.getElementById("batteryIcon").className += "fa fa-battery-half";
                }
                if(battery.level >= 0.66 && battery.level < 0.87){
                    document.getElementById("batteryIcon").className += "fa fa-battery-three-quarters";
                }
                if(battery.level >= 0.87){
                    document.getElementById("batteryIcon").className += "fa fa-battery-full";
                }
                    
            } else {
                document.getElementById("battery").innerHTML = "No battery found. Are you on a desktop computer ?";
            }
        });

    },
    printScreenResolution: function(){
        document.getElementById("resolution").innerHTML = "Resolution: "+screen.width+"px <i class='fa fa-times' aria-hidden='true'></i> "+screen.height+"px "
            +((screen.width > screen.height)?"(Landscape)":"(Portrait)");
        
        var nVer = navigator.appVersion;
        document.getElementById("screenIcon").className += /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer)?"fa fa-mobile":"fa fa-desktop";
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
        document.getElementById("network").innerHTML = ", Public IP : "+userIp;
    },
    printLanguage: function(){
        var userLanguage = navigator.language || navigator.userLanguage;
        document.getElementById("language").innerHTML = getLanguageName(userLanguage)+" ( "+getLanguageNativeName(userLanguage)+" )";
    },
    printTouchPoints: function(){
        if(navigator.maxTouchPoints == 0){
            document.getElementById("touchpoints").innerHTML = ", No touchscreen";
        }else {
            document.getElementById("touchpoints").innerHTML = ", "+navigator.maxTouchPoints+" points touchscreen";
        }
         
    },
    printOS: function(){
        var nAgt = navigator.userAgent;
        var os = "-";
        var clientStrings = [
            {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
            {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
            {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
            {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
            {s:'Windows Vista', r:/Windows NT 6.0/},
            {s:'Windows Server 2003', r:/Windows NT 5.2/},
            {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
            {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
            {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
            {s:'Windows 98', r:/(Windows 98|Win98)/},
            {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
            {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s:'Windows CE', r:/Windows CE/},
            {s:'Windows 3.11', r:/Win16/},
            {s:'Android', r:/Android/},
            {s:'Open BSD', r:/OpenBSD/},
            {s:'Sun OS', r:/SunOS/},
            {s:'Linux', r:/(Linux|X11)/},
            {s:'iOS', r:/(iPhone|iPad|iPod)/},
            {s:'Mac OS X', r:/Mac OS X/},
            {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s:'QNX', r:/QNX/},
            {s:'UNIX', r:/UNIX/},
            {s:'BeOS', r:/BeOS/},
            {s:'OS/2', r:/OS\/2/},
            {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = "-";
        var icon = "";

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            icon = "windows";
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                icon = "apple";
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                icon = "android"
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nAgt);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                icon = "apple";
                break;
            case 'Linux':
                icon = "linux";
                break;
        }
        document.getElementById("os").innerHTML = ", <i class='fa fa-"+icon+"'></i> "+os+" "+osVersion;
    },
    printCookieConfiguration: function(){
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }
        document.getElementById("cookie").innerHTML = (cookieEnabled)?", Cookies accepted":", Cookies refused";
    },
    printBrowserVersion: function(){
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Opera Next
        if ((verOffset = nAgt.indexOf('OPR')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 4);
        }
        // Edge
        else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
            browser = 'Microsoft Edge';
            version = nAgt.substring(verOffset + 5);
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }
        document.getElementById("browser").innerHTML = ", <i class='fa fa-"+browser.toLowerCase()+"'></i> "+browser+" "+majorVersion+" ("+ version + ")";
        document.getElementById("browserIcon").className += "fa fa-"+browser.toLowerCase();
    },
    printMediaDevices: function(){
        var mediaDevices = {audioinput: 0, audiooutput: 0, videoinput: 0, videooutput: 0};
        navigator.mediaDevices.enumerateDevices()
        .then(function(devices) {
            devices.forEach(function(device) {
                mediaDevices[device.kind]++;
            });

            document.getElementById("media").innerHTML = ", <i class='fa fa-film' aria-hidden='true'></i> Video Devices (Input: "+mediaDevices.videoinput+", Output: "+mediaDevices.videooutput+"),"
                +" <i class='fa fa-headphones'' aria-hidden='true'></i> Audio Devices (Input: "+mediaDevices.audioinput+", Output: "+mediaDevices.audiooutput+")";
        });        
    },
    printLocation: function(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(nativeAPIs.printEffectiveLocation, nativeAPIs.printLocationErrors);
        } else {
            document.getElementById("coords").innerHTML = "GeoLocation is not supported in your browser.";
        }
    },
    printEffectiveLocation: function(position){
        nativeAPIs.printAddress(position.coords.latitude, position.coords.longitude, "fr");
    },
    printLocationErrors: function(error){
        document.getElementById("coords").innerHTML = (error.code == error.PERMISSION_DENIED)?"You denied the geolocation request":"GeoLocation is not supported in your browser.";
    },
    printAddress: function(lat, lng, language){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var gpsPointFormatted = "Latitude: "+Math.floor(lat*100)/100+", Longitude: "+Math.floor(lng*100)/100;

                var gpsPoint = new google.maps.LatLng(lat, lng);
                var mapOptions = {
                    center: gpsPoint,
                    zoom: 10
                };

                var infowindow = new google.maps.InfoWindow({
                    content: "<div id='iwContent'><strong>"+JSON.parse(this.responseText).results[0].formatted_address+"</strong><br>"+gpsPointFormatted+"</div>"
                });
                
                var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                var marker = new google.maps.Marker({
                    position: gpsPoint,
                    map: map,
                    title: JSON.parse(this.responseText).results[0].formatted_address+"<br>"+gpsPointFormatted
                });
                marker.addListener('click', function(){
                    infowindow.open(map, marker);
                });
                infowindow.open(map, marker);
            }
        };
        xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyDYwAfzSdJzniL-p00-qToAyLuGptOdRlc&language="+language, true);
        xhttp.send();

        
    },
    printDeviceName: function(){
        document.getElementById("mobile").innerHTML = "Device : "+WURFL.form_factor+" ( "+WURFL.complete_device_name+" )";
    },
    printWebcam: function(){
        var video = document.querySelector("#videoElement");
 
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        
        if (navigator.getUserMedia) {       
            navigator.getUserMedia({video: true}, handleVideo, videoError);
        }
        
        function handleVideo(stream) {
            video.src = window.URL.createObjectURL(stream);
        }
        
        function videoError(e) {
            // do something
        }
    },
    printMicro: function(){
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

        if (navigator.getUserMedia) {
            navigator.getUserMedia({ audio: true },
            function(stream) {
                audioContext = new AudioContext();
                analyser = audioContext.createAnalyser();
                microphone = audioContext.createMediaStreamSource(stream);
                javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

                analyser.smoothingTimeConstant = 0.3;
                analyser.fftSize = 1024;

                microphone.connect(analyser);
                analyser.connect(javascriptNode);
                javascriptNode.connect(audioContext.destination);

                canvasContext = document.getElementById("micro").getContext("2d");
                
                javascriptNode.onaudioprocess = function() {
                    var array =  new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(array);
                    var values = 0;

                    var length = array.length;
                    for (var i = 0; i < length; i++) {
                        values += array[i];
                    }

                    var average = values / length;
                    canvasContext.clearRect(0, 0, 200, 130);
                    canvasContext.fillStyle = '#00ff00';
                    canvasContext.fillRect(0,130-average,200,130);
                }

            },
            function(err) {
                console.log("The following error occured: " + err.name);
            }
            );
        } else {
        console.log("getUserMedia not supported");
        }
    }
};


(function(){
    nativeAPIs.printBattery();
    nativeAPIs.printScreenResolution();
    nativeAPIs.printFPS();
    nativeAPIs.printIP();
    nativeAPIs.printLanguage();
    nativeAPIs.printTouchPoints();
    nativeAPIs.printOS();
    nativeAPIs.printCookieConfiguration();
    nativeAPIs.printBrowserVersion();
    nativeAPIs.printMediaDevices();
    nativeAPIs.printLocation();
    nativeAPIs.printDeviceName();
    nativeAPIs.printWebcam();
    nativeAPIs.printMicro();
})();
