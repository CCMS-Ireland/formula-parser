import { getNextToken } from './tokenizer'
import { type Token, TokenType } from './types'

export function getTokens (formula: string) {
  return processTokenStream(formula)
}

function processTokenStream (formula: string) {
  const tokens: Token[] = []
  let position = 0
  const skip = (amount = 1) => {
    position += amount
  }
  const match = (pattern: RegExp, move: boolean) => {
    const match = formula.substring(position).match(pattern)
    if (!match) {
      return null
    }
    if (move) {
      position += match[0].length
    }
    return match[0] || null
  }

  let prev: TokenType | null = null
  while (position < formula.length) {
    const startingPosition = position
    let tokenType = getNextToken({ match, skip, prev })
    if (startingPosition === position) {
      throw new Error('Tokenizer did not move forward')
    }
    if (tokenType === TokenType.EmptyStringAndDoubleQuoteEnd) {
      tokens.push({
        type: TokenType.String,
        value: ''
      })
      tokenType = TokenType.DoubleQuoteEnd
    } else if (tokenType === TokenType.EmptyStringAndQuoteEnd) {
      tokens.push({
        type: TokenType.String,
        value: ''
      })
      tokenType = TokenType.QuoteEnd
    }
    tokens.push({
      type: tokenType,
      value: formula.substring(startingPosition, position)
    })
    if (tokenType !== TokenType.Whitespace) {
      prev = tokenType
    }
  }

  return tokens
}
