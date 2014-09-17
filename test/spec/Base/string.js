define(function(require) {
    var string = require('base/string');

    describe('string', function() {
        describe('trim(str)', function (){
            it('should trim leading or trailing whitespace', function () {
                expect(string.trim('  foo bar  ')).toBe('foo bar');
                expect(string.trim('\n\n\nfoo bar\n\r\n\n')).toBe('foo bar');
            });
        });

        describe('trimLeft(str)', function () {
            it('should trim leading whitespace', function() {
                expect(string.trimLeft('  foo bar  ')).toBe('foo bar  ');
            });
        });

        describe('trimRight(str)', function () {
            it('should trim trailing whitespace', function() {
                expect(string.trimRight('  foo bar  ')).toBe('  foo bar');
            });

        });
    });
});