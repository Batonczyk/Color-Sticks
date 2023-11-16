// Color Sticks

let arrStick = [];
const ls = localStorage;
const stickBox = document.querySelector('.stick-box');
const textar = document.querySelector('.add-stick');
const btn = document.querySelector('.bstick');
const editBtn = document.querySelector('.edit');
let verification = -1; 

editBtn.addEventListener('click', edit);
btn.addEventListener('click', create);

if (ls.getItem('data')) { 
  arrStick = JSON.parse(ls.getItem('data')); 
  for (let i = 0; i < arrStick.length; i++) { 
    const linkStick = document.createElement('a'); 
    linkStick.href = '#';
    linkStick.classList.add('a-1');
    linkStick.textContent = arrStick[i]; 
    linkStick.style.backgroundColor = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;

    linkStick.addEventListener('click', function (e) { 
      e.preventDefault(); 
      if (verification !== -1) { 
        arrStick[verification] = textar.value; 
        console.log(verification)
        linkStick.textContent = textar.value; 
        ls.setItem('data', JSON.stringify(arrStick)); 
        verification = -1; 
        textar.value = ''; 
      } else { 
        textar.value = linkStick.textContent; 
        verification = i; 
        console.log(verification)
      }
    });

    linkStick.addEventListener('dblclick', function (e) {  
      e.preventDefault();
      del(this); 
    })
    stickBox.appendChild(linkStick); 
  }
}

function create() {
  const textId = textar.value.trim(); 

  if (verification >= 0) { 
    const linkStick = stickBox.children[verification]; 
    linkStick.textContent = textId; 
    linkStick.style.backgroundColor = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
    arrStick[verification] = textId; 
    ls.setItem('data', JSON.stringify(arrStick)); 
    verification = -1; 
  } else { 
    const linkStick = document.createElement('a');
    linkStick.href = '#';
    linkStick.classList.add('a-1');
    linkStick.textContent = textId;
    linkStick.style.backgroundColor = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;

    linkStick.addEventListener('click', function (e) {
      e.preventDefault();
    });

    if (textId) {
      stickBox.appendChild(linkStick);
      arrStick.push(textId);
      ls.setItem('data', JSON.stringify(arrStick));
    }
  }

  textar.value = '';
}

function edit() { 
  if (verification !== -1) { 
    arrStick[verification] = textar.value; 
    const editLinkStick = stickBox.querySelectorAll('.a-1')[verification]; 
    editLinkStick.textContent = textar.value; 
    ls.setItem('data', JSON.stringify(arrStick)); 
    verification = -1;
    textar.value = '';
  }
}

function del(elem) {
  elem.remove();
  if (ls.getItem('data')) {
    arrStick = JSON.parse(ls.getItem('data'));
    const ind = arrStick.indexOf(textar);
    arrStick.pop();
    
    if (ind !== -1) {
      arrStick.splice(ind, 1);
    }
  }
  ls.setItem('data', JSON.stringify(arrStick));
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}