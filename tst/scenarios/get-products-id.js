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
    
	let res = http.get('http://localhost:5000/api/products/2')
    
	Reqs.add(1);
    Duration.add(res.timings.duration);
    FailRate.add(res.status !== 200);
    SuccessRate.add(res.status === 200);

    var result = check(res, {
		'Is status 200': (r) => r.status === 200,
        'Duration': (r) => r.timings.duration < 2000,
    })
	
	if (!result) {
		ErrorsCheck.add(1)
	}
    
    sleep(1);
}