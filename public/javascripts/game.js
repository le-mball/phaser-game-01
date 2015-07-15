/* global Phaser */
(function(){
	
	var game;	
	var player;
	var cursors;
	var socket;
	var lastCoords;
	
	function preload() {
    	game.load.image('star', 'images/star.png');
		socket = io.connect("http://localhost:3001");
		socket.on("welcome", function(data) {
			console.log("connected to socket server");
			console.log(data);
		});
	}
	
	function create() {
		lastCoords = {x:0,y:0};
		player = game.add.sprite(0, 0, 'star');
		game.physics.startSystem(Phaser.Physics.ARCADE);				
		game.physics.arcade.enable(player);		
		player.body.collideWorldBounds = true;
		cursors = game.input.keyboard.createCursorKeys();
	}
	
	function update() {
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		
		var coordsChanged = false;
		
		if(player.body.x != lastCoords.x) {
			lastCoords.x = player.body.x;
			coordsChanged=true;
		}
		
		if(player.body.y != lastCoords.y) {
			lastCoords.y = player.body.y;
			coordsChanged=true;
		}
		
		if(cursors.left.isDown) {
			player.body.velocity.x = -150;
		}
		
		if(cursors.right.isDown) {
			player.body.velocity.x = 150;
		}
		
		if(cursors.up.isDown) {
			player.body.velocity.y = -150;
		}
		
		if(cursors.down.isDown) {
			player.body.velocity.y = 150;
		}
		
		if(coordsChanged===true) {
			socket.emit("move", lastCoords);
		}
	}
	
	game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
		preload: preload,
		create: create,
		update: update
	});
	
})();
