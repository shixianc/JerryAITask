const RangeList = require("./rangelist");

const rangelist1 = new RangeList();
const rangelist2 = new RangeList();

/**
 * Example tests #1
 * test invalid values and edge cases.
 */
it("add a range", () => {
  console.log = jest.fn();
  const range = [-1, 1];
  rangelist1.add(range);
  rangelist1.print();
  expect(console.log).toHaveBeenCalledWith("[-1, 1)");
});
it("add a range", () => {
  console.log = jest.fn();
  const range = [3, 100];
  rangelist1.add(range);
  rangelist1.print();
  expect(console.log).toHaveBeenCalledWith("[-1, 1) [3, 100)");
});
it("add an invalid range", () => {
  console.log = jest.fn();
  const range = [5, 4];
  rangelist1.add(range);
  rangelist1.print();
  expect(console.log).toHaveBeenCalledWith("[-1, 1) [3, 100)");
});
it("add an invalid range", () => {
  console.log = jest.fn();
  const range = [100, -100];
  rangelist1.add(range);
  rangelist1.print();
  expect(console.log).toHaveBeenCalledWith("[-1, 1) [3, 100)");
});
it("add a range", () => {
  console.log = jest.fn();
  const range = [0, 0];
  rangelist1.add(range);
  rangelist1.print();
  expect(console.log).toHaveBeenCalledWith("[-1, 1) [3, 100)");
});
it("remove an invalid range", () => {
  console.log = jest.fn();
  const range = [1, -1];
  rangelist1.remove(range);
  rangelist1.print();
  expect(console.log).toHaveBeenCalledWith("[-1, 1) [3, 100)");
});
it("Invalid input type", () => {
  console.log = jest.fn();
  const range = "dummy_inupt";
  rangelist1.remove(range);
  rangelist1.print();
  expect(console.log).toHaveBeenCalledWith("[-1, 1) [3, 100)");
});
it("Invalid input type", () => {
  console.log = jest.fn();
  const range = [1, 2, 3];
  rangelist1.remove(range);
  rangelist1.print();
  expect(console.log).toHaveBeenCalledWith("[-1, 1) [3, 100)");
});

/**
 * Example tests #2
 */
it("add a range", () => {
  console.log = jest.fn();
  const range_1 = [1, 5];
  rangelist2.add(range_1);
  rangelist2.print();
  expect(console.log).toHaveBeenCalledWith("[1, 5)");
});
it("add a range", () => {
  console.log = jest.fn();
  const range_2 = [10, 20];
  rangelist2.add(range_2);
  rangelist2.print();
  expect(console.log).toHaveBeenCalledWith("[1, 5) [10, 20)");
});
it("add a range", () => {
  console.log = jest.fn();
  const range_3 = [20, 20];
  rangelist2.add(range_3);
  rangelist2.print();
  expect(console.log).toHaveBeenCalledWith("[1, 5) [10, 20)");
});
it("add a range", () => {
  console.log = jest.fn();
  const range_4 = [20, 21];
  rangelist2.add(range_4);
  rangelist2.print();
  expect(console.log).toHaveBeenCalledWith("[1, 5) [10, 21)");
});
it("add a range", () => {
  console.log = jest.fn();
  const range_5 = [2, 4];
  rangelist2.add(range_5);
  rangelist2.print();
  expect(console.log).toHaveBeenCalledWith("[1, 5) [10, 21)");
});
it("add a range", () => {
  console.log = jest.fn();
  const range_6 = [3, 8];
  rangelist2.add(range_6);
  rangelist2.print();
  expect(console.log).toHaveBeenCalledWith("[1, 8) [10, 21)");
});
it("remove a range", () => {
  console.log = jest.fn();
  const range_7 = [10, 10];
  rangelist2.remove(range_7);
  rangelist2.print();
  expect(console.log).toHaveBeenCalledWith("[1, 8) [10, 21)");
});
it("remove a range", () => {
  console.log = jest.fn();
  const range_8 = [10, 11];
  rangelist2.remove(range_8);
  rangelist2.print();
  expect(console.log).toHaveBeenCalledWith("[1, 8) [11, 21)");
});
it("remove a range", () => {
  console.log = jest.fn();
  const range_9 = [15, 17];
  rangelist2.remove(range_9);
  rangelist2.print();
  expect(console.log).toHaveBeenCalledWith("[1, 8) [11, 15) [17, 21)");
});
it("remove a range", () => {
  console.log = jest.fn();
  const range_10 = [3, 19];
  rangelist2.remove(range_10);
  rangelist2.print();
  expect(console.log).toHaveBeenCalledWith("[1, 3) [19, 21)");
});
