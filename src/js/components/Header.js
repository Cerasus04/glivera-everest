function isFunction(func) {
	return func instanceof Function;
}
function debounce(delay, fn) {
	let timerId;
	return (...args) => {
		if (timerId) {
			clearTimeout(timerId);
		}
		timerId = setTimeout(() => {
			fn(...args);
			timerId = null;
		}, delay);
	};
}
const onWindowScroll = cb => {
	if (!cb && !isFunction(cb)) return;

	const handleScroll = () => {
		cb(window.pageYOffset);
	};

	window.addEventListener('scroll', debounce(15, handleScroll));

	handleScroll();
};

class Header {
	get SELECTORS() {
		return {
			header: '.header',
			menuTrigger: '.header__menu_trigger',
		};
	}

	get CLASSNAMES() {
		return {
			bodyScrollState: 'body--scroll_state',
			bodyOpenMenuState: 'body--open_menu_state',
			headerScrollState: 'scroll_mod',
		};
	}

	constructor() {
		this.$body = document.body;
		this.$header = document.querySelector(this.SELECTORS.header);
		this.$menuTrigger = document.querySelectorAll(this.SELECTORS.menuTrigger);
		this.openMenuState = false;
		this.headerScroll = this.headerScroll.bind(this);

		this.init = this.init.bind(this);
		this.init();
	}

	openMenu() {
		if (!this.openMenuState) {
			// console.log('open');
			this.$body.classList.add(this.CLASSNAMES.bodyOpenMenuState);
			this.openMenuState = true;
		} else {
			// console.log('close');
			this.$body.classList.remove(this.CLASSNAMES.bodyOpenMenuState);
			this.openMenuState = false;
		}
	}

	headerScroll(windowScrollTop) {
		if (windowScrollTop > 10 && !this.$body.classList.contains(this.CLASSNAMES.bodyScrollState)) {
			this.$body.classList.add(this.CLASSNAMES.bodyScrollState);
			this.$header.classList.add(this.CLASSNAMES.headerScrollState);
		}

		if (windowScrollTop <= 10 && this.$body.classList.contains(this.CLASSNAMES.bodyScrollState)) {
			this.$body.classList.remove(this.CLASSNAMES.bodyScrollState);
			this.$header.classList.remove(this.CLASSNAMES.headerScrollState);
		}
	}

	init() {
		if (typeof (this.$header) !== 'undefined' && this.$header != null) {
			onWindowScroll(this.headerScroll);
			this.$menuTrigger.forEach(item => {
				item.addEventListener('click', () => {
					this.openMenu();
				});
			});
		}
	}
}

export default Header;
