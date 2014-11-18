define(function (require) {
    var Dialog = require('ui/Dialog');
    
    var dialog = new Dialog({
        title: 'Hello',
        content: 'Content'
    });
    
    describe('Dialog', function () {
        describe('new and render', function() {
            it('should be inited and rendered', function() {
                dialog.render();
                expect(dialog.states).toBeDefined();
                expect(dialog.options).toBeDefined();
                expect(dialog.main).toBeDefined();
                expect(dialog.painters).toBeDefined();
                expect(dialog.inited).toBeTruthy();
                expect(dialog.rendered).toBeTruthy();
            });
        });
        
        describe('close and open', function() {
            it('should be hidden or visible', function() {
                dialog.render();
                dialog.close();
                expect(dialog.isHidden()).toBeTruthy();
                dialog.open();
                expect(dialog.isHidden()).toBeFalsy();
            });
        });
        
        describe('getContent', function() {
            it('should get the dialog content HTMLElement', function() {
                dialog.render();
                expect(dialog.getContent().innerHTML).toBe('Content');
            });
        });
        
        describe('destroy', function() {
            it('should be destroyed', function () {
                dialog.render();
                dialog.destroy();
                expect(dialog.states).toBeNull();
                expect(dialog.options).toBeNull();
                expect(dialog.main).toBeNull();
                expect(dialog.painters).toBeNull();
                expect(dialog.eventQueue).toBeUndefined();
                expect(dialog.domEventQueue).toBeUndefined();
                expect(dialog.destroyed).toBeTruthy();
            });
        });
    });
});
