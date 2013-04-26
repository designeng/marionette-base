define(['app'], function(App) {

  describe('App object', function () {

    describe('obj', function () {
      it('should equial 123', function () {
        var app = new App();

        console.log("app.test return: " + app.test);

        expect(app.test).toEqual("123");
      });
    });

  });
});