const inputElement = document.querySelector("#user__search");
const listElemet = document.querySelector("#user__list");
const listAllElement = document.querySelector("#list__all");
const sideBarIconEment = document.querySelector("#sideBar__icon");
const sideBarElement = document.querySelector("#sideBrar");
const toastElement = document.querySelector("#toast");
const tooltipElement = document.querySelector(".tooltiptext")

const arrTrash = [];
const arrAttended = [];

//A função renderiza a lista de usuários 
function userListRender(userList) {
    const list  = `
        <ul class="content__main__list">
            ${userList.map(user =>
            `
                <li class="content__main__list__row">
                    <div class="content__main__list__row_user"><img class="content__main__list__row__photo" src="${user.photo}"> </div>
                    <div id="user__name" class="content__main__list__row__name content__main__list__row_user"> <a  class="content__main__list__row_user__link" href="./userModule/person.html?id=${user.id}"> ${user.name} </a></div>
                    <div class="content__main__list__row_user">${user.email} <span hidden class="tooltiptext">${user.email}</span></div>
                    <div class="content__main__list__row_user">${user.phone}</div>
                    <div class="content__main__list__row_user">${user.city}</div>
                    <div class="content__main__list__row_user">
                        <i class="fas fa-trash content__main__list__row__icons__itens all-list-trash" onclick="sendUserTrash('${JSON.stringify(user).split('"').join("&quot;")}')"></i>   
                        <i class="fas fa-th content__main__list__row__icons__itens" onclick="changeList()"></i>  
                        <i class="fas fa-check content__main__list__row__icons__itens" onclick="sendUserAttend('${JSON.stringify(user).split('"').join("&quot;")}')"></i>  
                    </div>
                </li>                   
            `
            ).join('')}
        </ul>
    `;
    listElemet.innerHTML = list;
}

function openSidebar(){
  sideBarIconEment.addEventListener("click", event =>{
   const showSideBar = sideBarElement.style.display;
    if (showSideBar != "block"){
      sideBarElement.style.display = "block";
   }else{
      sideBarElement.style.display = "none";
   }
  });
}

function changeList(){
  listAllElement.addEventListener("click", event =>{
    userListRender(users);
  });

  hideElement.addEventListener("click",event =>{
    hideElement.style.display = "none";
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
  let userObject = JSON.parse(userData);
  let checkId = arrTrash.find(user => user.id === userObject.id);

  if (checkId === undefined){
    arrTrash.push(userObject);
    saveToStorage('list-trash', arrTrash);
   
  }else{
    return creatToast('lixeira');
  }
}

function sendUserAttend(userData){
  let userObject = JSON.parse(userData);
  let checkId = arrAttended.find(user => user.id === userObject.id);

  if (checkId === undefined){
    arrAttended.push(userObject);
    saveToStorage('list-attended', arrAttended);
  }else{
    return creatToast('usuários atendidos');
  }
}

function creatToast(status){
  const toast = `
    <label>
      <i class="fas fa-exclamation-triangle"></i>
      <spam>Este item já esta na lista ${status}</spam>
    </label>
  `;
  toastElement.innerHTML = toast;

  toastElement.className = 'toast_style'
  setTimeout(function(){toastElement.className ='content__toast' }, 2000);
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

function tooltip(){
  tooltipElement.addEventListener("click" , event => {
    tooltipElement.style.display = "flex";
  });
}

userListRender(users);
search();
