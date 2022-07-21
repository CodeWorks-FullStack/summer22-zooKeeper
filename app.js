// TODO remembering how to code 
// TODO for loop => forEach loop
// TODO draw functions and connecting DOM elements and JavaScript templates
// TODO what is the the elm variable
// TODO understanding when to make empties ('holding variables')
// TODO inserting data into strings
// TODO banana words and where to find them
 console.log('Time to make some animals happy, and make a fat stack of cash while were at it.');

//  NOTE dictionary (just a object) used to organize animals
 const animals = {
  koko : {
    emoji: '🦍',
    hunger: 100,
    status: 'happy',
  },
  marty: {
    emoji: '🐍',
    hunger: 100,
    status: 'happy'
  },
  fred: {
    emoji: '🐧',
    hunger: 100,
    status: 'happy'
  },
  frank: {
    emoji: '🦜',
    hunger: 100,
    status: 'hungery'
  },
  puppy:{
    emoji: '🐳',
    hunger: 100,
    status: 'happy'
  },
  george: {
    emoji: '🐙',
    hunger: 100,
    status: 'happy'
  },
  arnold: {
    emoji: '🦢',
    hunger: 100,
    status: 'happy'
  },
  susan: {
    emoji: '🦥',
    hunger: 100,
    status: 'happy'
  },
  reggie: {
    emoji: '🐖',
    hunger: 100,
    status: 'happy'
  },
  melvin: {
    emoji: '🐢',
    hunger: 100,
    status: 'happy'
  }
 }
 let money = 0

 function drawAnimals(){
  // create template
  // iterate over collection trying to draw
  // add to template
  // put template into html
  // NOTE create empty to build upon later
  let template = ''
  for(let key in animals){
    // debugger
    let animal = animals[key]
    // console.log(key, animal);
    // NOTE build html into our template above
    template += `
    <div id="${key}" class="col-4 border border-5 border-secondary p-0"> 
      <div class="pen">
          <marquee behavior="alternate" direction="right" scrolldelay="${Math.random()*1000}">
            <marquee behavior="alternate" direction="up" scrolldelay="${Math.random()*1000}">
              <h2 class="animal happy" onclick="feed('${key}')">
                ${animal.emoji}
              </h2>
            </marquee>
          </marquee>
        </div>
        <div class="progress">
          <div class="progress-bar bg-danger" role="progressbar" aria-label="Danger example" style="width: ${animal.hunger}%"
            aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">${animal.hunger}</div>
        </div>
        <p class="bg-dark text-light text-center m-0"><b>${key} | <span class="status">${animal.status}</span></b></p>
      </div>
      `
      // console.log(template);
      // NOTE grab piece of the page
      let pensElm = document.getElementById('pens')
      // console.log(pensElm);
      // NOTE inject our template we built into the piece of the page we grabbed
      pensElm.innerHTML = template
  }
 }
 function drawMoney(){
  // @ts-ignore
  document.getElementById('money').innerText = money
  // @ts-ignore
  document.getElementById('cha-ching').play()
 }

 function updateAnimal(name){
  let animal = animals[name]
  if(animal.hunger > 100){
    animal.status = 'over fed'
  } else if(animal.hunger > 60){
    animal.status = 'happy'
  } else if( animal.hunger > 20){
    animal.status = 'hungry'
  } else if ( animal.hunger > 0){
    animal.status = 'sick'
  } else {
    animal.status = 'dead'
  }
  let animalElm = document.getElementById(name)
  console.log(animal, animalElm);
  // NOTE query selecting on animalElm lets us look at a smaller piece of the page to grab the progress bar
  let hungerBar = animalElm.querySelector('progress-bar')
  console.log(hungerBar);
  // update progress bar
  hungerBar.style.width = `${animal.hunger}%`
  hungerBar.innerText = animal.hunger
  // update status text
  let statusText = animalElm.querySelector('.status')
  statusText.innerText = animal.status
  // update animal
  let animoji = animalElm?.querySelector('.animal')
  switch(animal.status){
    case 'over fed':
      animoji?.classList.add('over-fed')
      break;
    case 'happy':
      animoji?.classList.remove('over-fed')
      animoji?.classList.add('happy')
    break;
    case 'hungry':
      animoji?.classList.remove('happy')
      animoji?.classList.add('hungry')
      break;
    case 'sick': 
    animoji?.classList.remove('hungry')
    animoji?.classList.add('sick')
    break;
    case 'dead':
      animoji?.classList.remove('sick')
      animoji.innerText = '👻'
      break;
  }


 }

 function hunger(){
  // iterate over collection
  // decrease hunger of animal
  // update animal status
  for(let key in animals){
    let animal = animals[key]
    animal.hunger -= 10
    if(animal.hunger < 0){
      animal.hunger = 0
    }
    updateAnimal(key)
  }
  // drawAnimals()
 }

 function feed(key){
   let animal = animals[key]
   console.log('feeding',key, animal);
   if(animal.status != 'dead'){
     animal.hunger += 3
     if(animal.hunger > 120){
       animal.hunger = 120
      }
      // drawAnimals()
      updateAnimal(key)
    }
 }

 function getMoney(){
  let cash = 0
  for(let key in animals){
    let animal = animals[key]
    if(animal.status != 'dead'){
      switch(animal.status){
        case 'happy': cash += 10
        break;
        case 'over fed': cash += 8
        break;
        case 'hungry': cash += 5
        break;
        case 'sick': cash += 1
        break;
        default: console.error('you will never financially recover this.')
      }
    }
  }
  money += cash
  drawMoney()
 }

// NOTE we don't invoke hunger cause we just want to provide it as instructions for the interval to run later, not run now.
 setInterval( hunger, 3000)
 setInterval(getMoney, 10000)

//  NOTE including a function call on the index will run it when the page loads
 drawAnimals()
