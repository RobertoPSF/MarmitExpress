import './style.css'
import logo from '/logo.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <img src="${logo}" class="logo" alt="Vite logo" />
    <h1>MarmitExpress</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
  
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
