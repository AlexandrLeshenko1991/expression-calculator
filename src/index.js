function eval() {
    // Do not use eval!!!
    return;
}


function expressionCalculator(expr) {
    let left = 0;
    let right = 0;

    let exArr = expr.split('')
        .filter(item => !!item && item !== ' ')
        .map(i => {
            if (i === '(') {
                return `( `
            }
            if (i === ')') {
                return ` )`
            }
            if (i === "*" || i === "/" || i === "+" || i === "-") return ` ${i} `
            return i
        }).join('').split(' ')


    exArr.forEach((item) => {
        if (item === '(') {
            left++
        }
        if (item === ')') {
            right++
        }
    })

    if ((left - right) !== 0) {
        throw new Error('ExpressionError: Brackets must be paired')
    }


    let count = 0
    exArr.forEach((item, index) => {
        if (item === '(') count++
    })


    for (let i = 0; i < count; i++) {
        if (exArr.indexOf('(') >= 0) {
            let start = exArr.indexOf('(')
            let next = exArr.indexOf('(', start + 1)
            let end = exArr.indexOf(')')
            for (let a = i; a < count; a++) {

                if (next > end || next < 0) {
                    let arr = exArr.slice(start + 1, end)
                    let positionStart = !start ? 0 : start
                    exArr.splice(positionStart, arr.length + 2, result(arr))

                    break
                } else {
                    start = exArr.indexOf('(', next)
                    next = exArr.indexOf('(', next + 1)
                }
            }
        }
    }
    return result(exArr)
}

function result(arr) {
    if (arr.includes('*') || arr.includes('/')) {
        let count = arr.length

        for (let i = 0; i < count; i++) {
            if (arr[i] === '/') {
                let index = arr.indexOf('/')
                if (index >= 0) {
                    if (arr[index + 1] === '0') {
                        throw new Error('TypeError: Division by zero.');
                    }
                    let a = arr[index - 1]
                    let b = arr[index + 1]
                    arr[index] = delenie(a, b)
                    arr.splice(index + 1, 1)
                    arr.splice(index - 1, 1)
                    i--
                }
            }
            if (arr[i] === '*') {
                let index = arr.indexOf('*')
                if (index >= 0) {
                    let a = arr[index - 1]
                    let b = arr[index + 1]
                    arr[index] = umn(a, b)
                    arr.splice(index + 1, 1)
                    arr.splice(index - 1, 1)
                    i--
                }
            }
        }
    }

    let res = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '+') {
            let b = arr[i + 1]
            res = plus(res, b)
            i++
        }
        if (arr[i] === '-') {
            let b = arr[i + 1]
            res = minus(res, b)
            i++
        }

    }

    return res
}

function umn(a, b) {
    a = +a
    b = +b
    return a * b
}

function delenie(a, b) {
    a = +a
    b = +b
    let res = a / b
    return res
}

function minus(a, b) {
    a = +a
    b = +b
    return a - b
}

function plus(a, b) {
    a = +a
    b = +b
    return a + b
}


module.exports = {
    expressionCalculator
}