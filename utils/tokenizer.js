import { TokenType } from './types';
export function getNextToken({ match, skip, prev }) {
    if (prev !== TokenType.QuoteStart && match(/^"/, true)) {
        if (prev === TokenType.String) {
            return TokenType.DoubleQuoteEnd;
        }
        else if (prev === TokenType.DoubleQuoteStart) {
            return TokenType.EmptyStringAndDoubleQuoteEnd;
        }
        else {
            return TokenType.DoubleQuoteStart;
        }
    }
    if (match(/^'/, true)) {
        if (prev === TokenType.String) {
            return TokenType.QuoteEnd;
        }
        else if (prev === TokenType.QuoteStart) {
            return TokenType.EmptyStringAndQuoteEnd;
        }
        else {
            return TokenType.QuoteStart;
        }
    }
    if (prev === TokenType.DoubleQuoteStart) {
        if (match(/^([^"\\]|\\.)+(?=")/, false)) {
            match(/^([^"\\]|\\.)+(?=")/, true);
            return TokenType.String;
        }
        else {
            match(/^([^"\\]|\\.)+/, true);
            return TokenType.String;
        }
    }
    if (prev === TokenType.QuoteStart) {
        if (match(/^([^'\\]|\\.)+(?=')/, false)) {
            match(/^([^'\\]|\\.)+(?=')/, true);
            return TokenType.String;
        }
        else {
            match(/^([^'\\]|\\.)+/, true);
            return TokenType.String;
        }
    }
    const numberRegex = /^\d*\.?\d+/;
    if (match(numberRegex, true)) {
        return TokenType.Number;
    }
    if (prev === TokenType.ReferenceBracketStart) {
        if (match(/^[^{}]+(?=\})/, false)) {
            match(/^[^{}]+(?=\})/, true);
            return TokenType.ReferenceName;
        }
        else if (match(/^[^{}]+/, false)) {
            match(/^[^{}]+/, true);
            return TokenType.ReferenceName;
        }
    }
    const rest = [
        [/^(<=|==|>=)/, TokenType.Operator],
        [/^[+\-*/^<=>&]/, TokenType.Operator],
        [/^[a-zA-Z][a-zA-Z0-9]*(?=\s*\()/, TokenType.FunctionName],
        [/^\(/, TokenType.BracketStart],
        [/^\)/, TokenType.BracketEnd],
        [/^{/, TokenType.ReferenceBracketStart],
        [/^}/, TokenType.ReferenceBracketEnd],
        [/^,/, TokenType.Comma],
        [/^\s+/, TokenType.Whitespace]
    ];
    for (const [pattern, type] of rest) {
        if (match(pattern, true)) {
            return type;
        }
    }
    skip();
    return TokenType.Error;
}
