const inputElement = document.querySelector("#user__search");
const listElement = document.querySelector("#user__list");
const sideBarIconEment = document.querySelector("#sideBar__icon");
const sideBarElement = document.querySelector("#sideBar");
const toastElement = document.querySelector("#toast");

const testElement = document.querySelector("#icon_visible");

const arrTrash = [];
const arrAttended = [];

var listAllElement = document.querySelector("#list__all");
var listAttendedElement = document.querySelector("#list__attended"); 
var listTrashElement = document.querySelector("#list__thash");
var iconTrash = "icon_visible";
var iconAttended = "icon_visible";

function userList(arrList){
  let list = arrList;
  saveToStorage('list-users', list);
}

function userListRender(userList) {

    const list  = `
        <ul class="content__main__list">
            ${userList.map(user => 
            `
                <li class="content__main__list__row">
                    <div class="content__main__list__row_user"><img class="content__main__list__row__photo " src="${user.photo}"> </div>
                    <div id="user__name" class="content__main__list__row__name content__main__list__row_user"> <a  class="content__main__list__row_user__link" href="./userModule/person.html?id=${user.id}"> ${user.name} </a></div>
                    <div class="content__main__list__row_user">${user.email}</div>
                    <div class="content__main__list__row_user">${user.phone}</div>
                    <div class="content__main__list__row_user">${user.city}</div>
                    <div class="content__main__list__row_user">
                        <i id="${iconTrash}" class="all-list-trash fas fa-trash content__main__list__row__icons__itens" onclick="sendUserTrash('${JSON.stringify(user).split('"').join("&quot;")}')"></i>   
                        <i class="fas fa-th content__main__list__row__icons__itens " onclick="changeList()"></i>  
                        <i id="${iconAttended}" class="fas fa-check content__main__list__row__icons__itens" onclick="sendUserAttend('${JSON.stringify(user).split('"').join("&quot;")}')"></i>  
                    </div>
                </li>                   
            `
              ).join('')}
        </ul>
    `;
    listElement.innerHTML = list;
}

function openSidebar(){
  if (sideBarElement.className != 'sidebar__show')
    sideBarElement.className = 'sidebar__show';
  else
    sideBarElement.className = 'content__sidebar';
}

function changeList(){ 
  iconTrash = 'icon_visible';
  iconAttended = 'icon_visible';
  listAllElement.setAttribute('id','list__item__select'); 
  listTrashElement.setAttribute('id','list__item__no__select'); 
  listAttendedElement.setAttribute('id','list__item__no__select');

  userListRender(users);
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
  const idUserTrash = arrTrash.find(user => user.id === userObject.id);

  if (idUserTrash === undefined){
    arrTrash.push(userObject);
    setUserStatus(userObject,'lixeira');
    console.log(userObject);
    creatToast('toast_success','Usuário enviado para lista de lixeira !');
    saveToStorage('list-trash', arrTrash);

    removeItem(arrAttended,userObject.id);
    saveToStorage('list-attended', arrAttended);
  }else{
    return creatToast('toast_warning','Este item já esta na lista de lixeira !');
  }
}

function sendUserAttend(userData){
  let userObject = JSON.parse(userData);
  const idUserAttended = arrAttended.find(user => user.id === userObject.id);

  if (idUserAttended === undefined){
    arrAttended.push(userObject);
    setUserStatus(userObject,'atendidos');
    creatToast('toast_success','Usuário enviado para lista de atendidos !');
    saveToStorage('list-attended', arrAttended);

    removeItem(arrTrash,userObject.id);
    saveToStorage('list-trash', arrTrash);
  }else{
    return creatToast('toast_warning','Este item já esta na lista de usuários atendidos !');
  }
}

function removeItem(data, id) {
  let index = data.indexOf(id);
  data.splice(index,1);
};

function renderTrash(){
  if (iconAttended === 'icon_invisible')
    iconAttended = 'icon_visible';
  
  iconTrash = 'icon_invisible';

  listAllElement.setAttribute('id','list__item__no__select'); 
  listTrashElement.setAttribute('id','list__item__select'); 
  listAttendedElement.setAttribute('id','list__item__no__select');

  let userTrash = getToStorage('list-trash');
  if (userTrash === null){
    userTrash = '';  
    creatToast('toast_warning','A lixeira está vazia !');
  }else{
    userListRender(userTrash);
  }
}

function renderAttended(){
  if (iconTrash === 'icon_invisible')
    iconTrash = 'icon_visible';

  iconAttended = 'icon_invisible';
  listAllElement.setAttribute('id','list__item__no__select'); 
  listTrashElement.setAttribute('id','list__item__no__select'); 
  listAttendedElement.setAttribute('id','list__item__select');

  let userAttended = getToStorage('list-attended');
  if (userAttended === null){
    userAttended = '';  
    creatToast('toast_warning','A lista de atendidos está vazia !');
  }else{
    userListRender(userAttended);
  }
}

function creatToast(type,status){
  const toast = `
    <div>
      <i class="fas fa-exclamation-triangle"></i>
      <span>${status}</span>
    </div>
  `;
  toastElement.innerHTML = toast;
  toastElement.className = type;
  setTimeout(function(){toastElement.className ='content__toast' }, 3000);
}

function setUserStatus(data,status){
  data.flag = status;
}

function getUserStatus(data){
  if(data.flag === ''){
    iconAttended = "list__item__no__select";
    iconTrash = "list__item__no__select";
  } else if(data.flag === 'lixeira'){
    iconTrash = "list__item__select";
    iconAttended = "list__item__no__select";
  }else{
    iconAttended = "list__item__select";
    iconTrash = "list__item__no__select";
  }
}

function saveToStorage(item, data){
  localStorage.setItem(item, JSON.stringify(data));
}

function getToStorage(item){
  return JSON.parse(localStorage.getItem(item));
}

userList(users);
userListRender(getToStorage('list-users'));
search();
