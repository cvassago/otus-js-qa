/**
 * Подсчет суммы баллов
 *
 * @param {...nameStudent: number} scores
 * @returns {number}
 */

function getScore(scores = {}) {
	let sum = 0;

	for (let key in scores) {
		if (typeof scores[key] === 'number' && scores[key] >= 0) {
			sum += scores[key];
		} else {
			return -1;
		}
	}
	return sum;
}

const scores = {
	Anna: 10,
	Olga: 1,
	Ivan: 5,
};
console.log(getScore(scores));

const scores1 = {
	Anna: 10,
	Olga: 1,
	Ivan: '5',
};
console.log(getScore(scores1));

const scores2 = {};
console.log(getScore(scores2));
