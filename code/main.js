import kaboom from "kaboom"

// initialize context
kaboom()


// load assets
loadSprite("bean", "sprites/bean.png")
loadSprite("rocketdog", "sprites/rocketdog.png",{sliceX: 2, anims: {
  "right": {
			// Starts from frame 0, ends at frame 3
			from: 0,
			to: 0,
			// Frame per second
			speed: 1,
  loop: true,
		},
  "left": {
			// Starts from frame 0, ends at frame 3
			from: 1,
			to: 1,
			// Frame per second
			speed: 1,
  loop: true,
		}
    }
        })
loadSprite("rocket", "sprites/rocket.png")
loadSprite("explosion", "sprites/explosion.png", {sliceX: 5, anims: {"idle": {
			// Starts from frame 0, ends at frame 3
			from: 0,
			to: 5,
			// Frame per second
			speed: 5,
  loop: true,
		},
                 }
        })
loadSprite("grass", "sprites/grass.png")
loadSprite("rd1", "sprites/rd1.png")
loadSprite("gunnerdog", "sprites/gunnerdog.png", {sliceX: 2, anims: {
  "right": {
			// Starts from frame 0, ends at frame 3
			from: 0,
			to: 0,
			// Frame per second
			speed: 1,
  loop: true,
		},
  "left": {
			// Starts from frame 0, ends at frame 3
			from: 1,
			to: 1,
			// Frame per second
			speed: 1,
  loop: true,
		}
    }
        })
loadSprite("bullet", "sprites/bullet.png")
loadSprite("gunnerdogcard", "sprites/gunnerdogcard.png")
loadSprite("destroyerofallseas", "sprites/destroyerofallseas.png", {sliceX: 2, anims: {
  "right": {
			// Starts from frame 0, ends at frame 3
			from: 0,
			to: 0,
			// Frame per second
			speed: 1,
  loop: true,
		},
  "left": {
			// Starts from frame 0, ends at frame 3
			from: 1,
			to: 1,
			// Frame per second
			speed: 1,
  loop: true,
		}
}})
loadSprite("sword", "sprites/sword.png")
loadSprite("spycat", "sprites/spycat.png")
loadSprite("destroyerofallseascard", "sprites/destroyerofallseascard.png")

// 16/39

const levelConf = {
  width: 32,
  height: 32,
  "-": () => [
    sprite("grass"),
    area(),
    solid(),
    origin("center"),
    scale(2, 2),
    "blocks",
  ]
}

const maps = [
  [
    "                                 ",
    "                                 ",
    "                                 ",
    "                                 ",
    "                                 ",
    "                                 ",
    "                                 ",
    "                                 ",
    "                                 ",
    "                                 ",
    "                                 ",
    "                                 ",
    "          -----------------      ",
    "                                 ",
    "                                 ",
    "                                 ",
  ]
];

var cooldown = false;

function handleout() {
	return {
		id: "handleout",
		require: [ "pos" ],
		update() {
			const spos = this.screenPos()
			if (
				spos.x < 0 ||
				spos.x > width() ||
				spos.y < 0 ||
				spos.y > height()
			) {
				// triggers a custom event when out
				this.trigger("out")
			}
		},
	}
}

function addButton(txt, p, f) {
  
	const btn = add([
		text(txt),
		pos(p),
		area({ cursor: "pointer", }),
		scale(1),
		origin("center"),
	])

	btn.onClick(f)

	btn.onUpdate(() => {
		if (btn.isHovering()) {
			const t = time() * 10
			btn.scale = vec2(1)
		} else {
			btn.scale = vec2(0.75)
			btn.color = rgb()
		}
	})

}

var character = undefined;
// MAKE UNDEFINED LATER
var character2 = 'spycat';

