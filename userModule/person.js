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
    const url = new URL(urlParams);
    const id = url.searchParams.get("id");
    
    return  id;
}

function findUser(){
    const userList = users;
    let id = getParameters();
    const user = userList.find(user => user.id === id);

    userPhoto.innerHTML = `<img class="content__main__user__details__photo" src="${user.photo}">;` 

    return user;
}

function getName(){
    let userName = ` 
        <label class="content__main__user__information__data__letter">Hi, My name is: <br> <label class="content__main__user__information__data__letter__name">${findUser().name}</label></label>
        `
        userInfo.innerHTML = userName;
}

function getEmail(){
    let userMail = ` 
        <label class="content__main__user__information__data__letter">My email address is <br> <label class="content__main__user__information__data__letter__name">${findUser().email}</label></label>
        `
        userInfo.innerHTML = userMail;
}

function getDate(){
    let userMail = ` 
        <label class="content__main__user__information__data__letter">My email address is <br> <label class="content__main__user__information__data__letter__name">${findUser().email}</label></label>
        `
        userInfo.innerHTML = userMail;
}

function getAdress(){
    let userAdress = ` 
        <label class="content__main__user__information__data__letter">My addres is <br> <label class="content__main__user__information__data__letter__name">${findUser().address}</label></label>
        `
        userInfo.innerHTML = userAdress;
}

function getPhone(){
    let userPhone = ` 
        <label class="content__main__user__information__data__letter">My phone number is <br> <label class="content__main__user__information__data__letter__name">${findUser().phone}</label></label>
        `
        userInfo.innerHTML = userPhone;
}

function getPassword(){
    let userPassword = ` 
    <label class="content__main__user__information__data__letter">My password is <br> <label class="content__main__user__information__data__letter__name">${findUser().password}</label></label>
    `
    userInfo.innerHTML = userPassword;
}

findUser();
getParameters();
