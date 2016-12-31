# js-native-apis
This responsive website lists all information that JS developers can capture through a visit

## Screen Resolution
This part capture the screen resolution where the browser is, the orientation of this screen, an idea of the power of the processor via the max FPS, and details about touchscreens (points).
The icon of this part symbolizes a mobile or desktop screen.

## Webcam
This division of the page cpatures instant webcam video stream.

## Location
This Google Maps indicates your current position. On mobile equipped with GPS, this position is very accurate. On desktop, this position may be unnacurate depending on your network provider.
It indicates both the coordinates (latitude & longitude) and the address.

## Battery
This part began with icons : If a battery is detected, the icon symbolizes a battery with anapproximate battery level (0% | 25% | 50% | 75% | 100%). Also, if the device is plugged in, an electric plug icon is displayed.
It prints out battery level, if the device is plugged in, if it is charging (if the battery is full and the device plugged in, so the battery is not charging), and the approximate time before complete charge or complete discharge if compatible.

## Browser
In this part, we can see information arround language (setted up in the browser), the browser it self, its major and minor version, and its Flash version if compatible.
Notice : if the device is not compatible, a JS error prints on the console, but it does not affect other components.

## System
This part shows up complete product name if compatible (I notices that smartphones are more compatible than desktop computers), the public IP, your operating system, and the video and audio devices connected to your device (webcam, stream captures, microphones, headphones, speakers, etc.)

## Micro
If compatible, this part shows the noise level captured by your microphone.

# Sources
Big part of this code is mine (consider this as MIT code), but some part of this is copyrighted.
Here are the source of everything :
 * List of all languages : Anatoly Mironov ( https://gist.github.com/mirontoli/4722797 )
 * OS and Flash information : Christian L. ( http://jsfiddle.net/ChristianL/AVyND/ )
 * WURFL for device complete name ( https://web.wurfl.io/#wurfl-js )
      :heavy_exclamation_mark: This project hasn't the MIT license
 * Microphone activiry : YumYumYum ( http://stackoverflow.com/questions/16724414/microphone-activity-level-of-webrtc-mediastream )
 * Other references : W3C Schools ( http://www.w3schools.com/ ) and Mozilla Dev Network ( https://developer.mozilla.org )
 
