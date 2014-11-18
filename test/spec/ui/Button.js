define(function (require) {
    var Button = require('ui/Button');
    
    var button = new Button({
        text: 'Hello'
    });
    
    describe('Button', function () {
        describe('new and render', function() {
            it('should be inited and rendered', function() {
                button.render('container');
                expect(button.states).toBeDefined();
                expect(button.options).toBeDefined();
                expect(button.main).toBeDefined();
                expect(button.painters).toBeDefined();
                expect(button.inited).toBeTruthy();
                expect(button.rendered).toBeTruthy();
            });
        });
        
        describe('hide and show', function() {
            it('should be hidden or visible', function() {
                button.render('container');
                button.hide();
                expect(button.isHidden()).toBeTruthy();
                button.show();
                expect(button.isHidden()).toBeFalsy();
            });
        });
        
        describe('disable and enable', function() {
            it('should be disabled or enabled', function() {
                button.render('container');
                button.disable();
                expect(button.isDisabled()).toBeTruthy();
                button.enable();
                expect(button.isDisabled()).toBeFalsy();
            });
        });
        
        describe('setText and getText', function() {
            it('should change the button text', function () {
                button.render('container');
                button.setText('Goodbye');
                expect(button.main.innerHTML).toBe('Goodbye');
                expect(button.getText()).toBe('Goodbye');
            });
        });
        
        describe('destroy', function() {
            it('should be destroyed', function () {
                button.render('container');
                button.destroy();
                expect(button.states).toBeNull();
                expect(button.options).toBeNull();
                expect(button.main).toBeNull();
                expect(button.painters).toBeNull();
                expect(button.eventQueue).toBeUndefined();
                expect(button.domEventQueue).toBeUndefined();
                expect(button.destroyed).toBeTruthy();
            });
        });
    });
});
