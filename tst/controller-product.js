import GetProducts from "./scenarios/get-products.js";
import GetProductsId from "./scenarios/get-products-id.js";
import PostProducts from "./scenarios/post-products.js";
import { group, sleep } from 'k6';

export const options = {
  scenarios: {
	  get: {
		executor: 'ramping-vus',
		startVUs: 1,
        stages: [
            { duration: '5s', target: 10 }, // 5VU para 10VU em 5s
            { duration: '0', target: 20 },  // Imediatamente saltar para 20VU
            { duration: '5s', target: 20 }, // Ficar com 20VU durante 5S
        ],		  
	  },
	  post: {
		executor: 'constant-vus',
		vus: 5,
		duration: '5s',		  
	  }
  },
  thresholds: {
    http_req_failed: ['rate<0.1'],                 // Erros < 10%
	http_req_duration: ['avg<3000', 'p(95)<6000'], // Média < 3S e 95% < 6s  
	checks: ["rate>0.99"]
  }
};

export default function get() {
    group('LoadTesting.Api - Controller Products - Get', () => {
		GetProducts();
		GetProductsId();
    });
	
	group('LoadTesting.Api - Controller Products - Post', () => {
		PostProducts();
    });
	
    sleep(1);
}