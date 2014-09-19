define(function (require) {
    var Events = require('event/EventTarget');

    describe('EventTarget', function() {
        it('on and fire', function () {
            var obj = new Events();
            obj.counter = 0;
            obj.on('event', function() {
                obj.counter += 1;
            });
            obj.fire('event');
            expect(obj.counter).toBe(1);

            obj.fire('event');
            obj.fire('event');
            obj.fire('event');
            obj.fire('event');
            expect(obj.counter).toBe(5);
        });

        it('first on, then off all functions', function (){
            var obj = new Events();
            obj.counter = 0;

            function callback() {
                obj.counter += 1;
            }

            obj.on('event', callback);
            obj.fire('event');
            obj.off('event');
            obj.fire('event');
            expect(obj.counter).toBe(1);
        });
    });
});