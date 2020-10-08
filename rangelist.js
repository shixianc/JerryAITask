/**
 * RangeList maintains an array of ranges defined by a pair of integers.
 * It supports add, remove and print operations on the rangelist.
 */
class RangeList {
  // Creates an array on create to store range pairs.
  constructor() {
    this._ranges = [];
  }
  /**
   * Adds a range to the list.
   * Checks if the input is valid and then call the helper function.
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(range) {
    if (
      // Validate input
      range !== null &&
      typeof range === "object" &&
      Array.isArray(range) &&
      this._isValidRange(range)
    ) {
      this._addAndMerge(range);
    }
  }

  /**
   * Helper method for add().
   * Adds a range to the list and merge intervals if possible.
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  _addAndMerge(range) {
    // Corner cases
    if (this._ranges.length == 0) {
      this._ranges.push(range);
      return;
    }
    let [start, end] = range;
    const rangesLength = this._ranges.length;
    if (start > this._ranges[rangesLength - 1][1]) {
      this._ranges.push(range);
      return;
    }

    // Iterate rangelist to find the first element that overlaps with input range.
    let currIndex = 0;
    let updatedList = []; // stores the updated part of range list.
    while (currIndex < rangesLength) {
      let [currStart, currEnd] = this._ranges[currIndex];
      // Insert the input range if no overlap.
      if (currStart > end) {
        this._ranges.splice(currIndex, 0, range);
        return;
      }
      // Insert the first merged range into the updated list and then break if overlap occurs.
      if (currEnd >= start) {
        updatedList.push([Math.min(start, currStart), Math.max(end, currEnd)]);
        currIndex++;
        break;
      }
      currIndex++;
    }
    // Save the intact part of the range list
    let firstHalf = this._ranges.slice(0, currIndex - 1);
    // Merge all overlapping ranges
    while (currIndex < rangesLength) {
      let [currStart, currEnd] = this._ranges[currIndex];
      if (currStart <= updatedList[updatedList.length - 1][1]) {
        // Update right boundary of the last range in the list.
        updatedList[updatedList.length - 1][1] = Math.max(
          updatedList[updatedList.length - 1][1],
          currEnd
        );
      } else {
        updatedList = updatedList.concat(this._ranges.slice(currIndex));
      }
      currIndex++;
    }

    // Set the result list by concat the first half intact array with updated array.
    this._ranges = firstHalf.concat(updatedList);
  }

  /**
   * Removes a range from the list.
   * Checks if the input is valid and then call the helper function.
   * @param {Array<number>} beginning and end of range.
   */
  remove(range) {
    if (
      // Validate input
      range !== null &&
      typeof range === "object" &&
      Array.isArray(range) &&
      this._isValidRange(range)
    ) {
      this._removeHelper(range);
    }
  }

  /**
   * Helper method for remove().
   * Remove the range from the list and remove invalid ranges.
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  _removeHelper(range) {
    let currIndex = 0;
    let [start, end] = range;
    while (currIndex < this._ranges.length) {
      let [currStart, currEnd] = this._ranges[currIndex];
      if (end < currStart) {
        return;
      }
      if (currStart < end && currEnd > start) {
        let reducedRange = this._removeOverlap(this._ranges[currIndex], range);
        this._ranges.splice(currIndex, 1, ...reducedRange);
        if (reducedRange.length == 0) {
          currIndex--;
        }
      }
      currIndex += 1;
    }
  }
  /**
   * Find the range after removing overlapping part with the removing range.
   * @param {Array<number>} target - Array of two integers that specify beginning and end of original range.
   * @param {Array<number>} source - Array of two integers that specify beginning and end of removing range.
   * Output: {Array<number>} output - Array of two integers that specify beginning and end of range.
   */
  _removeOverlap(target, source) {
    let reducedRange = [
      [target[0], source[0]],
      [source[1], target[1]],
    ];
    return reducedRange.filter(([a, b]) => b > a);
  }

  /**
   * Validate the input range.
   * @param {*} range
   */
  _isValidRange(range) {
    return (
      // Length has to be 2.
      range.length == 2 &&
      // Type of the two object has to be number type.
      typeof range[0] === "number" &&
      typeof range[1] === "number" &&
      // right element has to be larger than the left element.
      range[0] < range[1]
    );
  }

  /**
   * Prints out the list of ranges in the range list.
   */
  print() {
    console.log(
      this._ranges.map(([start, end], _) => `[${start}, ${end})`).join(" ")
    );
  }
}

module.exports = RangeList;
