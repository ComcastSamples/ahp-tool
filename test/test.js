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
      expect(decision.criteria.series).to.deep.equal([
        [0.5119463869463869, 0.36013986013986016, 0.12791375291375293]
      ]);
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

  describe('Criteria: A, B, C, D; Alternatives: X, Y', () => {
    let decision;

    before(() => {
      const items = ["x", "y"];
      const criteria = ["a", "b", "c", "d"];
      const criteriaItemRank = {
        "a": [
          [1, 9],
          [1/9, 1],
        ],
        "b": [
          [1, 1/5],
          [5, 1],
        ],
        "c": [
          [1, 2],
          [1/2, 1],
        ],
        "d": [
          [1, 1/4],
          [4, 1],
        ]
      };
      const criteriaRank = [
        [1, 1/5, 1, 1/3],
        [5, 1, 5, 3],
        [1, 1/5, 1, 1/3],
        [3, 1/3, 3, 1],
      ];
      decision = global.window.runCalculation(items, criteria, criteriaItemRank, criteriaRank);
    });

    it('should return the same criteria labels as before we refactored the code', () => {
      expect(decision.criteria.labels).to.deep.equal(["a: 0.097", "b: 0.555", "c: 0.097", "d: 0.252"]);
    });

    it('should return the same criteria series as before we refactored the code', () => {
      expect(decision.criteria.series).to.deep.equal([
        [0.09670329670329669, 0.554945054945055, 0.09670329670329669, 0.25164835164835164]
      ]);
    });

    it('should return the same rankings labels as before we refactored the code', () => {
      expect(decision.rankings.labels).to.deep.equal(["x: 0.294", "y: 0.706"]);
    });

    it('should return the same rankings series as before we refactored the code', () => {
      expect(decision.rankings.series).to.deep.equal([
        [0.05032967032967033, 0.20131868131868133],
        [0.06446886446886446, 0.03223443223443223],
        [0.09249084249084251, 0.4624542124542124],
        [0.08703296703296702, 0.009670329670329669],
      ]);
    });
  });

  describe('Criteria: A, B, C, D, E, F; Alternatives: X, Y, Z', () => {
    let decision;

    before(() => {
      const items = ["x", "y", "z"];
      const criteria = ["a", "b", "c", "d", "e", "f"];
      const criteriaItemRank = {
        "a": [
          [1, 7, 2],
          [1/7, 1, 1/7],
          [1/2, 7, 1],
        ],
        "b": [
          [1, 1/3, 1/3],
          [3, 1, 1],
          [3, 1, 1],
        ],
        "c": [
          [1, 2, 5],
          [1/2, 1, 3],
          [1/5, 1/3, 1],
        ],
        "d": [
          [1, 1/4, 1/6],
          [4, 1, 1/2],
          [6, 2, 1],
        ],
        "e": [
          [1, 1.5, 1],
          [1/1.5, 1, 1],
          [1, 1, 1],
        ],
        "f": [
          [1, 1.2, 2],
          [1/1.2, 1, 2],
          [1/2, 1/2, 1],
        ],
      };
      const criteriaRank = [
        [1, 3, 4, 7, 5, 9],
        [1/3, 1, 5, 9, 7, 9],
        [1/4, 1/5, 1, 6, 5, 9],
        [1/7, 1/9, 1/6, 1, 1/3, 9],
        [1/5, 1/7, 1/5, 3, 1, 9],
        [1/9, 1/9, 1/9, 1/9, 1/9, 1],
      ];
      decision = global.window.runCalculation(items, criteria, criteriaItemRank, criteriaRank);
    });

    it('should return the same criteria labels as before we refactored the code', () => {
      expect(decision.criteria.labels).to.deep.equal(["a: 0.377", "b: 0.297", "c: 0.160", "d: 0.060", "e: 0.086", "f: 0.020"]);
    });

    it('should return the same criteria series as before we refactored the code', () => {
      expect(decision.criteria.series).to.deep.equal([
        [0.37743167129278493, 0.2966201463945178, 0.15974766912188113, 0.06039818999596138, 0.08555220124444407, 0.020250121950410777]
      ]);
    });

    it('should return the same rankings labels as before we refactored the code', () => {
      expect(decision.rankings.labels).to.deep.equal(["x: 0.397", "y: 0.254", "z: 0.350"]);
    });

    it('should return the same rankings series as before we refactored the code', () => {
      expect(decision.rankings.series).to.deep.equal([
        [0.008592908891126688, 0.007610760119281368, 0.004046452940002718],
        [0.03242156832874765, 0.024782978931922293, 0.028347653983774125],
        [0.005392192719919163, 0.019555497879811274, 0.03545049939623095],
        [0.0928555078904529, 0.04938604411415018, 0.01750611711727804],
        [0.04237430662778825, 0.12712291988336477, 0.12712291988336477],
        [0.21535319602265535, 0.025046080602696443, 0.13703239466743317],
      ]);
    });
  });

  describe('Criteria: A, B, C, D, E, F, G; Alternatives: X, Y, Z', () => {
    let decision;

    before(() => {
      const items = ["x", "y", "z"];
      const criteria = ["a", "b", "c", "d", "e", "f", "g"];
      const criteriaItemRank = {
        "a": [
          [1, 7, 2],
          [1/7, 1, 1/7],
          [1/2, 7, 1],
        ],
        "b": [
          [1, 1/3, 7],
          [3, 1, 9],
          [1/7, 1/9, 1],
        ],
        "c": [
          [1, 2, 5],
          [1/2, 1, 3],
          [1/5, 1/3, 1],
        ],
        "d": [
          [1, 1/4, 1/6],
          [4, 1, 1/2],
          [6, 2, 1],
        ],
        "e": [
          [1, 1.5, 1],
          [1/1.5, 1, 1],
          [1, 1, 1],
        ],
        "f": [
          [1, 6, 1],
          [1/6, 1, 1/6],
          [1, 6, 1],
        ],
        "g": [
          [1, 1.2, 2],
          [1/1.2, 1, 2],
          [1/2, 1/2, 1],
        ],
      };
      const criteriaRank = [
        [1, 2, 4, 7, 5, 1, 9],
        [1/2, 1, 5, 9, 7, 1, 9],
        [1/4, 1/5, 1, 6, 5, 1/3, 9],
        [1/7, 1/9, 1/6, 1, 1/3, 1/7, 9],
        [1/5, 1/7, 1/5, 3, 1, 1/5, 9],
        [1, 1, 3, 7, 5, 1, 9],
        [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1],
      ];
      decision = global.window.runCalculation(items, criteria, criteriaItemRank, criteriaRank);
    });

    it('should return the same criteria labels as before we refactored the code', () => {
      expect(decision.criteria.labels).to.deep.equal(["a: 0.271", "b: 0.249", "c: 0.120", "d: 0.047", "e: 0.065", "f: 0.229", "g: 0.018"]);
    });

    it('should return the same criteria series as before we refactored the code', () => {
      expect(decision.criteria.series).to.deep.equal([
        [0.2713374866656943, 0.24916551946569904, 0.12030903800233286, 0.04672410125668501, 0.0654653945120832, 0.2294445652725281, 0.017553894824977493]
      ]);
    });

    it('should return the same rankings labels as before we refactored the code', () => {
      expect(decision.rankings.labels).to.deep.equal(["x: 0.440", "y: 0.275", "z: 0.284"]);
    });

    it('should return the same rankings series as before we refactored the code', () => {
      expect(decision.rankings.series).to.deep.equal([
        [0.007448795581815846, 0.00659741620317937, 0.003507683039982275],
        [0.10589749166424373, 0.01764958194404062, 0.10589749166424373],
        [0.02480930625358709, 0.01896418174357966, 0.021691906514916457],
        [0.0041714057765292216, 0.015128153064227386, 0.02742454241592841],
        [0.06993126653381788, 0.03719357841510029, 0.013184193053414691],
        [0.07341356778349117, 0.16161352229972084, 0.014138429382487003],
        [0.1548184728485156, 0.018005750652255778, 0.09851326316492293],
      ]);
    });
  });

  describe('Criteria: A, B, C, D, E, F, G, H; Alternatives: S, T, U, V, W, X, Y, Z', () => {
    let decision;

    before(() => {
      const items = ["s", "t", "u", "v", "w", "x", "y", "z"];
      const criteria = ["a", "b", "c", "d", "e", "f", "g", "h"];
      const criteriaItemRank = {
        "a": [
          [1, 3, 4, 5, 6, 7, 8, 9],
          [1/3, 1, 3, 4, 5, 6, 7, 8],
          [1/4, 1/3, 1, 3, 4, 5, 6, 7],
          [1/5, 1/4, 1/3, 1, 3, 4, 5, 6],
          [1/6, 1/5, 1/4, 1/3, 1, 3, 4, 5],
          [1/7, 1/6, 1/5, 1/4, 1/3, 1, 3, 4],
          [1/8, 1/7, 1/6, 1/5, 1/4, 1/3, 1, 3],
          [1/9, 1/8, 1/7, 1/6, 1/5, 1/4, 1/3, 1, 2],
        ],
        "b": [
          [1, 4, 5, 6, 7, 8, 9, 1.1],
          [1/4, 1, 4, 5, 6, 7, 8, 9],
          [1/5, 1/4, 1, 4, 5, 6, 7, 8],
          [1/6, 1/5, 1/4, 1, 4, 5, 6, 7],
          [1/7, 1/6, 1/5, 1/4, 1, 4, 5, 6],
          [1/8, 1/7, 1/6, 1/5, 1/4, 1, 4, 5],
          [1/9, 1/8, 1/7, 1/6, 1/5, 1/4, 1, 4],
          [1/1.1, 1/9, 1/8, 1/7, 1/6, 1/5, 1/4, 1],
        ],
        "c": [
          [1, 5, 6, 7, 8, 9, 1.1, 1.2],
          [1/5, 1, 5, 6, 7, 8, 9, 1.1],
          [1/6, 1/5, 1, 5, 6, 7, 8, 9],
          [1/7, 1/6, 1/5, 1, 5, 6, 7, 8],
          [1/8, 1/7, 1/6, 1/5, 1, 5, 6, 7],
          [1/9, 1/8, 1/7, 1/6, 1/5, 1, 5, 6],
          [1/1.1, 1/9, 1/8, 1/7, 1/6, 1/5, 1, 5],
          [1/1.2, 1/1.1, 1/9, 1/8, 1/7, 1/6, 1/5, 1],
        ],
        "d": [
          [1, 6, 7, 8, 9, 1.1, 1.2, 1.3],
          [1/6, 1, 6, 7, 8, 9, 1.1, 1.2],
          [1/7, 1/6, 1, 6, 7, 8, 9, 1.1],
          [1/8, 1/7, 1/6, 1, 6, 7, 8, 9],
          [1/9, 1/8, 1/7, 1/6, 1, 6, 7, 8],
          [1/1.1, 1/9, 1/8, 1/7, 1/6, 1, 6, 7],
          [1/1.2, 1/1.1, 1/9, 1/8, 1/7, 1/6, 1, 6],
          [1/1.3, 1/1.2, 1/1.1, 1/9, 1/8, 1/7, 1/6, 1],
        ],
        "e": [
          [1, 7, 8, 9, 1.1, 1.2, 1.3, 2],
          [1/7, 1, 7, 8, 9, 1.1, 1.2, 1.3],
          [1/8, 1/7, 1, 7, 8, 9, 1.1, 1.2],
          [1/9, 1/8, 1/7, 1, 7, 8, 9, 1.1],
          [1/1.1, 1/9, 1/8, 1/7, 1, 7, 8, 9],
          [1/1.2, 1/1.1, 1/9, 1/8, 1/7, 1, 7, 8],
          [1/1.3, 1/1.2, 1/1.1, 1/9, 1/8, 1/7, 1, 7],
          [1/2, 1/1.3, 1/1.2, 1/1.1, 1/9, 1/8, 1/7, 1],
        ],
        "f": [
          [1, 8, 9, 1.1, 1.2, 1.3, 2, 3],
          [1/8, 1, 8, 9, 1.1, 1.2, 1.3, 2],
          [1/9, 1/8, 1, 8, 9, 1.1, 1.2, 1.3],
          [1/1.1, 1/9, 1/8, 1, 8, 9, 1.1, 1.2],
          [1/1.2, 1/1.1, 1/9, 1/8, 1, 8, 9, 1.1],
          [1/1.3, 1/1.2, 1/1.1, 1/9, 1/8, 1, 8, 9],
          [1/2, 1/1.3, 1/1.2, 1/1.1, 1/9, 1/8, 1, 8],
          [1/3, 1/2, 1/1.3, 1/1.2, 1/1.1, 1/9, 1/8, 1],
        ],
        "g": [
          [1, 9, 1.1, 1.2, 1.3, 2, 3, 4],
          [1/9, 1, 9, 1.1, 1.2, 1.3, 2, 3],
          [1/1.1, 1/9, 1, 9, 1.1, 1.2, 1.3, 2],
          [1/1.2, 1/1.1, 1/9, 1, 9, 1.1, 1.2, 1.3],
          [1/1.3, 1/1.2, 1/1.1, 1/9, 1, 9, 1.1, 1.2],
          [1/2, 1/1.3, 1/1.2, 1/1.1, 1/9, 1, 9, 1.1],
          [1/3, 1/2, 1/1.3, 1/1.2, 1/1.1, 1/9, 1, 9],
          [1/4, 1/3, 1/2, 1/1.3, 1/1.2, 1/1.1, 1/9, 1],
        ],
        "h": [
          [1, 1.1, 1.2, 1.3, 2, 3, 4, 5],
          [1/1.1, 1, 1.1, 1.2, 1.3, 2, 3, 4],
          [1/1.2, 1/1.1, 1, 1.1, 1.2, 1.3, 2, 3],
          [1/1.3, 1/1.2, 1/1.1, 1, 1.1, 1.2, 1.3, 2],
          [1/2, 1/1.3, 1/1.2, 1/1.1, 1, 1.1, 1.2, 1.3],
          [1/3, 1/2, 1/1.3, 1/1.2, 1/1.1, 1, 1.1, 1.2],
          [1/4, 1/3, 1/2, 1/1.3, 1/1.2, 1/1.1, 1, 1.1],
          [1/5, 1/4, 1/3, 1/2, 1/1.3, 1/1.2, 1/1.1, 1],
        ],
      };
      const criteriaRank = [
        [1, 2, 3, 4, 5, 6, 7, 8],
        [1/2, 1, 2, 3, 4, 5, 6, 7],
        [1/3, 1/2, 1, 2, 3, 4, 5, 6],
        [1/4, 1/3, 1/2, 1, 2, 3, 4, 5],
        [1/5, 1/4, 1/3, 1/2, 1, 2, 3, 4],
        [1/6, 1/5, 1/4, 1/3, 1/2, 1, 2, 3],
        [1/7, 1/6, 1/5, 1/4, 1/3, 1/2, 1, 2],
        [1/8, 1/7, 1/6, 1/5, 1/4, 1/3, 1/2, 1],
      ];
      decision = global.window.runCalculation(items, criteria, criteriaItemRank, criteriaRank);
    });

    it('should return the same criteria labels as before we refactored the code', () => {
      expect(decision.criteria.labels).to.deep.equal(["a: 0.327", "b: 0.227", "c: 0.157", "d: 0.108", "e: 0.073", "f: 0.050", "g: 0.034", "h: 0.024"]);
    });

    it('should return the same criteria series as before we refactored the code', () => {
      expect(decision.criteria.series).to.deep.equal([
        [0.32676396153638365, 0.22733952078634456, 0.1568538723405026, 0.1076622200039086, 0.07340363714633524, 0.0497957781951383, 0.03401528595376355, 0.024165724037623383]
      ]);
    });

    it('should return the same rankings labels as before we refactored the code', () => {
      expect(decision.rankings.labels).to.deep.equal(["s: 0.304", "t: 0.206", "u: 0.150", "v: 0.112", "w: 0.083", "x: 0.062", "y: 0.046", "z: 0.038"]);
    });

    it('should return the same rankings series as before we refactored the code', () => {
      expect(decision.rankings.series).to.deep.equal([
        [0.005381647969389549, 0.004317207717720081, 0.0035459438080971514, 0.003016441915755587, 0.002548030150857254, 0.002147195088206895, 0.001772080682866625, 0.0014371767047302417],
        [0.006721713974419934, 0.005101990407408824, 0.005001100765759493, 0.004633262473824086, 0.004315065461074303, 0.003741469870619209, 0.0031255899688455097, 0.001375093031812189],
        [0.010394919583979185, 0.0072062131036256605, 0.006421741119714073, 0.007081362027019315, 0.006853850797979043, 0.006300464797427629, 0.0037910195819996803, 0.0017462071833937152],
        [0.0169745935416875, 0.011735319701406156, 0.0098097629578485, 0.009050029982911992, 0.010035377196239237, 0.00762301800219523, 0.005317749707204256, 0.002857786056842377],
        [0.02817939233168709, 0.019476090270761047, 0.015533350856031953, 0.013556643886003623, 0.009619617142670397, 0.008992527681876295, 0.0071189054197550485, 0.005185692415123153],
        [0.0463945891929684, 0.0319648305124316, 0.0248432189570497, 0.01710957674724437, 0.011670453367740172, 0.0077124146806564495, 0.009041525786560317, 0.008117263095851613],
        [0.07473591122365517, 0.05152241002987365, 0.034446151603111284, 0.023333854748847648, 0.015629834624104697, 0.010159848186951216, 0.006273313986623571, 0.011238196383177336],
        [0.11484007232328504, 0.07433126246177019, 0.049998284529915886, 0.03387764958623124, 0.02276995507336502, 0.015033834658774723, 0.009712503513469662, 0.006200399389571895],
      ]);
    });
  });
});
