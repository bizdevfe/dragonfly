define(function (require) {
    var Input = require('ui/Input');
    
    var input = new Input();
    
    describe('Input', function () {
        describe('new and render', function() {
            it('should be inited and rendered', function() {
                input.render('container');
                expect(input.states).toBeDefined();
                expect(input.options).toBeDefined();
                expect(input.main).toBeDefined();
                expect(input.painters).toBeDefined();
                expect(input.inited).toBeTruthy();
                expect(input.rendered).toBeTruthy();
            });
        });
        
        describe('hide and show', function() {
            it('should be hidden or visible', function() {
                input.render('container');
                input.hide();
                expect(input.isHidden()).toBeTruthy();
                input.show();
                expect(input.isHidden()).toBeFalsy();
            });
        });
        
        describe('disable and enable', function() {
            it('should be disabled or enabled', function() {
                input.render('container');
                input.disable();
                expect(input.isDisabled()).toBeTruthy();
                input.enable();
                expect(input.isDisabled()).toBeFalsy();
            });
        });
        
        describe('setValue and getValue', function() {
            it('should change the input value', function () {
                input.render('container');
                input.setValue('Hello');
                expect(input.main.value).toBe('Hello');
                expect(input.getValue()).toBe('Hello');
            });
        });
        
        describe('getLength', function() {
            it('should get the input value length', function () {
                input.render('container');
                input.setValue('Hello');
                expect(input.getLength()).toBe(5);
            });
        });
        
        describe('destroy', function() {
            it('should be destroyed', function () {
                input.render('container');
                input.destroy();
                expect(input.states).toBeNull();
                expect(input.options).toBeNull();
                expect(input.main).toBeNull();
                expect(input.painters).toBeNull();
                expect(input.eventQueue).toBeUndefined();
                expect(input.domEventQueue).toBeUndefined();
                expect(input.destroyed).toBeTruthy();
            });
        });
    });
});
