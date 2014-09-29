define(function (require) {
    var SidePanel = require('ui/SidePanel');
    
    var sidepanel = new SidePanel({
        title: 'Hello'
    });
    
    describe('SidePanel', function () {
        it('should be inited', function () {
            expect(sidepanel.inited).toBeTruthy();
            expect(sidepanel.rendered).toBeFalsy();
        });
        
        it('should be rendered', function () {
            sidepanel.render();
            expect(sidepanel.rendered).toBeTruthy();
        });
        
        it('should be hidden by hide()', function () {
            sidepanel.render();
            sidepanel.hide();
            expect(sidepanel.isHidden()).toBeTruthy();
        });
        
        it('should be destroyed', function () {
            sidepanel.render();
            sidepanel.destroy();
            expect(sidepanel.destroyed).toBeTruthy();
        });
    });
});
