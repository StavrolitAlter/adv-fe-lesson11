var Bar = require('components/bar/bar.js');

module.exports = function GodIndicator(options) {

	var elem = $('<div></div>');
	var indicatorModel = options.indicatorModel;
	var prop = 'count';

	var bar = new Bar({
		model: indicatorModel,
		prop: prop
	});

	function render() {
		elem.html(App.templates['god-indicator']({
			indicatorName: options.name
		}));

		elem.find('.god-indicator__bar').html(bar.render().elem);
		return this;
	}

	return {
		render: render,
		elem: elem
	}
};
