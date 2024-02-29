import { type Token, type TokenNode } from './types';
export declare function getTokenNodes(formula: string, skipOperatorPrecedence?: boolean): TokenNode[];
export declare function buildTokenNodeTree(tokens: Token[], level?: number): TokenNode[];
