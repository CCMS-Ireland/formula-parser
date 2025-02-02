export declare enum TokenType {
    Number = "Number",
    String = "String",
    Whitespace = "Whitespace",
    Operator = "Operator",
    BracketStart = "BracketStart",
    BracketEnd = "BracketEnd",
    ReferenceBracketStart = "ReferenceBracketStart",
    ReferenceBracketEnd = "ReferenceBracketEnd",
    ReferenceName = "ReferenceName",
    FunctionName = "FunctionName",
    Comma = "Comma",
    QuoteStart = "QuoteStart",
    QuoteEnd = "QuoteEnd",
    EmptyStringAndQuoteEnd = "EmptyStringAndQuoteEnd",
    DoubleQuoteStart = "DoubleQuoteStart",
    DoubleQuoteEnd = "DoubleQuoteEnd",
    EmptyStringAndDoubleQuoteEnd = "EmptyStringAndDoubleQuoteEnd",
    Group = "Group",
    Error = "Error"
}
export declare const operatorAllowedAfter: TokenType[];
export type Token = {
    type: TokenType;
    value: string;
};
export type TokenNode = Token & {
    innerNodes: TokenNode[];
};
export interface LexerStream {
    match: (pattern: RegExp, consume: boolean) => string | undefined;
    skip: () => void;
    prev: TokenType | null;
}
export declare enum ErrorType {
    UnexpectedOperator = "UnexpectedOperator",
    ValueRequiredAfterOperator = "ValueRequiredAfterOperator",
    OperatorRequiredBeforeNumber = "OperatorRequiredBeforeNumber",
    OperatorRequiredBeforeFunction = "OperatorRequiredBeforeFunction",
    OperatorRequiredBeforeQuote = "OperatorRequiredBeforeQuote",
    OperatorRequiredBeforeBracket = "OperatorRequiredBeforeBracket",
    OperatorRequiredBeforeReference = "OperatorRequiredBeforeReference",
    InvalidFunction = "InvalidFunction",
    InvalidCharacter = "InvalidCharacter",
    UnexpectedComma = "UnexpectedComma",
    UnexpectedBracket = "UnexpectedBracket",
    UnexpectedReferenceBracket = "UnexpectedReferenceBracket",
    ReferenceNameRequiredInBrackets = "ReferenceNameRequiredInBrackets",
    UnsupportedReferenceName = "UnsupportedReferenceName",
    UnclosedQuote = "UnclosedQuote",
    UnclosedDoubleQuote = "UnclosedDoubleQuote",
    UnclosedBracket = "UnclosedBracket",
    UnclosedReferenceBracket = "UnclosedReferenceBracket",
    CircularReference = "CircularReference",
    CircularReferenceToItself = "CircularReferenceToItself",
    DependsOnInvalid = "DependsOnInvalid",
    DependsOnCircular = "DependsOnCircular"
}
export type ValidationError = {
    token?: Token;
    tokenIndex?: number;
    errorType: ErrorType;
    message?: string;
};
export type ExtendedFormulaEntry = {
    referenceName: string;
    referenceNameOrig: string;
    formula: string;
    tokens: Token[];
    tokenNodes: TokenNode[];
    validationErrors: ValidationError[];
    order: number;
    dependencies: string[];
};
