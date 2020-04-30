const inputElement = document.querySelector("#user__search");
const listElemet = document.querySelector("#user__list");
const listAllElement = document.querySelector("#list__all");

//const nameElement = document.querySelector("#user__name");
//const trashButton = document.getElementById("#icon-trash");

//const arrTrash = JSON.parse(window.localStorage.getItem('list-trash'));


const arrTrash = [];
const arrAttended = [];


function userListRender(userList) {
    const list  = `
        <ul class="content__main__list">
            ${userList.map(user =>
            `
                <li class="content__main__list__row">
                    <div class="content__main__list__row_user"><img class="content__main__list__row__photo" src="${user.photo}"> </div>
                    <div id="user__name" class="content__main__list__row__name content__main__list__row_user"> <a href="./userModule/person.html?id=${user.id}"> ${user.name} </a></div>
                    <div class="content__main__list__row_user">${user.email}</div>
                    <div class="content__main__list__row_user">${user.phone}</div>
                    <div class="content__main__list__row_user">${user.city}</div>
                    <div class="content__main__list__row_user">
                        <i class="fas fa-trash content__main__list__row__icons__itens" onclick="sendUserTrash('${JSON.stringify(user).split('"').join("&quot;")}')"></i>   
                        <i class="fas fa-th content__main__list__row__icons__itens" onclick="alert('clicou todos')"></i>  
                        <i class="fas fa-check content__main__list__row__icons__itens" onclick="sendUserAttend('${JSON.stringify(user).split('"').join("&quot;")}')"></i>  
                    </div>
                </li>                   
            `
            ).join('')}
        </ul>
    `;
    listElemet.innerHTML = list;
}

function changeList(){
  listAllElement.addEventListener("click", event =>{
    userListRender(users);
  });
}

function search() {
  inputElement.addEventListener("input", event =>{
    let value = event.target.value.toLowerCase();
    userListRender(filterUsersBySearchValue(value));
  });
}

function filterUsersBySearchValue(searchValue) {
  return users.filter(item =>
    item.name.toLowerCase().indexOf(searchValue) !== -1 || item.email.toLowerCase().indexOf(searchValue) !== -1
  );
}

function sendUserTrash(userData){
  
  arrTrash.push(JSON.parse(userData));
  saveToStorage('list-trash', arrTrash);
  console.log(userData);
  
  /*
  const userObject = JSON.parse(userData);
  const checkId = arrTrash.find(user => user.id === userObject.id);
    console.log(checkId);
  if (checkId == false){
     }else{
    return alert("Usuário já esta na lista");
  }
*/
}

function sendUserAttend(userData){
  arrAttended.push(JSON.parse(userData));
  saveToStorage('list-attended', arrAttended);
  console.log(userData);
}

function renderTrash(){
  const userTrash = getToStorage('list-trash');
  userListRender(userTrash);
}

function renderAttended(){
  const userAttended = getToStorage('list-attended');
  userListRender(userAttended);
}

function saveToStorage(item, data){
  localStorage.setItem(item, JSON.stringify(data));
}

function getToStorage(item){
  return JSON.parse(localStorage.getItem(item));
}

userListRender(users);
search();
