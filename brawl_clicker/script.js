//Config
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

document.addEventListener('selectstart', function(event) {
    event.preventDefault();
});
//Variables
let hero = document.getElementById('hero');
let h3 = document.getElementById('h3');
let bs = document.getElementById('bs');
let hs = document.getElementById('hs');
let progress = document.getElementById("progress");
let progress_bar = document.getElementById("progress-bar");
let list = document.getElementById('list');
let ads = document.getElementById('ads');
let progress_ads = document.getElementById('progress_ads');
let h2 = document.getElementById('h2');
let heroID = document.getElementById('hero');

var selectedColor = '#77DC8D';
var defaultColor = '#FBD548';

var score = 0;
var click = 1;
var data = null;
let time = 10;

class Hero {
	constructor (icon, max, price, name, id) {
		this.icon = icon;
		this.max = max;
		this.price = price;
		this.name = name;
		this.id = id;
	}
}

class Boost {
	constructor(icon, price, click, name, id) {
		this.icon = icon;
		this.price = price;
		this.click = click;
		this.name = name;
		this.id = id;
	}
}

var h = new Hero(`spike_1.webp`, 100, 0, 'Спайк', 0);
var b = new Boost(`cursor.png`, 0, 1, 'Обычный клик', 0);
var heroes = [h.id];
var boosts = [b.id];

var listH = [
	new Hero (`spike_1.webp`, 100, 0, 'Спайк', 0),
	new Hero (`brock_1.png`, 500, 100, 'Брок', 1),
	new Hero (`brock_2.png`, 5000, 500, 'Супер Брок', 2),
	new Hero (`bull_1.png`, 15000, 5000, 'Бул', 3),
	new Hero (`elprimo_1.png`, 25000, 15000, 'Эль Примо', 4),
	new Hero (`elprimo_2.png`, 35000, 25000, 'Король Эль Примо', 5),
	new Hero (`elprimo_gold.png`, 50000, 35000, 'Золотой эльпримо', 6),
	new Hero (`leon_1.png`, 70000, 50000, 'Лемон', 7),
	new Hero (`leon_gold.png`, 100000, 70000, 'Золотой Лемон', 8),

	new Hero (`amogus.png`, 120000, 100000, 'Амогус', 9),
	new Hero (`nita_1.png`, 150000, 120000, 'Нита', 10),
	new Hero (`nita_2.png`, 250000, 150000, 'супер Нита', 11),
	new Hero (`spike_gold.png`, 350000, 250000, 'Легендарный Спайк', 12),

	new Hero (`super_hero_1.png`, 500000, 350000, '???', 13),
	new Hero (`poco_2.png`, 700000, 500000, 'Поко', 14),
	new Hero (`gold_bird_1.png`, 900000, 700000, 'Легендарная птица', 15),

	new Hero (`colt_1.png`, 1000000, 900000, 'Кольт', 16),
	new Hero (`skibidi_touilet_1.png`, 1500000, 1000000, 'Кто это?', 17),
];

var listB = [
	new Boost(`cursor.png`, 0, 1, 'Обычный клик', 0),
	new Boost(`ball.webp`, 500, 5, 'Супермячик', 1),
	new Boost(`blue_star.png`, 5000, 10, 'Синяя звезда', 2),
	new Boost(`creature.webp`, 25000, 50, 'Существо', 3),
	new Boost(`gem.png`, 100000, 150, 'Удачный изумруд', 4),
	new Boost(`gold_star.webp`, 150000, 500, 'Золотая звезда', 5),
	new Boost(`green_star.webp`, 300000, 1000, 'Зелёная звезда', 6),
	new Boost(`skull.png`, 500000, 2000, 'Черепок', 7),
	new Boost(`star.png`, 900000, 5000, 'Редкая звезда', 8),
];

function changeText() {
  	h3.innerText = `${score}`;
}

//Function to update the progress bar and text
function updateProgressBar() {
	score = score + click;
}

