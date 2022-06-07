const registerName = document.getElementById("registerName");
const registerId = document.getElementById("registerId");
const registerPwd1 = document.getElementById("registerPwd1");
const registerPwd2 = document.getElementById("registerPwd2");
const registerEmail = document.getElementById("registerEmail");
const dobDay = document.getElementById("dobDay");
const dobMonth = document.getElementById("dobMonth");
const dobYear = document.getElementById("dobYear");

const nameGuideArea = document.getElementById("nameGuideArea");
const nameGuideLine = document.getElementById("nameGuideLine");

const idGuideArea = document.getElementById("idGuideArea");
const idGuideLine = document.getElementById("idGuideLine");
const idCheck = document.getElementById("idCheck");
const idCheckArea = document.getElementById("idCheckArea");

const pwd1GuideArea = document.getElementById("pwd1GuideArea");
const pwd1GuideLine1 = document.getElementById("pwd1GuideLine1");
const pwd1GuideLine2 = document.getElementById("pwd1GuideLine2");
const pwd2GuideArea = document.getElementById("pwd2GuideArea");
const pwd2GuideLine = document.getElementById("pwd2GuideLine");

const emailCheck = document.getElementById("emailCheck");
const emailCheckArea = document.getElementById("emailCheckArea");

const privacyAgree = document.getElementById("privacyAgree");

const inputArr = [
  registerName,
  registerId,
  registerPwd1,
  registerPwd2,
  registerEmail,
  dobDay,
  dobMonth,
  dobYear,
];
const checkArr = [
  nameGuideLine,
  idGuideLine,
  idCheck,
  pwd1GuideLine1,
  pwd1GuideLine2,
  pwd2GuideLine,
  emailCheck,
];

/**
 * 비번에 아이디가 포함되는지 확인
 */
const isIdPwdEqual = () => {
  if (registerPwd1.value.indexOf(registerId.value) !== -1) {
    if (registerId.value == "")
      showValidationResult(pwd1GuideLine2, "success", "아이디 사용 제외");
    else showValidationResult(pwd1GuideLine2, "fail", "아이디 사용 제외");
  } else {
    showValidationResult(pwd1GuideLine2, "success", "아이디 사용 제외");
  }
};

/**
 * 유효성 검사 결과 출력
 */
const showValidationResult = (input, result, msg) => {
  if (result === "fail") {
    input.firstElementChild.innerHTML = "&#10060";
  } else {
    input.firstElementChild.innerHTML = "&#9989";
  }
  input.className = result;
  input.lastElementChild.innerHTML = msg;
};

/**
 * 유효성 검사 통과 여부에 따라 input태그 색상 변경
 */
const inputStyle = (input, color) => {
  input.style.borderBottom = `3px solid ${color}`;
};

registerName.addEventListener("input", (e) => {
  // 재입력하게 되는 경우, 앞서 유효성검사 통과해서 숨김처리해놓은 가이드라인 다시 드러냄
  nameGuideArea.className = "";

  const val = e.target.value;
  const regExp = /^[가-힣]{2,}$/;

  if (!regExp.test(val)) {
    showValidationResult(nameGuideLine, "fail", "한글 2자 이상");
    inputStyle(registerName, "red");
  } else {
    showValidationResult(nameGuideLine, "success", "한글 2자 이상");
    inputStyle(registerName, "blue");
  }
});

registerName.addEventListener("blur", (e) => {
  if (nameGuideLine.className === "success") nameGuideArea.className = "hide";
});

// 키보드 입력없이 마우스로 복붙했을 경우에도 유효성 검사할 수 있도록 이벤트속성 'input' 사용
registerId.addEventListener("input", (e) => {
  idGuideArea.className = "";
  idCheckArea.className = "hide";
  const val = e.target.value;
  const regExp1 = /^[a-z\d]{6,12}$/;
  const regExp2 = /[a-z]/;
  const regExp3 = /[\d]/;

  if (!(regExp1.test(val) && regExp2.test(val) && regExp3.test(val))) {
    showValidationResult(
      idGuideLine,
      "fail",
      "영어(소문자), 숫자 조합 6~12자  (특수문자 사용 불가)"
    );
    inputStyle(registerId, "red");
  } else {
    showValidationResult(
      idGuideLine,
      "success",
      "영어(소문자), 숫자 조합 6~12자  (특수문자 사용 불가)"
    );
    inputStyle(registerId, "blue");
  }

  // 비번 입력한 후 아이디 변경 시, 비번과 아이디 일치 여부 재확인
  isIdPwdEqual();
});

registerId.addEventListener("blur", (e) => {
  const val = e.target.value;
  // 아이디 유효성검사가 완료된 후, 아이디 중복 여부 확인
  if (idGuideLine.className === "success") {
    idGuideArea.className = "hide"; // 유효성검사 가이드 숨기기

    const userLists = JSON.parse(localStorage.getItem("userLists"));

    const idArr = [];
    if (userLists !== null) {
      [...userLists].forEach(function (userList, index) {
        const { id } = userList;
        idArr.push(id);
      });
    } else {
      idCheckArea.className = "hide";
      idCheck.className = "success";
    }

    if (idArr.indexOf(val) === -1) {
      // console.log("not중복아이디");
      idCheckArea.className = "hide";
      idCheck.className = "success";
      inputStyle(registerId, "blue");
    } else {
      // console.log("중복아이디");
      idCheckArea.className = "";
      showValidationResult(idCheck, "fail", "이미 존재하는 아이디입니다.");
      inputStyle(registerId, "red");
    }
  }
});

