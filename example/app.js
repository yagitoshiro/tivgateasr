Titanium.UI.setBackgroundColor('#000');

var audio = require('org.selfkleptomaniac.mod.tivgateasr');
audio.init({
  APIKey: "YOUR API KEY",
  speechTime: 1000,
  recordSize: 240,
  recognizeTime: 1000
});

var tabGroup = Titanium.UI.createTabGroup();
var win1 = Titanium.UI.createWindow({
    layout: 'vertical',
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var button = Titanium.UI.createButton({
  top: 200,
  color:'#999',
  title:'音声入力',
  font:{fontSize:20,fontFamily:'Helvetica Neue'},
  textAlign:'center',
  width:Ti.UI.SIZE,
  height: Ti.UI.SIZE
});
var label = Ti.UI.createLabel({
  top: 100,
  color: '#999',
  text: 'ここに表示',
  font:{fontSize:30,fontFamily:'Helvetica Neue'},
  textAlign:'center',
  width:Ti.UI.SIZE
});
audio.addEventListener('notifyAbort', function(e){
  Ti.API.info(e.message);
//  button.text = audio.getResult();
  if(e.message == "NotifyEndRecognition"){
    Ti.API.info(audio.getResult());
  }
});
audio.addEventListener('notifyEvent', function(e){
  Ti.API.info(e.message);
//  button.text = audio.getResult();
  if(e.message == "NotifyEndRecognition"){
    Ti.API.info(audio.getResult());
    label.text = audio.getResult();
  }
});

win1.add(button);
win1.add(label);

var mode = "start";
button.addEventListener('click', function(){
  Ti.API.info("click!");
  if(mode == "start"){
    audio.connect();
    audio.start({
      autoStart: true
    });
    mode = "recording";
  }else{
    audio.stop();
    audio.disconnect();
    mode = "start";
  }
});

tabGroup.addTab(tab1);
tabGroup.open();
