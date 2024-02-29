const supportedFunctions = {
    uppercase: (params) => {
        return params.map(param => param.toUpperCase()).join('');
    },
    lowercase: (params) => {
        return params.map(param => param.toLowerCase()).join('');
    },
    concatenate: (params) => {
        return params.join('');
    },
    round: (params) => {
        if (params.length > 0) {
            const out = (Number.EPSILON + Number(params[0] || '')).toFixed(Number(params[1]) || 0);
            if (paramAsBooleanIsSet(params[2])) {
                return out;
            }
            return stripLastZeroesAfterDot(out);
        }
        return (Number.NaN).toString();
    },
    ceil: (params) => {
        if (params.length > 0) {
            const mult = Math.pow(10, Number(params[1]) || 0);
            const out = (Math.ceil(Number(params[0]) * mult) / mult).toFixed(Number(params[1]) || 0);
            if (paramAsBooleanIsSet(params[2])) {
                return out;
            }
            return stripLastZeroesAfterDot(out);
        }
        return (Number.NaN).toString();
    },
    floor: (params) => {
        if (params.length > 0) {
            const mult = Math.pow(10, Number(params[1]) || 0);
            const out = (Math.floor(Number(params[0]) * mult) / mult).toFixed(Number(params[1]) || 0);
            if (paramAsBooleanIsSet(params[2])) {
                return out;
            }
            return stripLastZeroesAfterDot(out);
        }
        return (Number.NaN).toString();
    },
    add: (params) => {
        return params.reduce((out, param) => {
            if (!isNaN(Number(out)) && !isNaN(Number(param))) {
                return toNumberString(Number(out) + Number(param));
            }
            else {
                return (Number.NaN).toString();
            }
        }, '0');
    },
    multiply: (params) => {
        return params.reduce((out, param) => {
            if (!isNaN(Number(out)) && !isNaN(Number(param))) {
                return toNumberString(Number(out) * Number(param));
            }
            else {
                return (Number.NaN).toString();
            }
        }, '1');
    },
    subtract: (params) => {
        params = [...params];
        const first = params.shift();
        const rest = supportedFunctions.add(params);
        if (!isNaN(Number(first)) && !isNaN(Number(rest))) {
            return toNumberString(Number(first) - Number(rest));
        }
        return (Number.NaN).toString();
    },
    divide: (params) => {
        params = [...params];
        const first = params.shift();
        const rest = supportedFunctions.multiply(params);
        if (!isNaN(Number(first)) && !isNaN(Number(rest)) && Number(rest)) {
            return toNumberString(Number(first) / Number(rest));
        }
        return (Number.NaN).toString();
    },
    pow: (params) => {
        if (!isNaN(Number(params[0] || '0')) && !isNaN(Number(params[1] || '0'))) {
            return toNumberString(Math.pow(Number(params[0] || '0'), Number(params[1] || '0')));
        }
        return (Number.NaN).toString();
    },
    max: (params) => {
        if (!params.length) {
            return (Number.NaN).toString();
        }
        return params.reduce((out, param) => {
            if (!isNaN(Number(out)) && !isNaN(Number(param))) {
                return Math.max(Number(out), Number(param)).toString();
            }
            else {
                return (Number.NaN).toString();
            }
        }, params[0]);
    },
    min: (params) => {
        if (!params.length) {
            return (Number.NaN).toString();
        }
        return params.reduce((out, param) => {
            if (!isNaN(Number(out)) && !isNaN(Number(param))) {
                return Math.min(Number(out), Number(param)).toString();
            }
            else {
                return (Number.NaN).toString();
            }
        }, params[0]);
    },
    lt: (params) => {
        return compare(params, '<');
    },
    lte: (params) => {
        return compare(params, '<=');
    },
    eq: (params) => {
        return compare(params, '=');
    },
    gte: (params) => {
        return compare(params, '>=');
    },
    gt: (params) => {
        return compare(params, '>');
    },
    if: (params) => {
        if (params.length < 2) {
            return '';
        }
        if (['', '0'].includes(params[0])) {
            return params[2] || '';
        }
        return params[1];
    }
};
const supportedOperators = {
    '&': supportedFunctions.concatenate,
    '+': supportedFunctions.add,
    '-': supportedFunctions.subtract,
    '/': supportedFunctions.divide,
    '*': supportedFunctions.multiply,
    '^': supportedFunctions.pow,
    '<': supportedFunctions.lt,
    '<=': supportedFunctions.lte,
    '=': supportedFunctions.eq,
    '>=': supportedFunctions.gte,
    '>': supportedFunctions.gt
};
export function executeOperator(operator, parameters) {
    if (operator in supportedOperators) {
        return supportedOperators[operator](parameters);
    }
    return '';
}
export function executeFunction(name, parameters) {
    name = name.toLowerCase();
    if (name in supportedFunctions) {
        return supportedFunctions[name](parameters);
    }
    return '';
}
export function functionIsSupported(name) {
    name = name.toLowerCase();
    return (name in supportedFunctions);
}
export function toNumberString(n) {
    return Number(n.toFixed(10)).toString();
}
function paramAsBooleanIsSet(param) {
    param = (param || '').toLowerCase();
    return param && param !== '0' && param !== 'false' && param !== 'no';
}
function stripLastZeroesAfterDot(param) {
    if (param.match(/\./)) {
        return param.replace(/0+$/, '').replace(/\.$/, '');
    }
    return param;
}
function compare(params, operator) {
    if (params.length < 2) {
        return '0';
    }
    const p0 = isNaN(Number(params[0])) ? params[0] : Number(params[0]);
    const p1 = isNaN(Number(params[1])) ? params[1] : Number(params[1]);
    if (operator.includes('=') && p0 === p1) {
        return '1';
    }
    if (operator.includes('<') && p0 < p1) {
        return '1';
    }
    if (operator.includes('>') && p0 > p1) {
        return '1';
    }
    return '0';
}
