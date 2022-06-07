let cnt = 0;
userCheck.onclick = () => {
  const adminName = prompt("회원정보 열람을 위해 관리자명을 입력해주세요.");
  const adminSpecialPwd = prompt(
    "회원정보 열람을 위해 관리자전용 비밀번호를 입력해주세요."
  );
  if (adminSpecialPwd === "kh123456") {
    const userLists = JSON.parse(localStorage.getItem("userLists"));

    document.getElementById("userCheckDataName").style.display = "block";
    document.getElementById("userCheckData").style.display = "block";
    if (cnt >= 5) {
      document.getElementById(
        "userCheckData"
      ).innerHTML = `<div>${adminName}. ${datetimeFormatter(Date.now())}</div>`;
      cnt = 0;
    } else {
      document.getElementById(
        "userCheckData"
      ).innerHTML += `<div>${adminName}. ${datetimeFormatter(
        Date.now()
      )}</div>`;
    }
    cnt++;
    renderGuestbook(userLists);
  } else {
    alert("비밀번호 오류입니다. 로그인창으로 돌아갑니다.");
    open("login.html", "_self");
  }
};

const renderGuestbook = (
  userLists = JSON.parse(localStorage.getItem("userLists"))
) => {
  document.getElementById("userListsTb").style.display = "block";
  if (!userLists) return;
  const tbody = document.querySelector("#userListsTb tbody");
  tbody.innerHTML = "";

  userLists
    .map((userList, index) => {
      const { name, id, pwd, email, birth, datetime } = userList;
      return `<tr>
              <td>${index + 1}</td>
              <td>${name}</td>
              <td>${id}</td>   
              <td>${pwd}</td>      
              <td>${email}</td>      
              <td>${birth}</td>  
              <td>${datetimeFormatter(datetime)}</td>    
            </tr>`;
    })
    .forEach((tr) => {
      tbody.insertAdjacentHTML("afterbegin", tr);
    });
};

const datetimeFormatter = (millis) => {
  const d = new Date(millis);
  const f = (n) => (n < 10 ? "0" + n : n);

  const yyyy = d.getFullYear();
  const mm = f(d.getMonth() + 1);
  const dd = f(d.getDate());
  const hh = f(d.getHours());
  const mi = f(d.getMinutes());

  return `${yyyy}/${mm}/${dd} ${hh}:${mi}`;
};
