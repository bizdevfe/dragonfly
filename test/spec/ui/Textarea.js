define(function (require) {
    var Textarea = require('ui/Textarea');
    
    var textarea = new Textarea();
    
    describe('Textarea', function () {
        describe('new and render', function() {
            it('should be inited and rendered', function() {
                textarea.render('container');
                expect(textarea.states).toBeDefined();
                expect(textarea.options).toBeDefined();
                expect(textarea.main).toBeDefined();
                expect(textarea.painters).toBeDefined();
                expect(textarea.inited).toBeTruthy();
                expect(textarea.rendered).toBeTruthy();
            });
        });
        
        describe('hide and show', function() {
            it('should be hidden or visible', function() {
                textarea.render('container');
                textarea.hide();
                expect(textarea.isHidden()).toBeTruthy();
                textarea.show();
                expect(textarea.isHidden()).toBeFalsy();
            });
        });
        
        describe('disable and enable', function() {
            it('should be disabled or enabled', function() {
                textarea.render('container');
                textarea.disable();
                expect(textarea.isDisabled()).toBeTruthy();
                textarea.enable();
                expect(textarea.isDisabled()).toBeFalsy();
            });
        });
        
        describe('setValue and getValue', function() {
            it('should change the textarea value', function () {
                textarea.render('container');
                textarea.setValue('Hello');
                expect(textarea.main.value).toBe('Hello');
                expect(textarea.getValue()).toBe('Hello');
            });
        });
        
        describe('getLength', function() {
            it('should get the textarea value length', function () {
                textarea.render('container');
                textarea.setValue('1\r\n2');
                expect(textarea.getLength()).toBe(2);
            });
        });
        
        describe('destroy', function() {
            it('should be destroyed', function () {
                textarea.render('container');
                textarea.destroy();
                expect(textarea.states).toBeNull();
                expect(textarea.options).toBeNull();
                expect(textarea.main).toBeNull();
                expect(textarea.painters).toBeNull();
                expect(textarea.eventQueue).toBeUndefined();
                expect(textarea.domEventQueue).toBeUndefined();
                expect(textarea.destroyed).toBeTruthy();
            });
        });
    });
});
