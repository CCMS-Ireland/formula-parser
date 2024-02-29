import { TokenType } from './types';
// https://en.wikipedia.org/wiki/Operator-precedence_parser fortran approach
export function applyOperatorPrecedence(tokens) {
    const newTokens = [];
    const operatorGroups = ['^', '*/', '+-', '<=>='].filter(entry => tokens.some(token => token.type === TokenType.Operator && entry.includes(token.value)));
    const commaExists = tokens.some(token => token.type === TokenType.Comma);
    const maxBracketsCount = operatorGroups.length + (commaExists ? 1 : 0);
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token.type === TokenType.Operator) {
            const bracketCount = operatorGroups.findIndex(entry => entry.includes(token.value));
            aroundWithBrackets(newTokens, token, bracketCount);
        }
        else if (token.type === TokenType.Comma) {
            aroundWithBrackets(newTokens, token, operatorGroups.length);
        }
        else if (token.type === TokenType.BracketStart || token.type === TokenType.BracketEnd) {
            addBrackets(newTokens, maxBracketsCount, token.type);
        }
        else {
            newTokens.push(token);
        }
    }
    addBrackets(newTokens, maxBracketsCount, TokenType.BracketStart, true);
    addBrackets(newTokens, maxBracketsCount, TokenType.BracketEnd);
    return newTokens;
}
// Fix the formula like "-sin(1)" - add 0 at the begining
export function fixOperatorsAtTheBegining(tokens) {
    const newTokens = [];
    let prevToken = null;
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token.type === TokenType.Operator && '+-'.includes(token.value)) {
            if (!prevToken || [TokenType.BracketStart, TokenType.Comma, TokenType.Operator].includes(prevToken.type)) {
                newTokens.push({
                    type: TokenType.Number,
                    value: '0'
                });
            }
        }
        newTokens.push(token);
        if (token.type !== TokenType.Whitespace) {
            prevToken = token;
        }
    }
    return newTokens;
}
function addBrackets(tokens, count, type, toStart = false) {
    for (let i = 0; i < count; i++) {
        tokens[toStart ? 'unshift' : 'push']({ value: type === TokenType.BracketEnd ? ')' : '(', type });
    }
}
function aroundWithBrackets(tokens, token, count) {
    addBrackets(tokens, count, TokenType.BracketEnd);
    tokens.push(token);
    addBrackets(tokens, count, TokenType.BracketStart);
}
