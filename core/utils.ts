/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { SVG_NS } from "./constants";

/**
 * @fileoverview Utility methods.
 * These methods are not specific to Blockly, and could be factored out into
 * a JavaScript framework such as Closure.
 * @author fraser@google.com (Neil Fraser)
 */

/**
 * @name Blockly.utils
 * @namespace
 **/


// FIXME move these functions into corresponding scripts in the utils directory


/**
 * Static regex to pull the x,y values out of an SVG translate() directive.
 * Note that Firefox and IE (9,10) return 'translate(12)' instead of
 * 'translate(12, 0)'.
 * Note that IE (9,10) returns 'translate(16 8)' instead of 'translate(16, 8)'.
 * Note that IE has been reported to return scientific notation (0.123456e-42).
 * @type {!RegExp}
 * @private
 */
const XY_REGEX =
 /translate\(\s*([-+\d.e]+)([ ,]\s*([-+\d.e]+)\s*)?/;


/**
 * Static regex to pull the scale values out of a transform style property.
 * Accounts for same exceptions as XY_REGEXP_.
 * @type {!RegExp}
 * @private
 */
const SCALE_REGEXP_ = /scale\(\s*([-+\d.e]+)\s*\)/;

/**
 * Static regex to pull the x,y values out of a translate3d() or translate3d()
 * style property.
 * Accounts for same exceptions as XY_REGEXP_.
 * @type {!RegExp}
 * @private
 */
const XY_STYLE_REGEX =
 /transform:\s*translate(?:3d)?\(\s*([-+\d.e]+)\s*px([ ,]\s*([-+\d.e]+)\s*px)?/;


/**
 * The permissible values of InputElement.type.
 */
const INPUT_TYPE_VALUES = new Set(['textarea', 'text', 'number', 'email', 'password', 'search', 'tel', 'url']);

/**
 * To allow ADVANCED_OPTIMIZATIONS, combining variable.name and variable['name']
 * is not possible. To access the exported Blockly.Msg.Something it needs to be
 * accessed through the exact name that was exported. Note, that all the exports
 * are happening as the last thing in the generated js files, so they won't be
 * accessible before JavaScript loads!
 * @return {!Object.<string, string>} The message array.
 * @private
 */
export function getMessageArray_() {
  return goog.global['Blockly']['Msg'];
}

/**
 * Remove an attribute from a element.
 * @param {!Element} element DOM element to remove attribute from.
 * @param {string} attributeName Name of attribute to remove.
 * @deprecated
 */
export function removeAttribute(element: Element, attributeName: string): void {
  console.log('Deprecated function removeAttribute called');
  element.removeAttribute(attributeName);
}

/**
 * Add a CSS class to a element.
 * Similar to Closure's goog.dom.classes.add, except it handles SVG elements.
 * @param {!Element} element DOM element to add class to.
 * @param {string} className Name of class to add.
 * @return {boolean} True if class was added, false if already present.
 */
export function addClass(element: Element, className: string): boolean
{
  if (element.classList.contains(className)) return false;
  element.classList.add(className);
  return true;
}

/**
 * Remove a CSS class from a element.
 * Similar to Closure's goog.dom.classes.remove, except it handles SVG elements.
 * @param {!Element} element DOM element to remove class from.
 * @param {string} className Name of class to remove.
 * @return {boolean} True if class was removed, false if never present.
 */
export function removeClass(element: Element, className: string): boolean
{
  if (!element.classList.contains(className)) return false;

  element.classList.remove(className);
  if (element.classList.length === 0) element.removeAttribute('class');
  return true;
}

/**
 * Checks if an element has the specified CSS class.
 * Similar to Closure's goog.dom.classes.has, except it handles SVG elements.
 * @param {!Element} element DOM element to check.
 * @param {string} className Name of class to check.
 * @return {boolean} True if class exists, false otherwise.
 * @package
 */
export function hasClass(element: Element, className: string): boolean {
  return element.classList.contains(className);
}

/**
 * Don't do anything for this event, just halt propagation.
 * @param {!Event} e An event.
 */
export function noEvent(e: Event): void {
  // This event has been handled.  No need to bubble up to the document.
  e.preventDefault();
  e.stopPropagation();
}


/**
 * Is this event targeting a text input widget?
 * @param {!Event} e An event.
 * @return {boolean} True if text input.
 */
export function isTargetInput(e: Event): e is Event & { target: HTMLInputElement } {
  const { target } = e as Event & { target: { type?: string } };

  if (e['isContentEditable']) return true;
  if (target.type && INPUT_TYPE_VALUES.has(target.type)) return true;
  return false;
}


/**
 * Return the coordinates of the top-left corner of this element relative to
 * its parent.  Only for SVG elements and children (e.g. rect, g, path).
 * @param {!Element} element SVG element to find the coordinates of.
 * @return {!goog.math.Coordinate} Object with .x and .y properties.
 */
export function getRelativeXY(element: SVGElement) {
  const xy = new goog.math.Coordinate(0, 0);
  // First, check for x and y attributes.
  const x = element.getAttribute('x');
  if (x) {
    xy.x = parseInt(x, 10);
  }
  const y = element.getAttribute('y');
  if (y) {
    xy.y = parseInt(y, 10);
  }
  // Second, check for transform="translate(...)" attribute.
  const transform = element.getAttribute('transform');
  const r = transform && transform.match(XY_REGEX);
  if (r) {
    xy.x += parseFloat(r[1]);
    if (r[3]) {
      xy.y += parseFloat(r[3]);
    }
  }

  // Then check for style = transform: translate(...) or translate3d(...)
  const style = element.getAttribute('style');
  if (style && style.indexOf('translate') > -1) {
    const styleComponents = style.match(XY_STYLE_REGEX);
    if (styleComponents) {
      xy.x += parseFloat(styleComponents[1]);
      if (styleComponents[3]) {
        xy.y += parseFloat(styleComponents[3]);
      }
    }
  }
  return xy;
}

/**
 * Return the coordinates of the top-left corner of this element relative to
 * the div blockly was injected into.
 * @param {!Element} element SVG element to find the coordinates of. If this is
 *     not a child of the div blockly was injected into, the behaviour is
 *     undefined.
 * @return {!goog.math.Coordinate} Object with .x and .y properties.
 */
export function getInjectionDivXY_(element: SVGElement) {
  let x = 0;
  let y = 0;
  while (element) {
    const xy = getRelativeXY(element);
    const scale = getScale_(element);
    x = (x * scale) + xy.x;
    y = (y * scale) + xy.y;
    if (hasClass(element, 'injectionDiv')) break;
    element = element.parentNode as SVGElement;
  }
  return new goog.math.Coordinate(x, y);
}

/**
 * Return the scale of this element.
 * @param {!Element} element  The element to find the coordinates of.
 * @return {!number} number represending the scale applied to the element.
 * @private
 */
export function getScale_(element: Element): number {
  let scale = 1;
  const transform = element.getAttribute('transform');
  if (transform) {
    const transformComponents =
        transform.match(SCALE_REGEXP_);
    if (transformComponents && transformComponents[0]) {
      scale = parseFloat(transformComponents[0]);
    }
  }
  return scale;
}

/**
 * Helper method for creating SVG elements.
 * @param {string} tag Element's tag name.
 * @param {!Object} attrs Dictionary of attribute names and values.
 * @param {Element} parent Optional parent on which to append the element.
 * @return {!SVGElement} Newly created SVG element.
 */
export function createSvgElement(tag: string, attrs: Record<string, string>, parent?: Element): SVGElement {
  const e: SVGElement = document.createElementNS(SVG_NS, tag);

  for (const key of Object.keys(attrs)) {
    e.setAttribute(key, attrs[key]);
  }
  
  if (parent) {
    parent.appendChild(e);
  }

  return e;
}

/**
 * Is this event a right-click?
 * @param {!Event} e Mouse event.
 * @return {boolean} True if right-click.
 */
export function isRightButton(e: MouseEvent): boolean {
  if (e.ctrlKey && goog.userAgent.MAC) {
    // Control-clicking on Mac OS X is treated as a right-click.
    // WebKit on Mac OS X fails to change button to 2 (but Gecko does).
    return true;
  }

  return e.button === 2;
}

/**
 * Return the converted coordinates of the given mouse event.
 * The origin (0,0) is the top-left corner of the Blockly SVG.
 * @param {!Event} e Mouse event.
 * @param {!Element} svg SVG element.
 * @param {SVGMatrix} matrix Inverted screen CTM to use.
 * @return {!SVGPoint} Object with .x and .y properties.
 */
export function mouseToSvg(e: MouseEvent, svg: SVGSVGElement, matrix?: SVGMatrix): SVGPoint {
  const svgPoint = svg.createSVGPoint();
  svgPoint.x = e.clientX;
  svgPoint.y = e.clientY;

  matrix = matrix ?? svg.getScreenCTM()!.inverse();

  return svgPoint.matrixTransform(matrix);
}

/**
 * Given an array of strings, return the length of the shortest one.
 * @param {!Array.<string>} array Array of strings.
 * @return {number} Length of shortest string.
 */
export function shortestStringLength(array: string[]): number {
  if (array.length === 0) return 0;

  return array.reduce((a, b) => a.length < b.length ? a : b).length;
}

/**
 * Given an array of strings, return the length of the common prefix.
 * Words may not be split.  Any space after a word is included in the length.
 * @param {!Array.<string>} array Array of strings.
 * @param {number=} opt_shortest Length of shortest string.
 * @return {number} Length of common prefix.
 */
export function commonWordPrefix(array: string[], opt_shortest?: number): number {
  if (array.length === 0) return 0;
  else if (array.length === 1) return array[0].length;
  
  let wordPrefix = 0;
  const max = opt_shortest ?? shortestStringLength(array);

  for (let len = 0; len < max; len++)
  {
    const letter = array[0][len];

    for (let i = 1; i < array.length; i++)
    {
      if (letter !== array[i][len]) {
        return wordPrefix;
      }
    }
    if (letter === ' ') {
      wordPrefix = len + 1;
    }
  }

  for (let i = 1; i < array.length; i++)
  {
    const letter = array[i][max];

    if (letter && letter !== ' ') {
      return wordPrefix;
    }
  }

  return max;
}

/**
 * Given an array of strings, return the length of the common suffix.
 * Words may not be split.  Any space after a word is included in the length.
 * @param {!Array.<string>} array Array of strings.
 * @param {number=} opt_shortest Length of shortest string.
 * @return {number} Length of common suffix.
 */
export function commonWordSuffix(array: string[], opt_shortest?: number): number {
  if (array.length === 0) return 0;
  else if (array.length === 1) return array[0].length;
  
  let wordPrefix = 0;
  const max = opt_shortest ?? shortestStringLength(array);

  for (let len = 0; len < max; len++)
  {
    const letter = array[0].substr(-len - 1, 1);

    for (let i = 1; i < array.length; i++)
    {
      if (letter !== array[i].substr(-len - 1, 1)) {
        return wordPrefix;
      }
    }
    if (letter === ' ') {
      wordPrefix = len + 1;
    }
  }

  for (let i = 1; i < array.length; i++) {
    const letter = array[i].charAt(array[i].length - max - 1);
    if (letter && letter !== ' ') {
      return wordPrefix;
    }
  }

  return max;
}

/**
 * Parse a string with any number of interpolation tokens (%1, %2, ...).
 * It will also replace string table references (e.g., %{bky_my_msg} and
 * %{BKY_MY_MSG} will both be replaced with the value in
 * Blockly.Msg['MY_MSG']). Percentage sign characters '%' may be self-escaped
 * (e.g., '%%').
 * @param {string} message Text which might contain string table references and
 *     interpolation tokens.
 * @return {!Array.<string|number>} Array of strings and numbers.
 */
export function tokenizeInterpolation(message: string): Array<string | number> {
  return tokenizeInterpolation_(message, true);
}

/**
 * Replaces string table references in a message, if the message is a string.
 * For example, "%{bky_my_msg}" and "%{BKY_MY_MSG}" will both be replaced with
 * the value in Blockly.Msg['MY_MSG'].
 * @param {string|?} message Message, which may be a string that contains
 *                           string table references.
 * @return {!string} String with message references replaced.
 * FIXME this function does *what* for non-string input?!
 */
export function replaceMessageReferences(message: unknown): unknown {
  if (typeof message !== "string") {
    return message;
  }
  const interpolatedResult = tokenizeInterpolation_(message, false);
  // When parseInterpolationTokens == false, interpolatedResult should be at
  // most length 1.
  return interpolatedResult.length ? interpolatedResult[0] : '';
}

/**
 * Validates that any %{BKY_...} references in the message refer to keys of
 * the Blockly.Msg string table.
 * @param {string} message Text which might contain string table references.
 * @return {boolean} True if all message references have matching values.
 *     Otherwise, false.
 */
export function checkMessageReferences(message: string): boolean {
  let isValid = true;  // True until a bad reference is found.

  const regex = /%{BKY_([a-zA-Z][a-zA-Z0-9_]*)}/g;
  let match = regex.exec(message);
  while (match) {
    const msgKey = match[1];
    if (getMessageArray_()[msgKey] === undefined) {
      console.log('WARNING: No message string for %{BKY_' + msgKey + '}.');
      isValid = false;
      // the result of this function will be `false`, but still keep
      // running so that all invalid references are found and logged
    }

    // Re-run on remainder of string.
    message = message.substring(match.index + msgKey.length + 1);
    match = regex.exec(message);
  }

  return isValid;
}

/**
 * Internal implementation of the message reference and interpolation token
 * parsing used by tokenizeInterpolation() and replaceMessageReferences().
 * @param {string} message Text which might contain string table references and
 *     interpolation tokens.
 * @param {boolean} parseInterpolationTokens Option to parse numeric
 *     interpolation tokens (%1, %2, ...) when true.
 * @return {!Array.<string|number>} Array of strings and numbers.
 * @private
 */
export function tokenizeInterpolation_(
    message: string,
    parseInterpolationTokens: boolean
): Array<string | number>
{
  const tokens: Array<string | number> = [];
  const chars = [...message, '']; // Characters plus an end marker

  // Parse the message with a finite state machine.
  enum State {
    Base,    // Base case.
    Percent, // % found.
    Digit,   // Digit found.
    Message, // Message ref found.
  }
  
  let state = State.Base;
  let buffer: string[] = [];
  let number = '';

  function flushBuffer() {
    const text = buffer.join('');
    if (text !== '') tokens.push(text);
    buffer = [];
  }

  function flushNumber() {
    tokens.push(parseInt(number, 10));
    number = '';
  }

  const isDigit = (char: string) => /^[0-9]$/.test(char);
  const isKey = (str: string) => /^[a-zA-Z][a-zA-Z0-9_]*$/.test(str);

  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    
    switch (state)
    {
      case State.Base: {
        if (c === '%') {
          flushBuffer();
          state = State.Percent;  // Start escape.
        } else {
          buffer.push(c);  // Regular char.
        }

        break;
      }

      case State.Percent: {
        if (c === '%') {
          buffer.push(c);  // Escaped %: %%
          state = State.Base;
          break;
        }
        
        if (parseInterpolationTokens && isDigit(c)) {
          number = c;
          flushBuffer();
          state = State.Digit;
          break;
        }
        
        if (c === '{') {
          state = State.Message;
          break;
        }

        buffer.push('%', c);  // Not recognized. Return as literal.
        state = State.Base;

        break;
      }
    
      case State.Digit: {
        if (isDigit(c)) {
          number += c;  // Multi-digit number.
          break;
        }

        flushNumber();
        i--;  // Parse this char again.
        state = State.Base;
        
        break;
      }

      case State.Message: {  // String table reference
        if (c === '') {
          // Premature end before closing '}'
          buffer = ['%{', ...buffer]; // Re-insert leading delimiter
          i--;  // Parse this char again.
          state = State.Base; // and parse as string literal.
          break;
        }
        
        if (c !== '}') {
          buffer.push(c);
          break;
        }

        const rawKey = buffer.join('');
        if (isKey(rawKey)) {
          // Found a valid string key. Attempt case insensitive match.
          const keyUpper = rawKey.toUpperCase();

          // BKY_ is the prefix used to namespace the strings used in Blockly
          // core files and the predefined blocks in ../blocks/. These strings
          // are defined in ../msgs/ files.
          const bklyKey = keyUpper.startsWith('BKY_') ? keyUpper.substring(4) : null;

          if (bklyKey !== null && bklyKey in Blockly.Msg) {
            const rawValue = Blockly.Msg[bklyKey];
            if (typeof rawValue === "string") {
              // Attempt to dereference substrings, too, appending to the end.
              tokens.push( ...tokenizeInterpolation(rawValue) );
            } else if (parseInterpolationTokens) {
              // When parsing interpolation tokens, numbers are special
              // placeholders (%1, %2, etc). Make sure all other values are
              // strings.
              tokens.push(String(rawValue));
            } else {
              tokens.push(rawValue);
            }
          } else {
            // No entry found in the string table. Pass reference as string.
            tokens.push('%{' + rawKey + '}');
          }
        } else {
          tokens.push('%{' + rawKey + '}');
        }

        buffer = [];
        state = State.Base;
        
        break;
      }

    }

  }
  flushBuffer();

  // Merge adjacent text tokens into a single string.
  const mergedTokens: Array<string | number> = [];
  
  const last = <T>(arr: T[]): T | undefined => arr[arr.length - 1];
  
  for (const token of tokens) {
    if (typeof token === 'string' && typeof last(mergedTokens) === 'string') {
      mergedTokens.push(mergedTokens.pop() + token);
    } else {
      mergedTokens.push(token);
    }
  }

  return mergedTokens;
}

/**
 * Legal characters for the unique ID.  Should be all on a US keyboard.
 * No characters that conflict with XML or JSON.  Requests to remove additional
 * 'problematic' characters from this soup will be denied.  That's your failure
 * to properly escape in your own environment.  Issues #251, #625, #682, #1304.
 * @private
 *
 * TODO Investigate why so many weird characters are needed
 */
const UID_SOUP = '!#$%()*+,-./:;=?@[]^_`{|}~' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


const randomChar = (soup: string) => soup.charAt(Math.random() * soup.length);

/**
 * Generate a unique ID. This should be globally unique.
 * 87 characters ^ 20 length > 128 bits (better than a UUID).
 * @return {string} A globally unique ID string.
 */
export function genUid() {
  const length = 20;
  const id: string[] = [];

  for (let i = 0; i < length; i++) {
    id[i] = randomChar(UID_SOUP);
  }

  return id.join('');
}

/**
 * Wrap text to the specified width.
 * @param {string} text Text to wrap.
 * @param {number} limit Width to wrap each line.
 * @return {string} Wrapped text.
 */
export function wrap(text: string, limit: number): string {
  const lines = text.split('\n');

  for (let i = 0; i < lines.length; i++) {
    lines[i] = wrapLine_(lines[i], limit);
  }

  return lines.join('\n');
}

/**
 * Wrap single line of text to the specified width.
 * @param {string} text Text to wrap.
 * @param {number} limit Width to wrap each line.
 * @return {string} Wrapped text.
 * @private
 */
export function wrapLine_(text: string, limit: number): string {

  // Short text, no need to wrap.
  if (text.length <= limit) return text;

  // Split the text into words.
  const words = text.trim().split(/\s+/);

  // Set limit to be the length of the largest word.
  for (const word of words) {
    if (word.length > limit) limit = word.length;
  }

  let lastScore: number;
  let score = -Infinity;
  let lastText: string;
  let lineCount = 1;
  do {
    lastScore = score;
    lastText = text;
    // Create a list of booleans representing if a space (false) or
    // a break (true) appears after each word.
    let wordBreaks: boolean[] = [];
    // Seed the list with evenly spaced linebreaks.
    const steps = words.length / lineCount;
    let insertedBreaks = 1;
    for (let i = 0; i < words.length - 1; i++) {
      if (insertedBreaks < (i + 1.5) / steps) {
        insertedBreaks++;
        wordBreaks[i] = true;
      } else {
        wordBreaks[i] = false;
      }
    }
    wordBreaks = wrapMutate_(words, wordBreaks, limit);
    score = wrapScore_(words, wordBreaks, limit);
    text = wrapToText_(words, wordBreaks);
    lineCount++;
  } while (score > lastScore);

  return lastText;
}

/**
 * Compute a score for how good the wrapping is.
 * @param {!Array.<string>} words Array of each word.
 * @param {!Array.<boolean>} wordBreaks Array of line breaks.
 * @param {number} limit Width to wrap each line.
 * @return {number} Larger the better.
 * @private
 */
export function wrapScore_(
    words: readonly string[],
    wordBreaks: readonly boolean[],
    limit: number
): number
{
  // If this function becomes a performance liability, add caching.
  // Compute the length of each line.

  const lineLengths = [0];
  const linePunctuation: string[] = [];

  for (let i = 0; i < words.length; i++)
  {
    lineLengths[lineLengths.length - 1] += words[i].length;
    if (wordBreaks[i] === true) {
      lineLengths.push(0);
      linePunctuation.push(words[i].charAt(words[i].length - 1));
    } else if (wordBreaks[i] === false) {
      lineLengths[lineLengths.length - 1]++;
    }
  }
  const maxLength = Math.max(...lineLengths);

  let score = 0;
  for (let i = 0; i < lineLengths.length; i++) {
    // Optimize for width.
    // -2 points per char over limit (scaled to the power of 1.5).
    score -= 2 * (Math.abs(limit - lineLengths[i]) ** 1.5);
    // Optimize for even lines.
    // -1 point per char smaller than max (scaled to the power of 1.5).
    score -= (maxLength - lineLengths[i]) ** 1.5;
    // Optimize for structure.
    // Add score to line endings after punctuation.
    if ('.?!'.includes(linePunctuation[i])) {
      score += limit / 3;
    } else if (',;)]}'.includes(linePunctuation[i])) {
      score += limit / 4;
    }
  }
  
  // All else being equal, the last line should not be longer than the
  // previous line.  For example, this looks wrong:
  // aaa bbb
  // ccc ddd eee
  if (lineLengths.length > 1 && lineLengths[lineLengths.length - 1] <=
      lineLengths[lineLengths.length - 2]) {
    score += 0.5;
  }

  return score;
}

/**
 * Modify (a copy of) the array of line break locations until an optimal
 * solution is found. No line breaks are added or deleted, they are
 * simply moved around.
 * @param {!Array.<string>} words Array of each word.
 * @param {!Array.<boolean>} wordBreaks Array of line breaks.
 * @param {number} limit Width to wrap each line.
 * @return {!Array.<boolean>} New array of optimal line breaks.
 * @private
 */
export function wrapMutate_(
    words: readonly string[],
    wordBreaks: readonly boolean[],
    limit: number
): boolean[]
{
  let bestScore = wrapScore_(words, wordBreaks, limit);
  let bestBreaks;

  // Try shifting every line break forward or backward.
  for (let i = 0; i < wordBreaks.length - 1; i++) {
    if (wordBreaks[i] === wordBreaks[i + 1]) continue;

    const mutatedWordBreaks = [...wordBreaks];
    mutatedWordBreaks[i] = !mutatedWordBreaks[i];
    mutatedWordBreaks[i + 1] = !mutatedWordBreaks[i + 1];

    const mutatedScore = wrapScore_(words, mutatedWordBreaks, limit);
    
    if (mutatedScore > bestScore) {
      bestScore = mutatedScore;
      bestBreaks = mutatedWordBreaks;
    }
  }
  if (bestBreaks) {
    // Found an improvement.  See if it may be improved further.
    return wrapMutate_(words, bestBreaks, limit);
  }
  // No improvements found.  Done.
  return [...wordBreaks];
}

/**
 * Reassemble the array of words into text, with the specified line breaks.
 * @param {!Array.<string>} words Array of each word.
 * @param {!Array.<boolean>} wordBreaks Array of line breaks.
 * @return {string} Plain text.
 * @private
 */
export function wrapToText_(
    words: readonly string[],
    wordBreaks: ReadonlyArray<boolean | undefined>
): string
{
  const text: string[] = [];

  for (let i = 0; i < words.length; i++) {
    text.push(words[i]);
    if (wordBreaks[i] !== undefined) {
      text.push(wordBreaks[i] ? '\n' : ' ');
    }
  }

  return text.join('');
}


// memoize the result of is3dSupported()
let is3dSupported_cached_: boolean | undefined = undefined;

/**
 * Check if 3D transforms are supported by adding an element
 * and attempting to set the property.
 * @return {boolean} true if 3D transforms are supported.
 */
export function is3dSupported(): boolean {
  if (is3dSupported_cached_ !== undefined) {
    return is3dSupported_cached_;
  }

  // CC-BY-SA Lorenzo Polidori
  // stackoverflow.com/questions/5661671/detecting-transform-translate3d-support
  if (!goog.global.getComputedStyle) {
    return false;
  }

  const el = document.createElement('p');
  let has3d = 'none';
  const transforms = {
    webkitTransform: '-webkit-transform',
    OTransform: '-o-transform',
    msTransform: '-ms-transform',
    MozTransform: '-moz-transform',
    transform: 'transform'
  };

  // Add it to the body to get the computed style.
  document.body.insertBefore(el, null);

  for (const t of Object.keys(transforms)) {
    if (el.style[t] !== undefined) {
      el.style[t] = 'translate3d(1px,1px,1px)';
      const computedStyle = goog.global.getComputedStyle(el);
      if (!computedStyle) {
        // getComputedStyle in Firefox returns null when blockly is loaded
        // inside an iframe with display: none.  Returning false and not
        // caching is3dSupported means we try again later.  This is most likely
        // when users are interacting with blocks which should mean blockly is
        // visible again.
        // See https://bugzilla.mozilla.org/show_bug.cgi?id=548397
        document.body.removeChild(el);
        return false;
      }
      has3d = computedStyle.getPropertyValue(transforms[t]);
    }
  }
  document.body.removeChild(el);
  is3dSupported_cached_ = has3d !== 'none';
  return is3dSupported_cached_;
}

/**
 * Insert a node after a reference node.
 * Contrast with node.insertBefore function.
 * @param {!Element} newNode New element to insert.
 * @param {!Element} refNode Existing element to precede new node.
 * @package
 */
export function insertAfter(newNode: Element, refNode: Element) {
  const siblingNode = refNode.nextSibling;
  const parentNode = refNode.parentNode;

  if (!parentNode) throw 'Reference node has no parent.';

  if (siblingNode) parentNode.insertBefore(newNode, siblingNode);
  else parentNode.appendChild(newNode);
}

/**
 * Calls a function after the page has loaded, possibly immediately.
 * @param {function()} fn Function to run.
 * @throws Error Will throw if no global document can be found (e.g., Node.js).
 *
 * TODO Investigate why polling and not on:load
 */
export function runAfterPageLoad(fn: () => void): void {
  if (!document) {
    throw new Error('Blockly.utils.runAfterPageLoad() requires browser document.');
  }
  if (document.readyState === 'complete') {
    fn();  // Page has already loaded. Call immediately.
  } else {
    // Poll readyState.
    const readyStateCheckInterval = setInterval(function() {
      if (document.readyState === 'complete') {
        clearInterval(readyStateCheckInterval);
        fn();
      }
    }, 10);
  }
}

/**
 * @deprecated
 * Sets the CSS transform property on an element. This function sets the
 * non-vendor-prefixed and vendor-prefixed versions for backwards compatibility
 * with older browsers. See http://caniuse.com/#feat=transforms2d
 * @param {!Element} node The node which the CSS transform should be applied.
 * @param {string} transform The value of the CSS `transform` property.
 */
export function setCssTransform(node: HTMLElement | SVGElement, transform: string) {
  node.style['transform'] = transform;
  node.style['-webkit-transform'] = transform;
}

/**
 * Bounding box – an object containing containing the x coordinate
 * of the leftmost and rightmost point of an object, as well as the
 * y coordinate of the topmost and bottommost point.
 */
export interface BBox {
  top: number,
  right: number,
  bottom: number,
  left: number,
}

/**
 * Get the position of the current viewport in window coordinates.  This takes
 * scroll into account.
 * @return {!Object} a bounding box of the viewport (visible area) in the
 *     coordinates that are relative to the page.
 * @package
 */
export function getViewportBBox(): BBox {
  // Pixels.
  const windowSize = goog.dom.getViewportSize();
  // Pixels, in window coordinates.
  const scrollOffset = goog.style.getViewportPageOffset(document);
  return {
    right: windowSize.width + scrollOffset.x,
    bottom: windowSize.height + scrollOffset.y,
    top: scrollOffset.y,
    left: scrollOffset.x
  };
}

/**
 * @deprecated Use `str.startsWith(prefix)`
 *
 * Fast prefix-checker.
 * Copied from Closure's goog.string.startsWith.
 * @param {string} str The string to check.
 * @param {string} prefix A string to look for at the start of `str`.
 * @return {boolean} True if `str` begins with `prefix`.
 * @package
 */
export function startsWith(str: string, prefix: string): boolean {
  return str.startsWith(prefix);
}

/**
 * Converts degrees to radians.
 * Copied from Closure's goog.math.toRadians.
 * @param {number} angleDegrees Angle in degrees.
 * @return {number} Angle in radians.
 * @package
 */
export function toRadians(angleDegrees: number): number {
  return angleDegrees * Math.PI / 180;
}
