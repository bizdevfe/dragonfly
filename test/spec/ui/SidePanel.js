define(function (require) {
    var SidePanel = require('ui/SidePanel');
    
    var sidepanel = new SidePanel({
        title: 'Hello',
        duration: 0
    });
    
    describe('SidePanel', function () {
        describe('new and render', function() {
            it('should be inited and rendered', function() {
                sidepanel.render();
                expect(sidepanel.states).toBeDefined();
                expect(sidepanel.options).toBeDefined();
                expect(sidepanel.main).toBeDefined();
                expect(sidepanel.painters).toBeDefined();
                expect(sidepanel.inited).toBeTruthy();
                expect(sidepanel.rendered).toBeTruthy();
            });
        });
        
        describe('close and open', function() {
            it('should be hidden or visible', function() {
                sidepanel.render();
                sidepanel.close();
                expect(sidepanel.isHidden()).toBeTruthy();
                sidepanel.open();
                expect(sidepanel.isHidden()).toBeFalsy();
            });
        });
        
        describe('destroy', function() {
            it('should be destroyed', function () {
                sidepanel.render();
                sidepanel.destroy();
                expect(sidepanel.states).toBeNull();
                expect(sidepanel.options).toBeNull();
                expect(sidepanel.main).toBeNull();
                expect(sidepanel.painters).toBeNull();
                expect(sidepanel.eventQueue).toBeUndefined();
                expect(sidepanel.domEventQueue).toBeUndefined();
                expect(sidepanel.destroyed).toBeTruthy();
            });
        });
    });
});