function onHeroClick() {

   progress_bar.style.transform = 'scale(0.97)';
  
   setTimeout(() => {
        progress_bar.style.transform = 'scale(1)';
   }, 25);

   heroID.style.transform = 'scale(0.97)';
   setTimeout(() => {
        heroID.style.transform = 'scale(1)';
   }, 25);

	if (score <= h.max - 1) {
		updateProgressBar();
		changeText();

		player.setData({
        	score_: [score],
        	click_: [click],
        	selected_hero_id: [h.id],
        	selected_boost_id: [b.id],
        	heroes_: [heroes],
		  	boosts_: [boosts],
    	}).then(() => {
        	console.log('data is set');
    	});
	} else {
		progress.style.width = progress_bar.offsetWidth + "px";
	}
}

function initHero(h) {
	hero.src = `res/heroes/${h.icon}`;
}

function initBoost(b_) {
	b = b_;
	click = b_.click;
}

function selectBs() {
	bs.style.backgroundColor = selectedColor;
	hs.style.backgroundColor = defaultColor;
	initBoosts();
}

function selectHs() {
	hs.style.backgroundColor = selectedColor;
	bs.style.backgroundColor = defaultColor;
	initHeroes();
}

function selectHero(hero) {
	h = hero;
	player.setData({
   	   score_: [score],
       click_: [click],
       selected_hero_id: [h.id],
       selected_boost_id: [b.id],
       heroes_: [heroes],
	   boosts_: [boosts],
    }).then(() => {
       console.log('data is set');
    });
	initHero(h);
}

function selectBoost(boost) {
	b = boost;
	player.setData({
      score_: [score],
      click_: [click],
      selected_hero_id: [h.id],
      selected_boost_id: [b.id],
      heroes_: [heroes],
	  boosts_: [boosts],
   }).then(() => {
      console.log('data is set');
   });
   initBoost(b);
}

function initHeroes() {
	list.innerHTML = '';
	listH.forEach(item => {
	   const li = document.createElement('li');
	   li.classList.add('list-item');
	    
	   const h4 = document.createElement('h4');
	   h4.textContent = item.name;
	   h4.id = 'name';
	   li.appendChild(h4);
	    
	   const img = document.createElement('img');
	   img.src = `res/heroes/${item.icon}`;
	   li.appendChild(img);
	    
	   const button = document.createElement('button');

	   if (heroes.includes(item.id)) {
				button.textContent = 'Выбрать';
				button.id = 'select';
				button.addEventListener('click', () => {
		   		console.log('Выбран: ' + item.name);
		   		selectHero(item);
			});
		} else {
			button.textContent = 'Купить ' + item.price;
		   button.id = 'select';
		   button.addEventListener('click', () => {
		   	if (score >= item.price) {
		   		score = score - item.price;
		   		button.textContent = 'Выбрать';
		   		heroes.push(item.id);
		   		changeText();
		   		console.log('Выбран: ' + item.name);
		      	selectHero(item);
		      	button.addEventListener('click', () => {
	   				console.log('Выбран повторно: ' + item.name);
	   				selectHero(item);
					});
					selectHs();
		   	}
		   });
		}
	    li.appendChild(button);
	    
	    const hr = document.createElement('hr');
	    li.appendChild(hr);
	    
	    list.appendChild(li);
	});
}

function initBoosts() {
	list.innerHTML = '';
	listB.forEach(item => {
		const li = document.createElement('li');
	   li.classList.add('list-item');
	    
	   const h4 = document.createElement('h4');
	   h4.textContent = item.name + ' x' + item.click;
	   h4.id = 'name';
	   li.appendChild(h4);
	    
	   const img = document.createElement('img');
	   img.src = `res/boosts/${item.icon}`;
	   li.appendChild(img);
	    
	   const button = document.createElement('button');
	   if (boosts.includes(item.id)) {
			button.textContent = 'Выбрать';
			button.id = 'select';
			button.addEventListener('click', () => {
	   		console.log('Выбран: ' + item.name);
	   		selectBoost(item);
			});
		} else {
			button.textContent = 'Купить ' + item.price;
		   button.id = 'select';
		   button.addEventListener('click', () => {
		   	if (score >= item.price) {
		   		score = score - item.price;
		   		button.textContent = 'Выбрать';
		   		boosts.push(item.id);
		   		changeText();
		   		console.log('Выбран: ' + item.name);
		      	selectBoost(item);
		      	button.addEventListener('click', () => {
	   				console.log('Выбран повторно: ' + item.name);
	   				selectBoost(item);
					});
					selectBs();
		   	}
		   });
		}
	   li.appendChild(button);
	    
	   const hr = document.createElement('hr');
	   li.appendChild(hr);
	    
	   list.appendChild(li);
	});
}

