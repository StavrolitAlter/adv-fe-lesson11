describe('page ', function () {
    
    beforeEach(function () {
        browser.url('/');
    });

    it('should check title', function () {
        var title = browser.getTitle();
        expect(title).toBe('test title');
    });

    it('should inc', function () {
        var resBefore = browser.getText('.wealth-status__indicators li')[0];
        var inc = browser.click('.gift-tunner__controls .tune-controls__inc')[0];

        var bar = browser.getText('.gift-tunner__bar .bar')[0];

        expect(resBefore).toBe('Copper: 70');
        expect(bar.length).toBe(1);
        var resAfter = browser.getText('.wealth-status__indicators li')[0];
        expect(resAfter).toBe('Copper: 69');
    });
});
