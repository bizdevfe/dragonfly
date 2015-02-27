({
    baseUrl: '../src',
    paths: {
        'underscore': 'dep/underscore',
        'dollardom': 'dep/dollardom'
    },
    name: 'loader/almond',
    include: [
        'main'
    ],
    out: '../output/dragonfly.js',
    wrap: {
        startFile: '../src/loader/start.frag',
        endFile: '../src/loader/end.frag'
    },
    optimize: "none"
})