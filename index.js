const inputElement = document.querySelector("#user__search");
const listElement = document.querySelector("#user__list");
const sideBarIconEment = document.querySelector("#sideBar__icon");
const sideBarElement = document.querySelector("#sideBar");
const toastElement = document.querySelector("#toast");

const trashStatus = 'Trash';
const attendedStatus = 'Attendend';

var listAllElement = document.querySelector("#list__all");
var listAttendedElement = document.querySelector("#list__attended"); 
var listTrashElement = document.querySelector("#list__thash");
var iconTrash = "icon_visible";
var iconAttended = "icon_visible";

function userList(arrList){
  saveToStorage(arrList);
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
                        <i id="${iconTrash}" class="all-list-trash fas fa-trash content__main__list__row__icons__itens ${getClassSelectorByUserStatus(user.status,trashStatus)}" onclick="changeUserStatus('${user.id}','${trashStatus}')"></i>   
                        <i class="fas fa-th content__main__list__row__icons__itens " onclick="changeList()"></i>  
                        <i id="${iconAttended}" class="fas fa-check content__main__list__row__icons__itens ${getClassSelectorByUserStatus(user.status,attendedStatus)}" onclick="changeUserStatus('${user.id}','${attendedStatus}')"></i>  
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

  const arrUser = getToStorage();
  userListRender(arrUser);
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

function changeUserStatus(userId,status){
  const arrUsers = getToStorage();

  const newUserArr = arrUsers.map(user =>{
    if(user.status === status){
      creatToast('toast_warning','Este item já esta na lista!');
    }
    else if(user.id === userId){
      creatToast('toast_success','Usuário mudou de status!');
      return {...user, status: user.status = status}
    }
    return {...user}
  });
  saveToStorage(newUserArr);
}

function renderTrash(){
  if (iconAttended === 'icon_invisible')
    iconAttended = 'icon_visible';
  
  iconTrash = 'icon_invisible';

  listAllElement.setAttribute('id','list__item__no__select'); 
  listTrashElement.setAttribute('id','list__item__select'); 
  listAttendedElement.setAttribute('id','list__item__no__select');

  const arrUsers = getToStorage();
  const trashUsers = arrUsers.filter(user => user?.status === trashStatus);

  if (trashUsers.length === 0)
    creatToast('toast_warning','A lixeira está vazia !');
  else
    userListRender(trashUsers);
}

function renderAttended(){
  if (iconTrash === 'icon_invisible')
    iconTrash = 'icon_visible';

  iconAttended = 'icon_invisible';
  listAllElement.setAttribute('id','list__item__no__select'); 
  listTrashElement.setAttribute('id','list__item__no__select'); 
  listAttendedElement.setAttribute('id','list__item__select');

  const arrUsers = getToStorage();
  const attendedUsers = arrUsers.filter(user => user?.status === attendedStatus);

  if(attendedUsers.length === 0)
    creatToast('toast_warning','A lista de atendidos está vazia !');
  else
  userListRender(attendedUsers);   
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

function getClassSelectorByUserStatus(userStatus, status){
  if(userStatus === trashStatus && status === trashStatus){
    return 'trash-selected'
  }
  if(userStatus === attendedStatus && status === attendedStatus){
    return 'attended-selected'
  }
  return 'item_no_selected'
}

function saveToStorage(data){
  localStorage.setItem('list-users', JSON.stringify(data));
}

function getToStorage(){
  return JSON.parse(localStorage.getItem('list-users'));
}

userList(users);
userListRender(getToStorage('list-users'));
search();
