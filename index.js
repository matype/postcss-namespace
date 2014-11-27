var cssSelectorParser = require('css-selector-parser').CssSelectorParser;
var selectorParser = new cssSelectorParser();

module.exports = function plugin (options) {
    options = options || {}

    var preConnection = options.prefix || "-"
    var sufConnection = options.suffix || "-"

    return function (css) {
        var newRules = []

        css.eachAtRule(function (atRule, i) {
            if (atRule.name === 'prefix') {
                atRule.eachRule(function (rule) {
                    if (isClassSelector(rule.selector)) {
                        rule.selector = "." + atRule.params + preConnection + selectorParser.parse(rule.selector).rule.classNames[0]
                    }
                    if (isIdSelector(rule.selector)) {
                        rule.selector = "#" + atRule.params + sufConnection + selectorParser.parse(rule.selector).rule.id
                    }
                    rule.eachDecl(function (decl) {
                        decl.before = rule.before
                        decl.after = rule.after
                    })
                    newRules.push(rule)
                })

            }

            if (atRule.name === 'suffix') {
                atRule.eachRule(function (rule) {
                    if (isClassSelector(rule.selector)) {
                        rule.selector = "." + selectorParser.parse(rule.selector).rule.classNames[0] + preConnection + atRule.params;
                    }
                    if (isIdSelector(rule.selector)) {
                        rule.selector = "#" + selectorParser.parse(rule.selector).rule.id + sufConnection + atRule.params;
                    }
                    rule.eachDecl(function (decl) {
                        decl.before = "\n  "
                        decl.after = "\n  "
                    })
                    rule.after = "\n  "
                    newRules.push(rule)
                })

            }
            atRule.removeSelf()
        })
        css.append(newRules)
    }
}

function isClassSelector (selector) {
    if (selectorParser.parse(selector).rule.classNames) return true
}

function isIdSelector (selector) {
    if (selectorParser.parse(selector).rule.id) return true
}