//Yandex Games
var player;
YaGames
	.init()
	.then(ysdk => {
		window.ysdk = ysdk;
		console.log("Yandex SDK initialized");

		initPlayer().then(_player => {
        	data = _player.getData([
            	'score_', 
            	'click_', 
            	'selected_hero_id',
            	'selected_boost_id',
            	'heroes_',
            	'boosts_',
            ]).then(_data => {

		      	score = parseInt(_data.score_[0]);
		       	click = parseInt(_data.click_[0]);
		       	selected_hero_id = parseInt(_data.selected_hero_id[0]);
		       	selected_boost_id = parseInt(_data.selected_boost_id[0]);

		       	heroes = _data.heroes_[0];
		       	boosts = _data.boosts_[0];

		       	h = listH[selected_hero_id];
		       	b = listB[selected_boost_id];

		       	selectHero(h)
		       	selectBoost(b)
		       	selectHs();

		      	changeText();
            }
            ).catch(err => {
		    		console.log("Ошибка при инициализации data");

		    		b = new Boost(`cursor.png`, 0, 1, 'Обычный клик', 0);
		       		h = new Hero(`spike_1.webp`, 100, 0, 'Спайк', 0);

					changeText();

					selectHero(h)
		       		selectBoost(b)

		       		selectHs();

					player.setData({
				        score_: [score],
				        click_: [click],
				        selected_hero_id: [h.id],
				        selected_boost_id: [b.id],
				        heroes_: [heroes],
			  			boosts_: [boosts],
			    	}).then(() => {
			        	console.log('data is set');
			    	});

		    	}
		    	);
    	}).catch(err => {
    		console.log("Ошибка при инициализации объекта Player");
			changeText();

			b = new Boost(`cursor.png`, 0, 1, 'Обычный клик', 0);
		    h = new Hero(`spike_1.webp`, 100, 0, 'Спайк', 0);

			initBoost(b);
       		initHero(h);

       		selectHs();
    	});

		ysdk.features.LoadingAPI?.ready();
		ysdk.adv.showFullscreenAdv({
    	callbacks: {
        onClose: function(wasShown) {
          console.log("Full screen adv shown");
        },
        onError: function(error) {
          console.log("Full screen adv error");
        }
    }
	})
});

function initPlayer() {
    return ysdk.getPlayer().then(_player => {
            player = _player;
            return player;
        });
}

function doubleClick() {
	progress_ads.style.display = 'flex';
	ysdk.adv.showRewardedVideo({
	    callbacks: {
	        onOpen: () => {
	        	progress_ads.style.display = 'none';
	        },
	        onRewarded: () => {
	        	click = click * 2;
	        	progress_ads.style.display = 'none';
	        	hide_doubleClick();
	        	const countdown = setInterval(() => {
		            time--;
			        if (time === 0) {
			            clearInterval(countdown);
			            click = click / 2;
			            time = 10;
			            show_doubleClick();
			        }
	        	}, 1000);
	        },
	        onClose: () => {
	        	progress_ads.style.display = 'none';
	        }, 
	        onError: (e) => {
	        	progress_ads.style.display = 'none';
	        }
	    }
	});
}

function hide_doubleClick() {
	ads.style.display = 'none';
	h2.style.display = 'flex';
}

function show_doubleClick() {
	ads.style.display = 'flex';
	h2.style.display = 'none';
}

//Init
initHero(h);
changeText();
selectHs();