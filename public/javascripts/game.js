/* global Phaser */
(function(){
	
	var game;	
	var player;
	var cursors;
	
	function preload() {
    	game.load.image('star', 'images/star.png');
	}
	
	function create() {
		player = game.add.sprite(0, 0, 'star');
		game.physics.startSystem(Phaser.Physics.ARCADE);				
		game.physics.arcade.enable(player);		
		player.body.collideWorldBounds = true;
		cursors = game.input.keyboard.createCursorKeys();
	}
	
	function update() {
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		
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
	}
	
	game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
		preload: preload,
		create: create,
		update: update
	});
	
})();
