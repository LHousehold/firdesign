$(document).ready(function(){

    $.getScript("dspUtils-11.js", function(){
    });

   $("#generate").click(function(e) {
       var M = 999;
       var Att = 60;
       //sampling rate in kHz
       var Fs = 20;
       var Nyquist = Fs/2*1000;

       // 64 filters
       var plist = [2093,1975.53,1864.66,1760,1661.22,1567.98,1479.98,1396.91,1318.51,1244.51,1174.66,1108.73,1046.5,987.767,932.328,880,830.609,783.991,739.989,
           698.456,659.255,622.254,587.33,554.365,523.251,493.883,466.164,440,415.305,391.995,369.994,349.228,329.628,311.127,293.665,277.183,261.626,246.942,233.082,
           220,207.652,195.998,184.997,174.614,164.814,155.563,146.832,138.591,130.813,123.471,116.541,110,103.826,97.9989,92.4986,87.3071,82.4069,77.7817,73.4162,
           69.2957,65.4064,61.7354,58.2705,55]
       plist = plist.reverse();

       // want to create bounds for each filter
       var rlist = [];
       var i = 0;
       rlist[0] = [0,(plist[1] - plist[0])/2];
       for (i = 1; i < plist.length-1; i++) {
           rlist[i] = [((plist[i] - plist[i-1])/2).toFixed(3),((plist[i+1] - plist[i])/2).toFixed(3)];
       }
       rlist[plist.length-1] = [(plist[plist.length-1] - plist[plist.length-2])/2,Nyquist];

       var coeffs_list = [];
       var coeffs_temp = [];
       var j = 0;
       for (j = 0; j < rlist.length; j++) {
           coeffs_temp = calcFilter(Fs*1000, rlist[j][0], rlist[j][1], M, Att);
           coeffs_list = coeffs_list.concat(coeffs_temp);
       }

       var coeffs = coeffs_list.join(", ");

       $("#results").html(coeffs);
   });

   $("#results").click(function(e) {
       selectText("results");
   });

   function selectText(containerid) {
        if (document.selection) {
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(containerid));
            range.select();
        } else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(document.getElementById(containerid));
            window.getSelection().addRange(range);
        }
    }

})
