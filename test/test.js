const expect = require('chai').expect;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.window = new JSDOM();
global.document = global.window.document;
const rolledup = require('../js/rolledup');

/*
  Note to developers: So here's the deal. I made the tool work initially by just hacking away.
  That didn't set things up well for tests. But I did verify the results. So these tests
  are just using the data from prior runs of the tool where I know (or at least to the best
  of my ability I know) the results are correct.

  Software doesn't have to be perfect. Sometimes it just has to work.
*/

describe('Integration tests with data from prior runs', () => {
  describe('Criteria: A, B, C; Alternatives: X, Y', () => {
    let decision;

    before(() => {
      const items = ["x", "y"];
      const criteria = ["a", "b", "c"];
      const criteriaItemRank = {
        "a": [
          [1, 2],
          [1/2, 1],
        ],
        "b": [
          [1, 3],
          [1/3, 1],
        ],
        "c": [
          [1, 4],
          [1/4, 1],
        ]
      };
      const criteriaRank = [
        [1, 2, 3],
        [1/2, 1, 4],
        [1/3, 1/4, 1]
      ];
      decision = global.window.runCalculation(items, criteria, criteriaItemRank, criteriaRank);
    });

    it('should return the same criteria labels as before we refactored the code', () => {
      expect(decision.criteria.labels).to.deep.equal(["a: 0.512", "b: 0.360", "c: 0.128"]);
    });

    it('should return the same criteria series as before we refactored the code', () => {
      expect(decision.criteria.labels).to.deep.equal(["a: 0.512", "b: 0.360", "c: 0.128"]);
    });

    it('should return the same rankings labels as before we refactored the code', () => {
      expect(decision.rankings.labels).to.deep.equal(["x: 0.714", "y: 0.286"]);
    });

    it('should return the same rankings series as before we refactored the code', () => {
      expect(decision.rankings.series).to.deep.equal([
        [0.10233100233100234, 0.025582750582750585],
        [0.2701048951048951, 0.09003496503496504],
        [0.3412975912975913, 0.17064879564879565],
      ]);
    });
  });
});
