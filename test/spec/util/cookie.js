define(function(require) {
  var cookie = require('util/cookie');

  describe('cookie', function () {
    describe('get', function() {
      //chrome处于安全性考虑不能设置本地cookie，导致document.cookie='这样的语法都失效
      //请用firefox等其他浏览器测试
      document.cookie = '_dragon_test_1=fly';
      document.cookie = '_dragon_test_2';
      document.cookie = '_dragon_test_3=';
      document.cookie = '_dragon_test_4[t]=xxx';

      // cookie.set('_dragon_test_1', 'fly')
      // cookie.set('_dragon_test_2', '')
      // cookie.set('_dragon_test_3', '')
      // cookie.set('_dragon_test_4[t]', 'xxx')


      it('should return the cookie value for the given name.', function() {
        expect(cookie.get('_dragon_test_1')).toBe('fly');
        expect(cookie.get('_dragon_test_2')).toBe('');
        expect(cookie.get('_dragon_test_3')).toBe('');
        expect(cookie.get('_dragon_test_4[t]')).toBe('xxx');
      });

      it('should return undefined for non-existing name.', function() {
        expect(cookie.get('_dragon_test_none')).toBeUndefined();
      });

      it('should throw error for invalid name.', function() {
        expect(function() { cookie.get(true); }).toThrow();
        expect(function() { cookie.get({}); }).toThrow();
        expect(function() { cookie.get(null); }).toThrow();
      });
    });

    describe('set', function() {
      it('should set a cookie with a given name and value.', function() {

        cookie.set('_dragon_test_11', 'xxx');
        expect(cookie.get('_dragon_test_11')).toBe('xxx');

        cookie.set('_dragon_test_12', 'xxx', {expires: -1});
        expect(cookie.get('_dragon_test_12')).toBeUndefined();

        cookie.set('_dragon_test_13', '2', {
          expires: new Date(2099, 1, 1),
          path: '/'
        });
        expect(cookie.get('_dragon_test_13')).toBe('2');
      });
    });

    describe('remove', function() {
      it('should remove a cookie from the machine', function() {
        cookie.set('_dragon_test_21', 'xxx');
        cookie.remove('_dragon_test_21');
        expect(cookie.get('_dragon_test_21')).toBeUndefined();

        cookie.set('_dragon_test_22', 'xxx', {
          expires: new Date(2099, 1, 1),
          path: '/'
        });
        cookie.remove('_dragon_test_22', {
          path: '/'
        });
        expect(cookie.get('_dragon_test_22')).toBeUndefined();
      });
    });
  });
});