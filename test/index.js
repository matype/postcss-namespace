var fs = require('fs')
var test = require('tape')
var postcss = require('postcss')
var namespace = require('..')

function input (name) {
    return fs.readFileSync('test/fixtures/' + name + '.css', 'utf-8').trim()
}

function output (name) {
    return fs.readFileSync('test/fixtures/' + name + '.out.css', 'utf-8').trim()
}

function process (name) {
    return postcss().use(namespace()).process(input(name)).css.trim()
}

function assert (t, name) {
    return t.equal(process(name), output(name))
}

test('prefix', function (t) {
    assert(t, 'prefix')
    t.end()
})

test('suffix', function (t) {
    assert(t, 'suffix')
    t.end()
})
