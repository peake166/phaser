/**
 * @author       Richard Davey <rich@phaser.io>
 * @copyright    2013-2025 Phaser Studio Inc.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var SafeRange = require('./SafeRange');

/**
 * Returns the first element in the array.
 *
 * You can optionally specify a matching criteria using the `property` and `value` arguments.
 *
 * For example: `getAll('visible', true)` would return the first element that had its `visible` property set.
 *
 * Optionally you can specify a start and end index. For example if the array had 100 elements,
 * and you set `startIndex` to 0 and `endIndex` to 50, it would search only the first 50 elements.
 * You can also specify a negative `startIndex`, such as `-1`, which would start the search at the end of the array
 *
 * @function Phaser.Utils.Array.GetFirst
 * @since 3.4.0
 *
 * @param {array} array - The array to search.
 * @param {string} [property] - The property to test on each array element.
 * @param {*} [value] - The value to test the property against. Must pass a strict (`===`) comparison check.
 * @param {number} [startIndex=0] - An optional start index to search from. You cn also set `startIndex` to -1 to start the search from the end of the array.
 * @param {number} [endIndex=array.length] - An optional end index to search up to (but not included)
 *
 * @return {?object} The first matching element from the array, or `null` if no element could be found in the range given.
 */
var GetFirst = function (array, property, value, startIndex, endIndex)
{
    if (startIndex === undefined) { startIndex = 0; }
    if (endIndex === undefined) { endIndex = startIndex >= 0 ? array.length - 1 : 0; }
    if (startIndex === -1) { startIndex = array.length - 1; }

    var i, child;

    if (SafeRange(array, Math.min(startIndex, endIndex), Math.max(startIndex, endIndex)))
    {
        var step = startIndex < endIndex ? 1 : -1;
        var count = Math.abs(endIndex - startIndex);
        var index = startIndex;

        for (i = 0; i < count; i += step)
        {
            child = array[index];

            if (!property ||
                (property && value === undefined && child.hasOwnProperty(property)) ||
                (property && value !== undefined && child[property] === value)) 
            {
                return child;
            }

            index += step;
        }
    }
    return null;
};

module.exports = GetFirst;
