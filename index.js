const inputElement = document.querySelector("#user__search");
const listElemet = document.querySelector("#render__main");

function userListRender(userList) {
    const list  =   `
        <ul class="content__main__list">
            ${userList.map(user =>
            `
                <li class="content__main__list__row">
                    <div><img class="content__main__list__row__photo" src="${user.photo}"> </div>
                    <div class="content__main__list__row__name content__main__list__row__users">${user.name}</div>
                    <div class="content__main__list__row__users">${user.email}</div>
                    <div class="content__main__list__row__users">${user.phone}</div>
                    <div class="content__main__list__row__users">${user.city}</div>
                    <div class="content__main__list__row__icons">
                        <i class="fas fa-trash content__main__list__row__icons__itens"></i>   
                        <i class="fas fa-th content__main__list__row__icons__itens"></i>  
                        <i class="fas fa-check content__main__list__row__icons__itens"></i>  
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
    item.name.toLowerCase().indexOf(searchValue) !== -1
  );
  }

userListRender(users);
search();