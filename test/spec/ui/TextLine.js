define(function (require) {
    var Textarea = require('ui/Textarea'),
        TextLine = require('extension/TextLine');
    
    var textline = new Textarea({
        extensions: [
            new TextLine()
        ]
    });
    
    describe('TextLine', function () {
        describe('new and render', function() {
            it('should be inited and rendered', function() {
                textline.render('container');
                expect(textline.states).toBeDefined();
                expect(textline.options).toBeDefined();
                expect(textline.main).toBeDefined();
                expect(textline.painters).toBeDefined();
                expect(textline.inited).toBeTruthy();
                expect(textline.rendered).toBeTruthy();
            });
        });
        
        describe('hide and show', function() {
            it('should be hidden or visible', function() {
                textline.render('container');
                textline.hide();
                expect(textline.isHidden()).toBeTruthy();
                textline.show();
                expect(textline.isHidden()).toBeFalsy();
            });
        });
        
        describe('disable and enable', function() {
            it('should be disabled or enabled', function() {
                textline.render('container');
                textline.disable();
                expect(textline.isDisabled()).toBeTruthy();
                textline.enable();
                expect(textline.isDisabled()).toBeFalsy();
            });
        });
        
        describe('setValue and getValue', function() {
            it('should change the textline value', function () {
                textline.render('container');
                textline.setValue('Hello');
                expect(textline.main.value).toBe('Hello');
                expect(textline.getValue()).toBe('Hello');
            });
        });
        
        describe('getLength', function() {
            it('should get the textline value length', function () {
                textline.render('container');
                textline.setValue('1\r\n2');
                expect(textline.getLength()).toBe(2);
            });
        });
        
        describe('getValueArray', function() {
            it('should get the textline value array', function () {
                textline.render('container');
                textline.setValue(' 1 \r\n 2 \r\n');
                var valueArray = textline.getValueArray();
                expect(valueArray.length).toBe(3);
                expect(valueArray[0]).toBe('1');
                expect(valueArray[1]).toBe('2');
                expect(valueArray[2]).toBe('');
            });
        });
        
        describe('destroy', function() {
            it('should be destroyed', function () {
                textline.render('container');
                textline.destroy();
                expect(textline.states).toBeNull();
                expect(textline.options).toBeNull();
                expect(textline.main).toBeNull();
                expect(textline.painters).toBeNull();
                expect(textline.eventQueue).toBeUndefined();
                expect(textline.domEventQueue).toBeUndefined();
                expect(textline.destroyed).toBeTruthy();
            });
        });
    });
});
