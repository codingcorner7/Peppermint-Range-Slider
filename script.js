window.addEventListener("DOMContentLoaded",() => {
	const pm = new PeppermintRangeSlider("#peppermint");
});

class PeppermintRangeSlider {
	constructor(el) {
		this.input = document.querySelector(el);
		this.init();
	}
	init() {
		this.input?.addEventListener("input",this.update.bind(this));
		this.update();
	}
	update(e) {
		let value = this.input.defaultValue;
		// when manually set
		if (e) value = e.target?.value;
		// when initiated
		else this.input.value = value;
		// percentge for the background size and handle texture position
		const min = +this.input.min || 0;
		const max = +this.input.max || 100;
		const percentRaw = (value - min) / (max - min) * 100;
		const percent = +percentRaw.toFixed(2);
		const handleRaw = 1.5 * (1 - percent / 100) - 1.125;
		const handle = +handleRaw.toFixed(4);
		const percentStyle = `calc(${percent}% + ${handle}em)`;

		this.input.parentElement?.style.setProperty("--percent",percentStyle);
	}
}