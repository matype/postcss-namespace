# postcss-namespace [![Build Status](https://travis-ci.org/morishitter/postcss-namespace.svg)](https://travis-ci.org/morishitter/postcss-namespace)

PostCSS plugin for the scope of name binding.

## Installation

```shell
$ npm install postcss-namespace
```

## Example

```javascript
// dependencies
var fs = require("fs")
var postcss = require("postcss")
var calc = require("postcss-calc")

// css to be processed
var css = fs.readFileSync("input.css", "utf8")

// process css
var output = postcss()
  .use(namespace())
  .process(css)
  .css
```

Using this `input.css`:

```css
@prefix pre {
  .class {
    font-size: 12px;
  }
  #id {
    padding: 10px;
  }
}

@suffix suf {
  .class {
    font-size: 12px;
  }
  #id {
    padding: 10px;
  }
}
```

Yields:

```css
.pre-class {
  font-size: 12px;
}
#pre-id {
  padding: 10px;
}

.class-suf {
  font-size: 12px;
}
#id-suf {
  padding: 10px;
}
```



## License

The MIT License (MIT)

Copyright (c) 2014 Masaaki Morishita