scene("characters", () => {
  var rd1 = add([
    sprite("rd1"),
    pos(width() / 6, height() - 190),
    scale(2, 3),
    area(),
    "rd1",
  ])
  onClick("rd1", () => {
    character = "rocketdog"
    go("game")
  })
  var gunnerdogcard = add([
    sprite("gunnerdogcard"),
    pos(width() / 3.6, height() - 190),
    scale(2, 3),
    area(),
    "gunnerdogcard",
  ])
  onClick("gunnerdogcard", () => {
    character = "gunnerdog"
    go("game")
  })
  var destroyerofallseascard = add([
    sprite("destroyerofallseascard"),
    pos(width() / 2.6, height() - 190),
    scale(2, 3),
    area(),
    "destroyerofallseascard",
  ])
  onClick("destroyerofallseascard", () => {
    character = "destroyerofallseas"
    go("game")
  })
})

scene("ui", () => {
  addButton("Start", vec2(width() / 2, 250), () => go("characters"))
  addButton("Trophies", vec2(width() / 2, 325), () => go("characters"))
  addButton("Bosses", vec2(width() / 2, 400), () => go("characters"))
  addButton("Online", vec2(width() / 2, 475), () => go("characters"))
  add([
    text("Dogs vs cats"),
    {width: width()},
    pos(width() / 3.25, 100),
  ])
})

/*
Future features:
-Rocket dog {
  Special: Bullet hell
  Debufs: Bad aim
  Buffs: High damage
}
-Machine gun dog {
  Special: Eat steak  
  Debufs: Slow firing
  Buffs: Fast firerate
}
-Random powerups: {
  Poison
  Ink
  Bigger explosives (for rocketdog)
}
-Take the kaboom to get critical hits
-Critical hits
-Destroyer of all seas dog (boat/pirate dog)
-Sans dog {
  Special:
  Debufs: HE CAN'T DODGE FOREVER (He gets more tired as he gets hit more) Low health
  Buffs: Strong in the beginning, dodge hits
}
-Coder dog {
  Special: Hack (Give random debufs to other player)
  Debufs: Slow
  Buffs: Dodge
}
-Cavalry dog {
  Special: Stampede
  Debufs: 
  Buffs: Fast speed
}
-Time dog {
  Special: Slow down time
  Debufs: Lower health
  Buffs: Moves fast
}
-EVENTS: {
  Totem event (statues appear that do crits)
  Meteor event
  Katanas instead of normal weapons (may have been inspired by somewhere... ButWhyLevin)
}

- Cat spy {
  Special: Invis
  Debufs: Can't wear gear
  Buffs: Can see health
}

- Meowther {
  Special: 
}

- Astro cat {
  Special: Fly for 5 seconds
  Debufs: Low health
  Buffs: Lightweight
}

- Grandma cat {
  Special: Cane stun
  Debufs: Slow walk
  Buffs: Combo damage
}

- Kitten {
  Special: Scratch Fury
  Debufs: Low health
  Buffs: High damage + Small + Fast
}

-Music cat {
  Special: Buff music cat + Health and Temporary VERY HIGH DAMAGE
  Debufs: Can't put on headgear
  Buffs: Listening to music
}

- Add gear

- Abilities (when keys pressed)

*/

layers([
  "ui",
  "game",
], "ui")

