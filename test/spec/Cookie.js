define(function(require) {
  var Cookie = require('util/cookie');

  describe('Cookie', function () {
    describe('get', function() {
      //chrome处于安全性考虑不能设置本地cookie，导致document.cookie='这样的语法都失效
      //请用firefox等其他浏览器测试
      document.cookie = '_dragon_test_1=fly';
      document.cookie = '_dragon_test_2';
      document.cookie = '_dragon_test_3=';
      document.cookie = '_dragon_test_4[t]=xxx';

      // Cookie.set('_dragon_test_1', 'fly')
      // Cookie.set('_dragon_test_2', '')
      // Cookie.set('_dragon_test_3', '')
      // Cookie.set('_dragon_test_4[t]', 'xxx')


      it('should return the cookie value for the given name.', function() {
        expect(Cookie.get('_dragon_test_1')).toBe('fly');
        expect(Cookie.get('_dragon_test_2')).toBe('');
        expect(Cookie.get('_dragon_test_3')).toBe('');
        expect(Cookie.get('_dragon_test_4[t]')).toBe('xxx');
      });

      it('should return undefined for non-existing name.', function() {
        expect(Cookie.get('_dragon_test_none')).toBeUndefined();
      });

      it('should throw error for invalid name.', function() {
        expect(function() { Cookie.get(true); }).toThrow();
        expect(function() { Cookie.get({}); }).toThrow();
        expect(function() { Cookie.get(null); }).toThrow();
      });
    });

    describe('set', function() {
      it('should set a cookie with a given name and value.', function() {

        Cookie.set('_dragon_test_11', 'xxx');
        expect(Cookie.get('_dragon_test_11')).toBe('xxx');

        Cookie.set('_dragon_test_12', 'xxx', {expires: -1});
        expect(Cookie.get('_dragon_test_12')).toBeUndefined();

        Cookie.set('_dragon_test_13', '2', {
          expires: new Date(2099, 1, 1),
          path: '/'
        });
        expect(Cookie.get('_dragon_test_13')).toBe('2');
      });
    });

    describe('remove', function() {
      it('should remove a cookie from the machine', function() {
        Cookie.set('_dragon_test_21', 'xxx');
        Cookie.remove('_dragon_test_21');
        expect(Cookie.get('_dragon_test_21')).toBeUndefined();

        Cookie.set('_dragon_test_22', 'xxx', {
          expires: new Date(2099, 1, 1),
          path: '/'
        });
        Cookie.remove('_dragon_test_22', {
          path: '/'
        });
        expect(Cookie.get('_dragon_test_22')).toBeUndefined();
      });
    });
  })
});