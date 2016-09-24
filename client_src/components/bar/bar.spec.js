var Bar = require('components/bar/bar.js');

describe('I want to have progress Bar that', function() {

	describe('in case of any (resource or indicator) model passed', function() {

		beforeAll(function() {

			var indicatorModel = require('models/indicator.js');
			var resourceModel = require('models/resource.js');
			var initialIndicatorValue = 50;

			var fakeIndicatorModel = new indicatorModel(initialIndicatorValue);
			var fakeResourceModel = new resourceModel({
				name: 'Some',
				attitudeEffect: 1,
				stashCount: 70
			});

			var barForIndicator = new Bar({
				model: fakeIndicatorModel,
				prop: 'count'
			});
			var barForResource = new Bar({
				model: fakeResourceModel,
				prop: 'giftCount'
			});

			this.barForIndicator = barForIndicator;
			this.barForResource = barForResource;
			this.fakeIndicatorModel = fakeIndicatorModel;
			this.fakeResourceModel = fakeResourceModel;
			this.initialIndicatorValue = initialIndicatorValue;

		});

		it('should be an object', function() {
			expect(
				typeof this.barForIndicator === 'object' &&
				typeof this.barForResource === 'object'
			).toBeTruthy();
		});

		describe('it\'s properties:', function() {
			describe('"elem"', function() {
				it('should be jQuery collection', function() {
					expect(
						typeof this.barForResource.elem === 'object' &&
						typeof this.barForResource.elem.jquery === 'string' &&
						typeof this.barForIndicator.elem === 'object' &&
						typeof this.barForIndicator.elem.jquery === 'string'
					).toBeTruthy();
				});
			});
			describe('"render"', function() {
				it('should be function', function() {
					expect(
						typeof this.barForResource.render === 'function' &&
						typeof this.barForIndicator.render === 'function'
					).toBeTruthy();
				});
			});
		});
		describe('it\'s models', function() {
			it('should have bar\'s renderer as a subscriber', function() {
				expect(
					this.fakeIndicatorModel.subscribers.indexOf(this.barForIndicator.render) !== -1 &&
					this.fakeResourceModel.subscribers.indexOf(this.barForResource.render) !== -1
				).toBeTruthy();
			});
		});
		describe('when "render" is called', function() {

			describe('and corresponding model\'s property was not set' , function() {

				it('it returns bar object itself', function() {
					expect(
						this.barForResource.render() === this.barForResource &&
						this.barForIndicator.render() === this.barForIndicator
					).toBeTruthy();
				});

				it('for resourse model - its bar\'s "elem" is empty', function() {
					expect(
						(this.barForResource.elem.find('div').html().match(/\#+/g) || [''])[0].length === 0
					).toBeTruthy();
				});
				it('for indicator model - its bar\'s "elem" has initial lenght', function() {
					expect(
						(this.barForIndicator.elem.find('div').html().match(/\#+/g) || [''])[0].length === this.initialIndicatorValue
					).toBeTruthy();
				});

			});

			describe('and corresponding model\'s property was set' , function() {

				it('it returns bar object itself', function() {

					var propertyValue = -3;

					this.fakeResourceModel.set('giftCount', propertyValue, true);
					this.fakeIndicatorModel.set('count', propertyValue, true);

					var resourseCall = this.barForResource.render();
					var indicatorCall = this.barForIndicator.render();

					expect(
						resourseCall === this.barForResource &&
						indicatorCall === this.barForIndicator
					).toBeTruthy();
				});

				it('its bar\'s "elem" has as many hashes as property\'s absolute value', function() {

					var propertyValue, resourseCall, indicatorCall;
					var barForResource = this.barForResource;
					var barForIndicator = this.barForIndicator;

					var tryNewPropValue = function(value) {
						this.fakeResourceModel.set('giftCount', value);
						this.fakeIndicatorModel.set('count', value);
						resourseCall = barForResource.render();
						indicatorCall = barForIndicator.render();
					};
					tryNewPropValue = tryNewPropValue.bind(this);

					propertyValue = -3;
					tryNewPropValue(-3);
					expect(
						(barForResource.elem.find('div').html().match(/\#+/g) || [''])[0].length === Math.abs(propertyValue) &&
						(barForIndicator.elem.find('div').html().match(/\#+/g) || [''])[0].length === Math.abs(propertyValue)
					).toBeTruthy();

					propertyValue = 100;
					tryNewPropValue(100);
					expect(
						(barForResource.elem.find('div').html().match(/\#+/g) || [''])[0].length === Math.abs(propertyValue) &&
						(barForIndicator.elem.find('div').html().match(/\#+/g) || [''])[0].length === Math.abs(propertyValue)
					).toBeTruthy();

					propertyValue = 0;
					tryNewPropValue(0);
					expect(
						(barForResource.elem.find('div').html().match(/\#+/g) || [''])[0].length === Math.abs(propertyValue) &&
						(barForIndicator.elem.find('div').html().match(/\#+/g) || [''])[0].length === Math.abs(propertyValue)
					).toBeTruthy();

				});

				it('in case of positive value - hashes wrapper doesn\'t have "negative" class, and vice versa', function() {

					var propertyValue, resourseCall, indicatorCall;
					var barForResource = this.barForResource;
					var barForIndicator = this.barForIndicator;

					var tryNewPropValue = function(value) {
						this.fakeResourceModel.set('giftCount', value);
						this.fakeIndicatorModel.set('count', value);
						resourseCall = barForResource.render();
						indicatorCall = barForIndicator.render();
					};
					tryNewPropValue = tryNewPropValue.bind(this);

					propertyValue = -3;
					tryNewPropValue(-3);
					expect(
						resourseCall.elem.find('.negative').length === 1 &&
						indicatorCall.elem.find('.negative').length === 1
					).toBeTruthy();

					propertyValue = 200;
					tryNewPropValue(200);
					expect(
						resourseCall.elem.find('.negative').length === 0 &&
						indicatorCall.elem.find('.negative').length === 0
					).toBeTruthy();

				});

			});

		});

	});


});