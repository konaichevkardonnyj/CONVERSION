const inputRub = document.querySelector('#rub');
const inputUsd = document.querySelector('#usd');
inputRub.addEventListener('input',()=>{
	const request = new XMLHttpRequest();

	request.open('GET', 'js/current.json');
	request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	request.send();

	request.addEventListener('readystatechange', ()=>{
		if (request.readyState === 4 && request.status === 200) {
			const date = JSON.parse(request.response);
			inputUsd.value = (+inputRub.value / date.current.usd).toFixed(2);
		} else {
			inputUsd.value = "Нет ответа"
		}
	})
})