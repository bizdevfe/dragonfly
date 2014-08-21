define(function (require) {
    var Button = require('Button'),
        _ = require('underscore').noConflict();
    var containerId = 'button-container';
    
    describe('Button', function () {
        var button;
        beforeEach(function() {
            button = new Button({
                content: 'Hello'
            });
        });
        
        it('should be inited', function () {
            expect(button.inited).toBeTruthy();
            expect(button.rendered).toBeFalsy();
        });
        
        it('should be rendered', function () {
            button.render(containerId);
            expect(button.rendered).toBeTruthy();
        });
        
        it('should change the button text via setContent()', function () {
            button.render(containerId);
            button.setContent('Goodbye');
            expect(button.main.innerHTML).toBe('Goodbye');
        });
        
        it('should be disabled by disable()', function () {
            button.render(containerId);
            button.disable();
            expect(button.isDisabled()).toBeTruthy();
        });
        
        it('should be hidden by hide()', function () {
            button.render(containerId);
            button.hide();
            expect(button.isHidden()).toBeTruthy();
        });
        
        it('should trigger callback when clicked', function () {
            button.render(containerId);
            var clicked = false;
            button.on('click', function(e) {
                clicked = true;
                console.log(e, this);
            });
            button.main.click();
            expect(clicked).toBeTruthy();
        });
        
        it('should be destroyed', function () {
            button.render(containerId);
            button.destroy();
            expect(button.destroyed).toBeTruthy();
        });
    });
});
