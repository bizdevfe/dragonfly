({
    baseUrl: '../src',
    name: 'loader/almond',
    include: [
        'main',
        'Button'
    ],
    out: '../output/dragonfly.js',
    wrap: {
        startFile: '../src/loader/start.frag',
        endFile: '../src/loader/end.frag'
    }
})