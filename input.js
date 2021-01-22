function butotnClick(){
  const html = `
  <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${task}</span>
      <i class="far fa-trash-alt delete"></i>
  </li>
  `;

  list.innerHTML += html;
}

let button = document.getElementById('btn');
button.addEventListener('click', butotnClick);
