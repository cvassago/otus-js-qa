function kolobok(name) {
	let result = '';

	switch (name) {
		case 'Дедушка':
			result = 'Я от дедушки ушёл';
			break;
		case 'Заяц':
			result = 'Я от зайца ушёл';
			break;
		case 'Лиса':
			result = 'Меня съели';
			break;
	}
	return result;
}

function newYear(name) {
	let result = '';

	if (name === 'Дед Мороз' || name === 'Снегурочка') {
		result = `${name}!`.repeat(3);
	}
	return result;
}

//-----kolobok------
console.group('Kolobok');
console.log(kolobok('Дедушка'));
console.log(kolobok('Заяц'));
console.log(kolobok('Лиса'));
console.groupEnd();

//-----newYear------
console.group('newYear');
console.log(newYear('Дед Мороз'));
console.log(newYear('Снегурочка'));
console.groupEnd();