scene("game", () => {
  gravity(2000)
  const level = addLevel(maps[0], levelConf)
  var floor = add([
    rect(width() - 125, 40),
    outline(4),
    pos(40, height()),
    origin("botleft"),
    area(),
    solid(),
    color(127, 200, 255),
    "floor",
  ])

  var t = 60;
  var t2 = 60;
  loop(1, () => {
    if (t / 60 === 1) {
      return false;
    }
    t++
  })
  loop(1, () => {
    console.log(t2);
    if (t2 / 60 === 1) {
      return false;
    }
    t2++
  })
  
  var cat = undefined;
  var speed_x2 = undefined;
  var jump_speed2 = undefined;
  var cathealth = undefined;
  var cooldowntime2 = undefined;
  // Cat
  if (character2 == 'spycat') {
    cathealth = 3
    cat = add([
	    // list of components
      sprite("spycat"),
	    pos(80, 80),
	    area(),
      body(),
      scale(2, 2),
      //opacity(0),
      "spycat",
      "cat",
      health(cathealth),
    ])
    speed_x2 = 250
    jump_speed2 = 1000
    cooldowntime2 = 0.6
    cat.on("death", () => {
      cat.opacity = 0
      wait(2, () => {
        cat.setHP(cathealth)
      cat.pos.x = 80;
      cat.pos.y = 0;
        cat.opacity = 1
      })
    })
  }
  var collidingWithBlock2 = false;
  cat.onCollide("blocks", (blocks) => {
    collidingWithBlock2 = true
  })
  var catdirection = 'right';
  keyDown("a", () => {
	  cat.move(-speed_x2, 0)
    catdirection = 'left';
  });

  keyDown("d", () => {
	  cat.move(speed_x2, 0)
    catdirection = 'right';
  });

  keyDown("w", () => {
    if (cat.grounded()) {
      cat.jump(jump_speed2)
    }
  });
  
  var cooldown2 = false;
  keyDown("e", () => {
    if (cooldown2 === true) {
      return false;
    }
    cooldown2 = true;
    smg([750, 0])
    wait(cooldowntime2, () => {
      cooldown2 = false;
    })
  })
  
  var dog = undefined;
  var speed_x = undefined;
  var jump_speed = undefined;
  var doghealth = undefined;
  var cooldowntime = undefined;
  // Dog
  if (character === 'rocketdog') {
    doghealth = 3
    var dog = add([
	    // list of components
      sprite("rocketdog"),
      pos(width() - 160, 80),
	    area(),
      body(),
      scale(3, 3),
      health(doghealth),
      "rocketdog",
      "dog",
    ])
    speed_x = 250
    jump_speed = 1000
    cooldowntime = 3
    dog.on("death", () => {
      dog.opacity = 0
      wait(2, () => {
        dog.setHP(doghealth)
      dog.pos.x = width() - 160;
      dog.pos.y = 80;
        dog.opacity = 1
      })
    })
  } else if (character === 'gunnerdog') {
    doghealth = 6
    var dog = add([
	    // list of components
      sprite("gunnerdog"),
      pos(width() - 160, 80),
	    area(),
      body(),
      scale(3, 3),
      health(doghealth),
      "gunnerdog",
      "dog",
    ])
    speed_x = 100
    jump_speed = 1000
    cooldowntime = 0.1
    dog.on("death", () => {
      dog.opacity = 0
      wait(2, () => {
        dog.setHP(doghealth)
      dog.pos.x = width() - 160;
      dog.pos.y = 80;
        dog.opacity = 1
      })
    })
  } else if (character === 'destroyerofallseas') {
    doghealth = 6
    var dog = add([
	    // list of components
      sprite("destroyerofallseas"),
      pos(width() - 160, 80),
	    area(),
      body(),
      scale(3, 3),
      health(doghealth),
      "destroyerofallseas",
      "dog",
    ])
    speed_x = 300
    jump_speed = 1000
    cooldowntime = 3
    dog.on("death", () => {
      dog.opacity = 0
      wait(2, () => {
        dog.setHP(doghealth)
      dog.pos.x = width() - 160;
      dog.pos.y = 80;
        dog.opacity = 1
      })
    })
  }
  var collidingWithBlock = false;
  dog.onCollide("blocks", (blocks) => {
    collidingWithBlock = true
  })

  var dogdirection = 'left';
  keyDown("left", () => {
    dogdirection = 'left';
	  dog.move(-speed_x, 0)
    dog.play("left")
  });

  keyDown("right", () => {
    dogdirection = 'right';
	  dog.move(speed_x, 0)
    dog.play("right")
  });

  keyDown("up", () => {
    if (dog.grounded()) {
      dog.jump(jump_speed)
    }
  });
  
  var cooldown = false
  var scooldown = true
  var scooldown2 = true;

  function shootRocket(direction) {
    console.log(dogdirection);
    var rocket = undefined;
    if (dogdirection == 'left') {
      rocket = add([
      sprite("rocket"),
      pos(dog.pos.x + 90, dog.pos.y + 75),
      area(),
      handleout(),
      { dir: vec2(-direction[0], direction[1]), },
      "rocket",
    ])
    } else {
      rocket = add([
      sprite("rocket"),
      pos(dog.pos.x + 90, dog.pos.y + 75),
      area(),
      handleout(),
      { dir: vec2(direction[0], direction[1]), },
      "rocket",
    ])
    }
    var randomJump = Math.floor(Math.random() * 1600) + jump_speed
    rocket.onCollide("floor", (floor) => {
      var rocketeffect = add([
          sprite("explosion"),
          pos(rocket.pos.x - 75, rocket.pos.y),
          scale(3, 3),
          area(),
          "rocketJump",
      ])
      rocketeffect.onCollide("rocketdog", (rocketdog) => {
        rocketdog.jump(randomJump)
      })
      rocketeffect.play("idle")
      destroy(rocket)
      wait(1, () => {
        destroy(rocketeffect)
      })
    })
    rocket.onCollide("blocks", (blocks) => {
      var rocketeffect = add([
          sprite("explosion"),
          pos(rocket.pos.x - 75, rocket.pos.y),
          scale(3, 3),
          area(),
          "rocketJump",
      ])
      rocketeffect.onCollide("rocketdog", (rocketdog) => {
        rocketdog.jump(randomJump)
      })
      rocketeffect.play("idle")
      destroy(rocket)
      wait(1, () => {
        destroy(rocketeffect)
      })
    })
    rocket.onCollide("cat", (cat) => {
      var rocketeffect = add([
          sprite("explosion"),
          pos(rocket.pos.x, rocket.pos.y - 35),
          scale(5, 5),
          area(),
          "rocketJump",
      ])
      cat.hurt(1)
      rocketeffect.play("idle")
      destroy(rocket)
      wait(0.5, () => {
        destroy(rocketeffect)
      })
    })
    rocket.on("death", () => {
    var rsx = rocket.pos.x
    var rsy = rocket.pos.y
        const rocketeffect = add([
          sprite("explosion"),
          pos(rocket.pos.x, rocket.pos.y),
          scale(3, 3),
        ])
        rocketeffect.play("idle")
        destroy(rocket)
        wait(1, () => {
          if (rocketeffect != undefined) {
            rocketeffect.destroy()
          }
        })
  })
  }

  onUpdate("rocket", (rocket) => {
    rocket.move(rocket.dir)
  })

  function fury(direction) {
    if (dogdirection == 'left') {
      var bullet = add([
      sprite("bullet"),
      pos(dog.pos.x, dog.pos.y + 120),
      area(),
      "bullet",
      { dir: vec2(-direction[0], direction[1])}
    ])
    } else {
      var bullet = add([
      sprite("bullet"),
      pos(dog.pos.x, dog.pos.y + 120),
      area(),
      "bullet",
      { dir: vec2(direction[0], direction[1])}
    ])
    }
    bullet.onCollide("cat", (cat) => {
      cat.hurt(0.1)
    })
  }

  function swingSword() {
    var sword = undefined;
    if (dogdirection == 'left') {
    sword = add([
      sprite("sword"),
      pos(dog.pos.x, dog.pos.y + 100),
      area(),
      scale(5, 5),
      rotate(0),
      origin("bot"),
      handleout(),
      lifespan(0.5, { fade: 0.2 }),
      "sword",
      { dir: -5},
    ])
    } else {
      sword = add([
      sprite("sword"),
      pos(dog.pos.x + 100, dog.pos.y + 100),
      area(),
      scale(5, 5),
      rotate(0),
      origin("bot"),
      handleout(),
      lifespan(0.5, { fade: 0.2 }),
      "sword",
        { dir: 5},
    ])
    }
    sword.onCollide("cat", (cat) => {
      cat.hurt(1)
    })
  }

  onUpdate("sword", (sword) => {
    sword.move(0, 100)
    sword.angle += sword.dir
  })

  function smg(direction) {
    var bullet = undefined;
    if (catdirection == 'left') {
      bullet = add([
      sprite("bullet"),
      pos(cat.pos.x + 10, cat.pos.y + 30),
      area(),
      "bullet",
      handleout(),
      { dir: vec2(-direction[0], direction[1])}
    ])
    } else {
      bullet = add([
      sprite("bullet"),
      pos(cat.pos.x + 10, cat.pos.y + 30),
      area(),
      "bullet",
      handleout(),
      { dir: vec2(direction[0], direction[1])}
    ])
    }
    bullet.onCollide("dog", (dog) => {
      dog.hurt(0.4)
    })
    bullet.onCollide("bullet", (collideBullet) => {
      destroy(collideBullet)
    })
  }
  
  onUpdate("bullet", (bullet) => {
    console.log(bullet.dir);
    bullet.move(bullet.dir)
  })
  
  // Specials

  onDraw(() => {
    if (character2 == 'spycat') {
      drawText({
        text: `Health: ${dog.hp()}`,
        size: 15,
        font: "sink",
        pos: vec2(dog.pos.x, dog.pos.y),
        color: rgb(0, 100, 255),
      })
    }
    if (t === 60) {
      drawCircle({
        pos: vec2(width()-50, height()-40),
        radius: 40,
        color: rgb(228, 255, 111),
      })
    } else {
      drawCircle({
        pos: vec2(width()-50, height()-40),
        radius: 40,
        color: rgb(23, 106, 27),
      })
    }
    if (t2 === 60) {
      drawCircle({
        pos: vec2(40, height()-40),
        radius: 40,
        color: rgb(228, 255, 111),
      })
    } else {
      drawCircle({
        pos: vec2(40, height()-40),
        radius: 40,
        color: rgb(23, 106, 27),
      })
    }
    drawText({
      text: `${t}`,
      size: 48,
      font: "sink",
      pos: vec2(width()-80, height()-60)
    })
    drawText({
      text: `${t2}`,
      size: 48,
      font: "sink",
      pos: vec2(10, height()-60)
    })
  })
  
  switch (character) {
    case 'rocketdog':
      onKeyDown(".", () => {
        if (scooldown === true && t != 60) {
          return false;
        }
        if (t == 60) {
          t = 0
        }
        scooldown = true;
        for (var i = 0; i < 10; i++) {
          shootRocket([750, 0])
        }
      })
      break;
  }
  switch (character2) {
    case 'spycat':
      scooldown = true
      onKeyDown("f", () => {
        if (scooldown === true && t2 != 60) {
        return false;
      }
      if (t2 == 60) {
        t2 = 0
      }
        //`let t = 0;
        destroy(cat)
        cat = add([
	    // list of components
      sprite("spycat"),
	    pos(width() - 160, 80),
      scale(2, 2),
      //opacity(0),
      "spycat",
      "cat",
      health(2),
      follow(dog, vec2(150, 20)),
    ])
        cat.opacity = 0.5
        var invis = setInterval(function () {
            onKeyDown("f", () => {
              clearInterval(invis)
              let xy = [cat.pos.x, cat.pos.y];
            destroy(cat)
            cat = add([
	    // list of components
      sprite("spycat"),
	    pos(cat.pos.x, cat.pos.y),
      scale(2, 2),
      area(),
      body(),
      //opacity(0),
      "spycat",
      "cat",
      health(2),
    ])
            cat.opacity = 1
              cat.on("death", () => {
      cat.opacity = 0
      wait(2, () => {
        cat.setHP(cathealth)
      cat.pos.x = 80;
      cat.pos.y = 0;
        cat.opacity = 1
      })
    })
            })
        }, 100)
      })
      break;
  }  
  // Attacks
  onMouseDown((e) => {
    if (cooldown === true) {
      return false;
    }
    cooldown = true;
    switch (character) {
      case 'rocketdog':
        shootRocket([750, 0])
        break;
      case 'gunnerdog':
        let rand = Math.floor(Math.random() * 40) - 20;
        fury([500, rand])
        break;
    }
    switch (character2) {
      case 'spycat':
        break;
    }
    wait(cooldowntime, () => {
      cooldown = false;
    })
  })
  onMouseDown("right", () => {
    if (cooldown === true) {
      return false;
    }
    cooldown = true;
    switch (character) {
      case 'rocketdog':
        shootRocket([500, 200])
        break;
      case 'gunnerdog':
        break;
      case 'destroyerofallseas':
        swingSword()
        break;
    }
    wait(cooldowntime, () => {
      cooldown = false;
    })
  })
})
go("characters")