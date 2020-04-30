const urlParams = window.location.href;
const userInfo = document.querySelector("#content-user");
const userPhoto = document.querySelector("#user-img");
const iconUser = document.querySelector("#info-user");
const iconMail = document.querySelector("#info-mail");
const iconDate = document.querySelector("#info-date");
const iconAddress = document.querySelector("#info-addres");
const iconPhone = document.querySelector("#info-phone");
const iconPassword = document.querySelector("#info-password");


function getParameters(){
    let url = new URL(urlParams);
    let id = url.searchParams.get("id");
    
    return  parseInt(id);
}

function renderUser(userList){

    let id = getParameters();
    let user = userList.find(user => user.id === id);

    userPhoto.innerHTML = `<img class="content__main__user__details__photo" src="${user.photo}">; `

    iconUser.addEventListener("mouseenter", event =>{
        let userName = ` 
        <label class="content__main__user__information__data__letter">Hi, My name is: <br> <label class="content__main__user__information__data__letter__name">${user.name}</label></label>
        `
        userInfo.innerHTML = userName;
    });

    iconMail.addEventListener("mouseenter", event =>{
        let userMail = ` 
        <label class="content__main__user__information__data__letter">My email address is <br> <label class="content__main__user__information__data__letter__name">${user.email}</label></label>
        `
        userInfo.innerHTML = userMail;
    });

    iconDate.addEventListener("mouseenter", event =>{
        let userDate = ` 
        <label class="content__main__user__information__data__letter">My birthday is <br> <label class="content__main__user__information__data__letter__name">${user.date}</label></label>
        `
        userInfo.innerHTML = userDate;
    });

    iconAddress.addEventListener("mouseenter", event =>{
        let userAdress = ` 
        <label class="content__main__user__information__data__letter">My addres is <br> <label class="content__main__user__information__data__letter__name">${user.address}</label></label>
        `
        userInfo.innerHTML = userAdress;
    });
    
    iconPhone.addEventListener("mouseenter", event =>{
        let userPhone = ` 
        <label class="content__main__user__information__data__letter">My phone number is <br> <label class="content__main__user__information__data__letter__name">${user.phone}</label></label>
        `
        userInfo.innerHTML = userPhone;
    });
    
    iconPassword.addEventListener("mouseenter", event =>{
        let userPassword = ` 
        <label class="content__main__user__information__data__letter">My password is <br> <label class="content__main__user__information__data__letter__name">${user.password}</label></label>
        `
        userInfo.innerHTML = userPassword;
    });
    
}

renderUser(users);
getParameters();
