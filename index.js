const inputElement = document.querySelector("#user__search");
const listElemet = document.querySelector("#user__list");
const listAllElement = document.querySelector("#list__all");
const listAttended = document.querySelector("#list__attended");
const listTrash = document.querySelector("#list__thash");

//const nameElement = document.querySelector("#user__name");
//const trashButton = document.getElementById("#icon-trash");

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
                        <i class="fas fa-trash content__main__list__row__icons__itens" onclick="sendUserTrash('${user.name}')"></i>   
                        <i class="fas fa-th content__main__list__row__icons__itens" onclick="alert('clicou todos')"></i>  
                        <i class="fas fa-check content__main__list__row__icons__itens" onclick="alert('${user.id}')"></i>  
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
    alert();
  });
  listAttended.addEventListener("click", event =>{
    alert();
  });
  listTrash.addEventListener("click", event =>{
    alert();
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

function sendUserTrash(userName){
  let arrTrash = ["dolor","ipsum"];
  arrTrash.push(userName);
  
  console.log(arrTrash);
  
  arrTrash.map(user => {
    console.log('xxx'); 
    userListRender(filterUsersBySearchValue(userName));
  });
}


userListRender(users);
search();
