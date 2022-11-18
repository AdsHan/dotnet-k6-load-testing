import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Rate } from "k6/metrics";
import { check } from "k6";

export let ErrorsCheck = new Rate('api-erros_check');
export let Reqs = new Rate('api-reqs');
export let Duration = new Trend('api-duration');
export let FailRate = new Rate('api-fail_rate');
export let SuccessRate = new Rate('api-success_rate');

export default function () {
    
	var data = {
		"title": "Sandalia",
		"description": "Sandália Preta Couro Salto Fino",
		"price": 249.50,
		"quantity": 100       
	};
	
	let res = http.post('http://localhost:5000/api/products', JSON.stringify(data), {
		headers: { 'Content-Type': 'application/json' },
	});

	Reqs.add(1);
    Duration.add(res.timings.duration);
    FailRate.add(res.status !== 201);
    SuccessRate.add(res.status === 201);

    var result = check(res, {
		'Is status 201': (r) => r.status === 201,
        'Duration': (r) => r.timings.duration < 3000,
    })
	
	if (!result) {
		ErrorsCheck.add(1)
	}
    
    sleep(1);
}


