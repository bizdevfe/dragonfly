define(function (require) {
    var Button = require('ui/Button');
    
    var button = new Button({
            content: 'Hello'
        }),
        containerId = 'button-container';
    
    describe('Button', function () {
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
        
        it('should be destroyed', function () {
            button.render(containerId);
            button.destroy();
            expect(button.destroyed).toBeTruthy();
        });
    });
});
