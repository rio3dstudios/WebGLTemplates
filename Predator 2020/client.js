var socket = io() || {};
socket.isReady = false;

window.addEventListener('load', function() {

	var execInUnity = function(method) {
		if (!socket.isReady) return;
		
		var args = Array.prototype.slice.call(arguments, 1);
		if(window.window.unityInstance!=null)
		{
		  window.unityInstance.SendMessage("NetworkManager", method, args.join(':'));
		}
		
		
	};

	socket.on('PONG', function() {
				      		
	    if(window.unityInstance!=null)
		{
		  window.unityInstance.SendMessage ('NetworkManager', 'OnPrintPongMsg');
		}
	 
	});
	socket.on('JOIN_SUCCESS', function(id,name,avatar,isMasterClient) {
				      		
	  var currentUserAtr = id+':'+name+':'+avatar+':'+isMasterClient;
	  if(window.unityInstance!=null)
		{
		 window.unityInstance.SendMessage ('NetworkManager', 'OnJoinGame', currentUserAtr);
		}
	  
	});
	
	socket.on('SPAWN_PLAYER', function(id,name,avatar,position) {
				      		
	  var currentUserAtr = id+':'+name+':'+avatar+':'+position;
      if(window.unityInstance!=null)
		{
		 window.unityInstance.SendMessage ('NetworkManager', 'OnSpawnPlayer', currentUserAtr);
		}
	 
	});
	
	socket.on('UPDATE_POS_AND_ROT', function(id,position,rotation) {
				      		
	  var currentUserAtr = id+':'+position+':'+rotation;
	   if(window.unityInstance!=null)
		{
		window.unityInstance.SendMessage ('NetworkManager', 'OnUpdatePosAndRot', currentUserAtr);
		}
	 
	});
	
	socket.on('SPAWN_POWERUP', function(id,type,posx,posy){
				      		
	  var currentUserAtr = id+':'+type+':'+posx+':'+posy;
	   if(window.unityInstance!=null)
		{
		  window.unityInstance.SendMessage ('NetworkManager', 'OnSpawnPowerUp', currentUserAtr);
		}
	  
	});
	
	socket.on('UPDATE_EVOLUTION', function(id,avatar){
				      		
	  var currentUserAtr = id+':'+avatar;
	   if(window.unityInstance!=null)
		{
		  window.unityInstance.SendMessage ('NetworkManager', 'OnUpdateEvolution', currentUserAtr);
		}
	  
	});
	
	socket.on('UPDATE_REGRESSION', function(id,avatar){
				      		
	  var currentUserAtr = id+':'+avatar;
	   if(window.unityInstance!=null)
		{
		  window.unityInstance.SendMessage ('NetworkManager', 'OnUpdateRegression', currentUserAtr);
		}
	  
	});
	
	 socket.on('UPDATE_PICKUP', function(player_id,id) {
				      		
	  var currentUserAtr = player_id+':'+id;
	  if(window.unityInstance!=null)
		{
		  window.unityInstance.SendMessage ('NetworkManager', 'OnUpdatePickup', currentUserAtr);
		}
	 
	});	

   socket.on('GAME_OVER', function(id) {
				      		
	  var currentUserAtr = id;
	  if(window.unityInstance!=null)
		{
		  window.unityInstance.SendMessage ('NetworkManager', 'OnGameOver', currentUserAtr);
		}
	 
	});	

 socket.on('UPDATE_BEST_KILLER', function(name,ranking,kills) {
				      		
	 var currentUserAtr = name+':'+ranking+':'+kills;
	 if(window.unityInstance!=null)
		{
		  window.unityInstance.SendMessage ('NetworkManager', 'OnUpdateBestKiller', currentUserAtr);
		}
	 
	});	
	
	 socket.on('CLEAR_LEADERBOARD', function() {
				      		
	 if(window.unityInstance!=null)
		{
		  window.unityInstance.SendMessage ('NetworkManager', 'OnClearLeaderBoard');
		}
	 
	});	
	

 socket.on('USER_DISCONNECTED', function(id) {
				      		
	  var currentUserAtr = id;
	  if(window.unityInstance!=null)
		{
		 window.unityInstance.SendMessage ('NetworkManager', 'OnUserDisconnected', currentUserAtr);
		}
	 
	});		


});//END_WINDOW.ADDEVENTLISTENER

