// Color Sticks

let arrStick = [];
const ls = localStorage;
const stickBox = document.querySelector('.stick-box');
const textar = document.querySelector('.add-stick');
const btn = document.querySelector('.bstick');
const editBtn = document.querySelector('.edit');
let verification = -1; // для редагування елемента в масиві

editBtn.addEventListener('click', edit);
btn.addEventListener('click', create);

if (ls.getItem('data')) { // повернення з local Storage, якщо є ключ
  arrStick = JSON.parse(ls.getItem('data')); // відкриваю local storage
  for (let i = 0; i < arrStick.length; i++) { // прокручую цілий масив з елементами 
    const linkStick = document.createElement('a'); // створюю елемент
    linkStick.href = '#';
    linkStick.classList.add('a-1');
    linkStick.textContent = arrStick[i]; // елемент приймає значення збереження з сховища 
    linkStick.style.backgroundColor = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;

    linkStick.addEventListener('click', function (e) { // кожен новий елемент має повішаний клік
      e.preventDefault(); // забороняю стандартні дії
      if (verification !== -1) { // якщо не -1 то вибраний елемент в масиві котрий буде редагуватися
        arrStick[verification] = textar.value; //  вибраному елементу = значення з текстареа
        linkStick.textContent = textar.value; // новоствореному елементу теж = значення з текстареа
        ls.setItem('data', JSON.stringify(arrStick)); // записуюю відредактований масив в local Storage
        verification = -1; // міняю значення на -1, щоб показати що не вибраний жоден елемент
        textar.value = ''; // після вводу даних очищаю поле вводу
      } else { // якщо не вибраний елемент до редагування, то 
        textar.value = linkStick.textContent; // значення з нашого елементу запишеться в поле текст ареа
        verification = i; // установлюємо значення індекса котрий редагується, для подальго запису після змін в масив
      }
    });

    linkStick.addEventListener('dblclick', function (e) {  // Подвійний клі запускає функцію видалення елемента з масива та елемента на екрані в inner
      e.preventDefault();
      del(this); // функція видалення
    })
    stickBox.appendChild(linkStick); // додавання елемента в inner
  }
}

function create() {
  const textId = textar.value.trim(); // текстареа + усування пробілів 

  if (verification >= 0) { // перевірка. Якщо вибраний елемент, то будемо редагувати
    const linkStick = stickBox.children[verification]; // вибраний елемент масива
    linkStick.textContent = textId; // присвоюю текст з текстареа
    linkStick.style.backgroundColor = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
    arrStick[verification] = textId; // сам елемент в масиві теж приймає нове значення і міняється.
    ls.setItem('data', JSON.stringify(arrStick)); // записав новий масив
    verification = -1; // відпустив вибраний елемент 
  } else { // інакше якщо не вибраний елемент до редагування, то просто створюю новий елемент 
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

function edit() { // функція редагування існуючого елемента
  if (verification !== -1) { // якщо вибраний елемент і значення не -1 
    arrStick[verification] = textar.value; // то міняю значення елемента масива на значення прописане в текстареа
    const editLinkStick = stickBox.querySelectorAll('.a-1')[verification]; // записую в константу елемент на сторінці котрий буде редагуватися
    editLinkStick.textContent = textar.value; // в цей елемент записую нове значення 
    ls.setItem('data', JSON.stringify(arrStick)); // записуюю новий масив в local Storage
    verification = -1; // міняю на дефолтне значення (не вибраний елемент)
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

function random(min, max) { // функція рандому для кольорів стікерів
  return Math.floor(Math.random() * (max - min + 1));
}