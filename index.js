const inputElement = document.querySelector("#user__search");
const listElemet = document.querySelector("#user__list");
const nameElement = document.querySelector("#user-name");
//const trashButton = document.getElementById("#icon-trash");

function userListRender(userList) {
    const list  =   `
        <ul class="content__main__list">
            ${userList.map(user =>
            `
                <li class="content__main__list__row">
                    <div class="content__main__list__row_user"><img class="content__main__list__row__photo" src="${user.photo}"> </div>
                    <div id="user-name" class="content__main__list__row__name content__main__list__row_user"> <a href="./userModule/person.html"> ${user.name} </a></div>
                    <div class="content__main__list__row_user">${user.email}</div>
                    <div class="content__main__list__row_user">${user.phone}</div>
                    <div class="content__main__list__row_user">${user.city}</div>
                    <div class="content__main__list__row_user">
                        <i id="icon-trash" class="fas fa-trash content__main__list__row__icons__itens "></i>   
                        <i id="icon-all" class="fas fa-th content__main__list__row__icons__itens"></i>  
                        <i id="icon-attended" class="fas fa-check content__main__list__row__icons__itens"></i>  
                    </div>
                </li>                   
            `
            ).join('')}
        </ul>
    `;
    listElemet.innerHTML = list;
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




userListRender(users);
search();