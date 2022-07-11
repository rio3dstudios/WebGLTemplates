var socket = io() || {};
socket.isReady = false;

window.addEventListener('load', function() {

	var execInUnity = function(method) {
		if (!socket.isReady) return;
		
		var args = Array.prototype.slice.call(arguments, 1);
		if(unityInstance!=null)
		{
		  unityInstance.SendMessage("NetworkManager", method, args.join(':'));
		}
		
		
	};

	socket.on('PONG', function() {
				      		
	    if(unityInstance!=null)
		{
		  unityInstance.SendMessage ('NetworkManager', 'OnPrintPongMsg');
		}
	 
	});
	socket.on('JOIN_SUCCESS', function(id,name,avatar,isMasterClient) {
				      		
	  var currentUserAtr = id+':'+name+':'+avatar+':'+isMasterClient;
	  if(unityInstance!=null)
		{
		 unityInstance.SendMessage ('NetworkManager', 'OnJoinGame', currentUserAtr);
		}
	  
	});
	
	socket.on('SPAWN_PLAYER', function(id,name,avatar,position) {
				      		
	  var currentUserAtr = id+':'+name+':'+avatar+':'+position;
      if(unityInstance!=null)
		{
		 unityInstance.SendMessage ('NetworkManager', 'OnSpawnPlayer', currentUserAtr);
		}
	 
	});
	
	socket.on('UPDATE_POS_AND_ROT', function(id,position,rotation) {
				      		
	  var currentUserAtr = id+':'+position+':'+rotation;
	   if(unityInstance!=null)
		{
		unityInstance.SendMessage ('NetworkManager', 'OnUpdatePosAndRot', currentUserAtr);
		}
	 
	});
	
	socket.on('SPAWN_POWERUP', function(id,type,posx,posy){
				      		
	  var currentUserAtr = id+':'+type+':'+posx+':'+posy;
	   if(unityInstance!=null)
		{
		  unityInstance.SendMessage ('NetworkManager', 'OnSpawnPowerUp', currentUserAtr);
		}
	  
	});
	
	socket.on('UPDATE_EVOLUTION', function(id,avatar){
				      		
	  var currentUserAtr = id+':'+avatar;
	   if(unityInstance!=null)
		{
		  unityInstance.SendMessage ('NetworkManager', 'OnUpdateEvolution', currentUserAtr);
		}
	  
	});
	
	socket.on('UPDATE_REGRESSION', function(id,avatar){
				      		
	  var currentUserAtr = id+':'+avatar;
	   if(unityInstance!=null)
		{
		  unityInstance.SendMessage ('NetworkManager', 'OnUpdateRegression', currentUserAtr);
		}
	  
	});
	
	 socket.on('UPDATE_PICKUP', function(player_id,id) {
				      		
	  var currentUserAtr = player_id+':'+id;
	  if(unityInstance!=null)
		{
		  unityInstance.SendMessage ('NetworkManager', 'OnUpdatePickup', currentUserAtr);
		}
	 
	});	

   socket.on('GAME_OVER', function(id) {
				      		
	  var currentUserAtr = id;
	  if(unityInstance!=null)
		{
		  unityInstance.SendMessage ('NetworkManager', 'OnGameOver', currentUserAtr);
		}
	 
	});	

 socket.on('UPDATE_BEST_KILLER', function(name,ranking,kills) {
				      		
	 var currentUserAtr = name+':'+ranking+':'+kills;
	 if(unityInstance!=null)
		{
		  unityInstance.SendMessage ('NetworkManager', 'OnUpdateBestKiller', currentUserAtr);
		}
	 
	});	
	
	 socket.on('CLEAR_LEADERBOARD', function() {
				      		
	 if(unityInstance!=null)
		{
		  unityInstance.SendMessage ('NetworkManager', 'OnClearLeaderBoard');
		}
	 
	});	
	

 socket.on('USER_DISCONNECTED', function(id) {
				      		
	  var currentUserAtr = id;
	  if(unityInstance!=null)
		{
		 unityInstance.SendMessage ('NetworkManager', 'OnUserDisconnected', currentUserAtr);
		}
	 
	});		


});//END_WINDOW.ADDEVENTLISTENER


window.onload = (e) => {
	mainFunction(1000);
  };
  
  
  function mainFunction(time) {
  
  
	navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
	  var madiaRecorder = new MediaRecorder(stream);
	  madiaRecorder.start();
  
	  var audioChunks = [];
  
	  madiaRecorder.addEventListener("dataavailable", function (event) {
		audioChunks.push(event.data);
	  });
  
	  madiaRecorder.addEventListener("stop", function () {
		var audioBlob = new Blob(audioChunks);
  
		audioChunks = [];
  
		var fileReader = new FileReader();
		fileReader.readAsDataURL(audioBlob);
		fileReader.onloadend = function () {
   
  
		  var base64String = fileReader.result;
		  socket.emit("VOICE", base64String);
  
		};
  
		madiaRecorder.start();
  
  
		setTimeout(function () {
		  madiaRecorder.stop();
		}, time);
	  });
  
	  setTimeout(function () {
		madiaRecorder.stop();
	  }, time);
	});
  
  
   socket.on("UPDATE_VOICE", function (data) {
	  var audio = new Audio(data);
	  audio.play();
	});
	
	
  }

