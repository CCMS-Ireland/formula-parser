export var TokenType;
(function (TokenType) {
    TokenType["Number"] = "Number";
    TokenType["String"] = "String";
    TokenType["Whitespace"] = "Whitespace";
    TokenType["Operator"] = "Operator";
    TokenType["BracketStart"] = "BracketStart";
    TokenType["BracketEnd"] = "BracketEnd";
    TokenType["ReferenceBracketStart"] = "ReferenceBracketStart";
    TokenType["ReferenceBracketEnd"] = "ReferenceBracketEnd";
    TokenType["ReferenceName"] = "ReferenceName";
    TokenType["FunctionName"] = "FunctionName";
    TokenType["Comma"] = "Comma";
    TokenType["QuoteStart"] = "QuoteStart";
    TokenType["QuoteEnd"] = "QuoteEnd";
    TokenType["EmptyStringAndQuoteEnd"] = "EmptyStringAndQuoteEnd";
    TokenType["DoubleQuoteStart"] = "DoubleQuoteStart";
    TokenType["DoubleQuoteEnd"] = "DoubleQuoteEnd";
    TokenType["EmptyStringAndDoubleQuoteEnd"] = "EmptyStringAndDoubleQuoteEnd";
    TokenType["Group"] = "Group";
    TokenType["Error"] = "Error";
})(TokenType || (TokenType = {}));
export const operatorAllowedAfter = [
    TokenType.Number,
    TokenType.BracketEnd,
    TokenType.ReferenceBracketEnd,
    TokenType.QuoteEnd,
    TokenType.DoubleQuoteEnd
];
export var ErrorType;
(function (ErrorType) {
    ErrorType["UnexpectedOperator"] = "UnexpectedOperator";
    ErrorType["ValueRequiredAfterOperator"] = "ValueRequiredAfterOperator";
    ErrorType["OperatorRequiredBeforeNumber"] = "OperatorRequiredBeforeNumber";
    ErrorType["OperatorRequiredBeforeFunction"] = "OperatorRequiredBeforeFunction";
    ErrorType["OperatorRequiredBeforeQuote"] = "OperatorRequiredBeforeQuote";
    ErrorType["OperatorRequiredBeforeBracket"] = "OperatorRequiredBeforeBracket";
    ErrorType["OperatorRequiredBeforeReference"] = "OperatorRequiredBeforeReference";
    ErrorType["InvalidFunction"] = "InvalidFunction";
    ErrorType["InvalidCharacter"] = "InvalidCharacter";
    ErrorType["UnexpectedComma"] = "UnexpectedComma";
    ErrorType["UnexpectedBracket"] = "UnexpectedBracket";
    ErrorType["UnexpectedReferenceBracket"] = "UnexpectedReferenceBracket";
    ErrorType["ReferenceNameRequiredInBrackets"] = "ReferenceNameRequiredInBrackets";
    ErrorType["UnsupportedReferenceName"] = "UnsupportedReferenceName";
    ErrorType["UnclosedQuote"] = "UnclosedQuote";
    ErrorType["UnclosedDoubleQuote"] = "UnclosedDoubleQuote";
    ErrorType["UnclosedBracket"] = "UnclosedBracket";
    ErrorType["UnclosedReferenceBracket"] = "UnclosedReferenceBracket";
    ErrorType["CircularReference"] = "CircularReference";
    ErrorType["CircularReferenceToItself"] = "CircularReferenceToItself";
    ErrorType["DependsOnInvalid"] = "DependsOnInvalid";
    ErrorType["DependsOnCircular"] = "DependsOnCircular";
})(ErrorType || (ErrorType = {}));
