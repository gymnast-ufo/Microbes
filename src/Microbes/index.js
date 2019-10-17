import CLASS_NAMES from '../components/CLASS_NAMES';
import { isMobile } from '../components/helpers';

/*
 * создание микробов на странице
 *
 * @param {object} Чашка Петри, где будут развиваться микробы
*/
export default class Microbes {
	constructor(petriDish) {
		this.petriDish = petriDish;
		this.defaultWidth = 400;
		this.interval = 3000;

		this.setQuantity = this.setQuantity.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.size = this.size.bind(this);

		this.init();
	}

	init = () => {
		this.setQuantity();
		this.shouldMicrobeCreate();
	}

	//установить максимальное количество микробов на странице	
	setQuantity = e => {
		let width = window.innerWidth,
		height = document.body.offsetHeight, 
		displayKoeff;

		width <= this.defaultWidth * 1 && (displayKoeff = 1);
		width <= this.defaultWidth * 2 && (displayKoeff = 1.7);
		width > this.defaultWidth * 2 && (displayKoeff = 2.5);

		this.microbeMaxQuantity = Math.round((height / 1000) * displayKoeff);
	}

	//проверить количество микробов на странице
	checkMicrobesQuantity = () => document.querySelectorAll('.microbe').length;

	//проверка на создание микроба
	shouldMicrobeCreate = () => this.checkMicrobesQuantity() < this.microbeMaxQuantity && this.createMicrobe();

	//создание этого микроба и следующего
	createMicrobe = () => {
		let promise = new Promise((resolve, reject) => {
			setTimeout(() => resolve(this.microbeDOM()), this.interval);
		});

		promise
			.then(result => {
				this.petriDish.appendChild(result);
				this.animationTime = parseInt(window.getComputedStyle(result).animationDuration) * 1000;

				setInterval(() => this.changeAnimation(result), this.animationTime);
				result.addEventListener('click', this.handleClick);
				window.addEventListener('resize', e => this.size(result));
				this.setMessagePosition(result);

				this.shouldMicrobeCreate();
			});
	}

	// создать DOM микроба
	microbeDOM = () => {
		let microbe = document.createElement('div');
		let microbeMessage = document.createElement('div');
		let microbeBody = document.createElement('div');
		let microbeBang = document.createElement('div');
		let skin = `${CLASS_NAMES.microbe.body.main}--${this.random(1, 5)}`;

		microbe.classList.add(CLASS_NAMES.microbe.main, this.setRandomAnimate());
		microbeMessage.classList.add(CLASS_NAMES.microbe.message.main);
		microbeBody.classList.add(CLASS_NAMES.microbe.body.main, skin);
		microbeBang.classList.add(CLASS_NAMES.microbe.bang.main);

		microbe.appendChild(microbeMessage);
		microbe.appendChild(microbeBody);
		microbe.appendChild(microbeBang);

		this.size(microbe);

		let { top, left } = this.setMicrobeCoordinates();
		microbe.style.top = `${top}px`;
		microbe.style.left = `${left}px`;

		return microbe;
	}

	size = (microbe = null) => {
		this.microbeWidth = isMobile() ? 67 : 134;
		this.microbeHeight = isMobile() ? 68.5 : 137;

		if (microbe && microbe.classList.contains(CLASS_NAMES.microbe.main)) {
			microbe.style.width = `${this.microbeWidth}px`;
			microbe.style.height = `${this.microbeHeight}px`;
		}
	}

	/* рандом от min до max
	 *
	 * @param {number} минимум
	 * @param {number} максимум
	*/
	random = (min = 1, max = 5) => {
		let random = min + Math.random() * (max + 1 - min);
		random = Math.floor(random);

		return random;
	}

	/*
	 * установка случайных координат микроба
	 *
	 * @param {number} ширина микроба
	 * @param {number} высота микроба
	*/
	setMicrobeCoordinates = () => {
		let firsts = this.checkMicrobesQuantity() < 2;
		let maxTop = this.petriDish.offsetHeight - this.microbeHeight;
		let maxLeft = this.petriDish.offsetWidth - this.microbeWidth;

		firsts && (maxTop = window.innerHeight * 1);

		let top = this.random(0, maxTop);
		let left = this.random(0, maxLeft);

		return {
			top: top,
			left: left
		};
	}

	//установка случайной анимации микроба
	setRandomAnimate = () => `microbe--animate-${this.random(1, 5)}`;

	// смена анимации на случайную
	changeAnimation = microbe => {
		let animationClass = microbe.classList[1];

		microbe.classList.remove(animationClass);
		microbe.classList.add(this.setRandomAnimate());
	}

	//клик по микробу
	handleClick = e => {
		let microbe = e.target.parentNode;
		let body = microbe.querySelector(`.${CLASS_NAMES.microbe.body.main}`);
		let bang = microbe.querySelector(`.${CLASS_NAMES.microbe.bang.main}`);
		let { transitionDuration, transitionDelay } = window.getComputedStyle(bang);
		transitionDuration = parseFloat(transitionDuration.split(',')[1]);
		transitionDelay = parseFloat(transitionDelay.split(',')[1]);

		let delay = (transitionDuration + transitionDelay) * 1000;
		let transform = window.getComputedStyle(microbe).transform;

		bang.classList.add(CLASS_NAMES.microbe.bang.active);
		microbe.style.transform = transform;
		microbe.classList.remove(microbe.classList[1]);
		body.classList.add(CLASS_NAMES.microbe.body.hide);

		setTimeout(() => microbe.remove(), delay);
	}

	setMessagePosition = microbe => {
		let message = microbe.querySelector(`.${CLASS_NAMES.microbe.message.main}`);
		let delay = 2500;
		let microbeCenter = {};
		let center = {};

		microbeCenter.y = microbe.offsetTop + (microbe.offsetHeight / 2);
		microbeCenter.x = microbe.offsetLeft + (microbe.offsetWidth / 2);

		center.y = window.innerHeight / 2;
		center.x = window.innerWidth / 2;

		microbeCenter.y > center.y
			? message.classList.add(CLASS_NAMES.microbe.message.toTop)
			: message.classList.add(CLASS_NAMES.microbe.message.toBottom);

		microbeCenter.x > center.x
			? message.classList.add(CLASS_NAMES.microbe.message.toLeft)
			: message.classList.add(CLASS_NAMES.microbe.message.toRight);
	}

	showMessage = microbe => microbe.querySelector(`.${CLASS_NAMES.microbe.message.main}`).classList.add(CLASS_NAMES.microbe.message.active);
}