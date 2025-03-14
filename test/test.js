import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
    vus: 10,
    duration: '10s',
}

export default function () { 
    const url = 'http://localhost:8081/api/cars'
    const response = http.get(url)
    const cars = response.json()

    check(response, {
        'Status is 200': (r) => r.status === 200,
        'Contains exactly 21 cars': () => cars.length === 21,
        'Car 1 is Toyota Corolla': (r) => cars[0].model === 'Corolla' && cars[0].brand === 'Toyota',
    })

    sleep(1)
}

import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'
export function handleSummary(data) {
    return {
        "./report/index.html": htmlReport(data),
    }
}