
- a brief history of my JS experience
   - JS -> -> jQuery ->  Dojo (briefly) -> jQuery again -> Emberjs / Angular (very briefly) / Knockout ->  jQuery + Handlebars (3 years) -> Vue.js
- I want a Toyota Camry not a Lamborghini
- writing front-ends can be extremely time-consuming

 
 
### Vue 
- characterize: a mature, reactive framework with a lot of support (95k stars on GH; 17k SO questions for vuejs; 8.5k SO questions for vuejs2,  SO questions answered quickly, OReilly and Manning books; Reactjs has 96k stars on github and 86k SO questions, Angular 113k SO questions). Parts are very similar to Angular and React. It really is just a view layer as opposed to Ember https://vuejs.org/v2/guide/comparison.html
- Vuejs customers: 
- Best Features:
  - scalable developer productivity (less DOM handling and event handlers, better code structure - code). Supports the less code is better mantra.
  - rich internal ecosystem (vue-devtools, linting, vue-bootstrap)
  - rich external ecosystem (webpack, babel!!! - es6 -> es5)
  - traction / documentation
  - handles common CRUD applications well
  - handles complex forms well
  - seems to work well with other components (jQuery, animation libraries, webpack and associated ecosystem)
  - easily approachable
-  Downsides:
  - different programming style. working in it today but 1 - 2 months. The complexities that arise also exist in 
- Some caveats for Aerserv / Inmobi
  - webpacker gem > Rails 4.2  
  - need to have standard JSON shapes as you are not creating objects
- rather than focus on the dom and looking for changes there, reactive frameworks look at the `data` and re-render when that changes. The most productive style is to have a payload in the mounted lifecyle hook. 
  Tend to have larger JSON payloads and the shape matters. Like any large, upfront payload system, you might need to check whether you have stale data if critical and to ensure you are not overwriting. 
- A quick tour of main features
  - Data Reactivity
    - Observer Pattern
    - https://github.com/vuejs/vue/blob/7a145d86430bad65271f4d6ab1344b215fefe52a/src/core/observer/index.js#L63 
    - https://github.com/vuejs/vue/blob/7a145d86430bad65271f4d6ab1344b215fefe52a/src/core/observer/index.js#L73
    - reactivity
      - Virtual DOM - also used by React and Ember 
      - uses .sync to update
      - advantage is that rather than writing 1000 updates to the DOM, you can batch your updates to the Virtual DOM and then do a single update
      - data - for it to be reactive, it should be declared here!
        - getter / setter conversion occurs during instance initalization
    - two-way data binding = v-model example
  - components
    - think of them as functions (what they are) 
  - vuex for state management
  - vue-router



vue-cli 
yarn serve; will compile file into es5 compatible and auto-injected (this can vary across implementations)
webpack - very fast moving piece. Up to 4
package.json
vue inspect
access via $vm in the console

integration - can kinda play well with jQuery
Rails - webpacker has first class support for webpack

Source Code:
in typescript
src/core/observer/dep.js
src/core/observer/watcher.js
src/core/observer/traverse.js
src/core/observer/array.js
src/core/instance/lifecycle.js
