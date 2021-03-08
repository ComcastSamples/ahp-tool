import chartist from 'chartist'
import AHP from 'ahp'
import zipWith from 'lodash-es/zipWith'
import unzip from 'lodash-es/unzip'

var iAmSuchAHack = function(myItems, myCriteria, myCriteriaItemRank, myCriteriaRank) {

  var ahpContext = new AHP();

	ahpContext.import({
	  items: myItems,
		criteria: myCriteria,
		criteriaItemRank: myCriteriaItemRank,
		criteriaRank: myCriteriaRank,
	});

	let output = ahpContext.debug();

	const criteria = Object.keys(output.itemRankMetaMap);
	const criteriaWeights = output.criteriaRankMetaMap.weightedVector;
	const alternatives = Object.keys(output.rankedScoreMap);
	const alternativesTotalScores = output.rankedScores;

	// Score of each alternative ranking with respect to each criteria multiplied by the criteria's weight.
	// When you add up _these_ totals for each alternative, you end up with the same value as the alternative's total score.
	const alternativesPriorityMatrix = [];
	output.rankingMatrix.forEach((alternativeScores, alternativeIndex) => {
	  const scoresMultipliedByCriteriaWeight = [];
	  alternativeScores.forEach((alternativeCriteriaScore, criteriaIndex) => {
	    scoresMultipliedByCriteriaWeight[criteriaIndex] = alternativeCriteriaScore * criteriaWeights[criteriaIndex];
	  });
	  alternativesPriorityMatrix[alternativeIndex] = scoresMultipliedByCriteriaWeight.reverse();
	});

	// Adjusting the label names rendered in the chart
	const criteriaLabels = criteria.map(label => {
	  if (label == 'Performant') {
	    return 'Performance';
	  }
	  if (label == 'Syn_l10n') {
	    return 'Syndication/ Localization';
	  }
	  if (label == 'CommunityDevExp') {
	    return 'Community + Productivity';
	  }

	  return label;
	});

	const criteriasWithScores = zipWith(criteriaLabels, criteriaWeights, (criteria, score) => {
	  return `${criteria}: ${Number.parseFloat(score).toFixed(3)}`;
	});

	const alternativesWithScores = zipWith(alternatives, alternativesTotalScores, (alternative, score) => {
	  return `${alternative}: ${Number.parseFloat(score).toFixed(3)}`;
	});

	return {
		criteria: {
			labels: criteriasWithScores,
			series: [criteriaWeights],
		},
		rankings: {
			labels: alternativesWithScores,
			series: unzip(alternativesPriorityMatrix),
		},
	}
}

window.chartist = chartist;
window.runCalculation = iAmSuchAHack;
