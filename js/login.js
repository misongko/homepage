const loginId = document.getElementById("loginId");
const loginPwd = document.getElementById("loginPwd");

const loginCheck = () => {
  const userLists = JSON.parse(localStorage.getItem("userLists"));

  if (loginId.value === "admin") {
    if (loginPwd.value === "adm1234!") {
      // console.log("로그인성공");
      open("check_user_lists.html", "_self");

      // 로그인된 사용자의 id 저장
      // class ConnectedUser {
      //   constructor(id) {
      //     this.id = id;
      //   }
      // }
      // const saveConnectedUser = () => {
      //   const idVal = registerId.value;

      //   const connectedUser = new ConnectedUser(idVal);
      //   console.log(connectedUser);

      //   const data = JSON.stringify(connectedUser);
      //   console.log(data);

      // localStorage.setItem("connectedUser", data);
      // };
    } else {
      // console.log("로그인 실패1");
      alert("회원정보가 없습니다. 아이디와 비밀번호를 정확히 입력해주세요");
    }
  } else {
    // console.log("로그인 실패2");
    alert("회원정보가 없습니다. 아이디와 비밀번호를 정확히 입력해주세요");
  }
};

login.onclick = () => {
  loginCheck();
};

loginId.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    loginCheck();
  }
});

loginPwd.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    loginCheck();
  }
});