registerPwd1.addEventListener("input", (e) => {
  // 비번 재입력 시, 앞서 유효성검사 통과해서 숨김처리 해놓은 가이드라인 다시 드러내기
  pwd1GuideArea.className = "";

  const val = e.target.value.trim();
  const regExp1 = /^[a-zA-Z\d!&/\\*@]{8,16}$/;
  const regExp2 = /[a-zA-Z]/;
  const regExp3 = /\d/;
  const regExp4 = /[!&/\\*@]/;

  if (
    !(
      regExp1.test(val) &&
      regExp2.test(val) &&
      regExp3.test(val) &&
      regExp4.test(val)
    )
  ) {
    showValidationResult(
      pwd1GuideLine1,
      "fail",
      "영문, 숫자, 특수문자(!&/\\*@) 조합 (8~16자)"
    );
  } else {
    showValidationResult(
      pwd1GuideLine1,
      "success",
      "영문, 숫자, 특수문자(!&/\\*@) 조합 (8~16자)"
    );
  }

  // 비번에 아이디 포함되어있는지 확인
  isIdPwdEqual();

  // 비번 유효성검사1&2 모두 통과 시, input태그 색상 결정
  if (
    pwd1GuideLine1.className === "success" &&
    pwd1GuideLine2.className === "success"
  )
    inputStyle(registerPwd1, "blue");
  else {
    inputStyle(registerPwd1, "red");
  }

  // 비번 확인 입력창이 비어있지 않으면, 비번 일치 여부 재확인
  if (registerPwd2.value !== "") {
    isPwdEqual();
  }
});

/**
 * 2번의 비번 입력값이 일치하는지 확인
 */
const isPwdEqual = () => {
  const pwd1 = registerPwd1.value.trim();
  const pwd2 = registerPwd2.value.trim();

  if (pwd1 !== pwd2) {
    pwd2GuideArea.className = "";
    showValidationResult(
      pwd2GuideLine,
      "fail",
      "비밀번호가 일치하지 않습니다."
    );
    inputStyle(registerPwd2, "red");
  } else {
    showValidationResult(pwd2GuideLine, "success", "비밀번호가 일치합니다.");
    inputStyle(registerPwd2, "blue");
  }
};

registerPwd1.addEventListener("blur", (e) => {
  if (
    pwd1GuideLine1.className === "success" &&
    pwd1GuideLine2.className === "success"
  )
    pwd1GuideArea.className = "hide";
});

registerPwd2.addEventListener("input", (e) => {
  isPwdEqual();
});

registerPwd2.addEventListener("blur", (e) => {
  if (pwd2GuideLine.className === "success") pwd2GuideArea.className = "hide";
});

// 비번 보기/숨기기 버튼
const pwdShowHide = document.querySelectorAll(".pwd-show-hide");
pwdShowHide.forEach(function (btn) {
  btn.addEventListener("click", (e) => {
    if (btn.previousElementSibling.type === "password") {
      btn.previousElementSibling.type = "text";
      e.target.innerHTML = "숨기기";
    } else {
      btn.previousElementSibling.type = "password";
      e.target.innerHTML = "보기";
    }
  });
});

registerEmail.addEventListener("blur", (e) => {
  const val = e.target.value;
  const regExp = /^[\w]{4,}@[\w]+(\.[\w]+){1,3}$/;

  if (!regExp.test(val)) {
    showValidationResult(emailCheck, "fail", "이메일을 정확하게 입력하세요.");
    inputStyle(registerEmail, "red");
  } else {
    emailCheck.className = "success";
    inputStyle(registerEmail, "blue");
  }

  if (emailCheck.className === "success") {
    emailCheckArea.className = "hide";
  } else {
    emailCheckArea.className = "";
  }
});

const dobArr = [dobYear, dobMonth, dobDay];
dobArr.forEach(function (el) {
  el.addEventListener("blur", (e) => {
    const val = e.target.value;
    if (val === "") {
      e.target.style.borderBottom = "3px solid red";
    } else {
      e.target.style.borderBottom = "3px solid blue";
    }
  });
});

class UserList {
  constructor(name, id, pwd, email, birth, datetime = Date.now()) {
    this.name = name;
    this.id = id;
    this.pwd = pwd;
    this.email = email;
    this.birth = birth;
    this.datetime = datetime;
  }
}

const saveUserList = () => {
  const nameVal = registerName.value;
  const idVal = registerId.value;
  const pwdVal = registerPwd2.value;
  const emailVal = registerEmail.value;
  const birthVal = `${dobYear.value}/${dobMonth.value}/${dobDay.value}`;

  const userList = new UserList(nameVal, idVal, pwdVal, emailVal, birthVal);

  const userLists = JSON.parse(localStorage.getItem("userLists")) || [];
  userLists.push(userList);

  const data = JSON.stringify(userLists);

  localStorage.setItem("userLists", data);

  alert("회원가입이 성공적으로 완료되었습니다.");
  open("index.html", "_self");

  // document.registerFrm.reset();

  // inputArr.forEach(function (el) {
  //   el.style.borderBottom = "";
  // });
};

document.registerFrm.onsubmit = (e) => {
  // input태그 입력 안 되어 있으면 스타일 적용
  inputArr.forEach(function (el) {
    if (el.value.length === 0) inputStyle(el, "red");
  });

  let msg;
  checkArr.forEach(function (el) {
    if (el.className !== "success") {
      e.preventDefault();
      msg = "필수정보를 모두 입력해주세요.";
    }
  });
  if (msg !== undefined) alert(msg);

  if (dobDay.value === "" || dobMonth.value === "" || dobYear.value === "")
    e.preventDefault();

  if (privacyAgree.checked !== true) {
    e.preventDefault();
    alert("개인정보 수집 및 이용에 동의하셔야 회원가입이 가능합니다.");
  }
};
