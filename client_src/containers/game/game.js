var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var UserWealthBlock = require('containers/user-wealth/user-wealth.js');
var GiftTunnerBlock = require('containers/gift-tunner/gift-tunner.js');
var GodIndicator = require('containers/god-indicator/god-indicator.js');
var ResourceModel = require('models/resource.js');
var IndicatorModel = require('models/indicator.js');

module.exports = function Game() {

	var elem = $('<div></div>');

	var initialGodAttitude = 50;
	var initialResourcesDataArray = [
		{
			name: 'Copper',
			attitudeEffect: 1,
			stashCount: 70
		}, {
			name: 'Gold',
			attitudeEffect: 4,
			stashCount: 30
		}, {
			name: 'Diamond',
			attitudeEffect: 10,
			stashCount: 10
		}
	];
	var tunnersArray = [];
	var resourcesModelsArray = [];

	initialResourcesDataArray.forEach(function(resourceDataObj) {
		var resourceModel = new ResourceModel(resourceDataObj);
		resourcesModelsArray.push(resourceModel);
		tunnersArray.push(new GiftTunnerBlock({
			resourceModel: resourceModel
		}));
	});

	var indicatorModel = new IndicatorModel(initialGodAttitude);
	var godIndicatorsArray = [
		new GodIndicator({
			name: 'Attitude',
			indicatorModel: indicatorModel
		})
	];

	var godGiftForm = new GodGiftForm({
		tunnersArray: tunnersArray,
		godIndicatorsArray: godIndicatorsArray
	});
	var userWealthBlock = new UserWealthBlock({
		resourcesModelsArray: resourcesModelsArray
	});

	// Models change observing
	Model.subscribeAll(resourcesModelsArray, function() {
		var commonAttitudeEffect = 0;
		resourcesModelsArray.forEach(function(resourcesModel) {
			commonAttitudeEffect +=
				resourcesModel.get('giftCount') * resourcesModel.get('attitudeEffect');
		});
		indicatorModel.setCount(
			initialGodAttitude - commonAttitudeEffect
		);
	});

	function render() {
		userWealthBlock.render();
		godGiftForm.render();

		return this;
	}
	
	elem.append(userWealthBlock.elem);
	elem.append(godGiftForm.elem);

	return {
		render: render,
		elem: elem
	};
};
