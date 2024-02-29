import { type Token, type ValidationError } from './types';
export declare function getValidationErrors(tokens: Token[], supportedRefs?: string[]): ValidationError[];
export declare function getTokenDependenciesDeep(tokensByReferences: Record<string, Token[]>): Record<string, string[]>;
export declare function getCircularValidationErrors(referenceName: string, tokensByReferences: Record<string, Token[]>): ValidationError[];
