import "@babel/polyfill";
import axios from "axios";

const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};
const showAlert = (type, message, delayed) => {
  hideAlert();
  const markup = `<div class="alert alert__${type}">${message}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  if (delayed === true) window.setTimeout(hideAlert, 25000);
  window.setTimeout(hideAlert, 3000);
};

// DOM QUERIES
const menubtn = document.querySelector(".menu-btn");
const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");
const logout = document.querySelector("#logout");
const paginationList = document.querySelector(".pagination__list");
// const bookingForm = document.querySelector('#reservation-form');
const searchBar = document.querySelector("#search-bookings-form");
const getAvlbBtn = document.querySelector("#av-btn");
const availabilityForm = document.querySelector("#availability-form");
const downloadBtn = document.querySelector("#export");
const deleteBtn = document.querySelector("#deleteOne");
// const updateBtn = document.querySelector('#updateOne');
// DOM MANIPULATION

// MENU MARKUP

if (menubtn) {
  menubtn.addEventListener("click", () => {
    toggler(".menu", "show");
    toggler(".menu-btn", "close");
  });
}
if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    downloadCSV();
  });
}
if (deleteBtn) {
  const id = window.location.href.split(/\//)[4];
  deleteBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    deleteOneBook(id);
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    const password = document.querySelector('input[name="password"]').value;
    const email = document.querySelector('input[name="email"]').value;
    if (password.length < 8) {
      showAlert("error", "Invalid Password Length");
    }
    e.preventDefault();
    login(email, password);
  });
}
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    const firstname = document.querySelector('input[name="firstname"]').value;
    const lastname = document.querySelector('input[name="lastname"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector(
      'input[name="confirmPassword"]'
    ).value;
    const email = document.querySelector('input[name="email"]').value;
    if (password !== confirmPassword) {
      showAlert("error", "Passwords do not match");
    }
    const reg = /^[a-zA-Z]*$/;
    if (reg.test(firstname) === false) {
      showAlert("error", "Firstname must only be letters");
    }
    if (reg.test(lastname) === false) {
      showAlert("error", "Lastname must only be letters");
    }
    e.preventDefault();
    register(firstname, lastname, password, confirmPassword, email);
  });
}
if (logout) {
  logout.addEventListener("click", () => {
    logoutFunction();
  });
}

if (searchBar) {
  searchBar.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchParam = document.querySelector('input[name="search-input"]')
      .value;
    const input = capitalizeLet(searchParam);
    // return;
    searchByHallname(input);
  });
}
if (availabilityForm) {
  availabilityForm.addEventListener("submit", (e) => {
    const from = document.querySelector('input[name="from"]').value;
    const to = document.querySelector('input[name="to"]').value;
    const hallname = document.querySelector('select[name="hallname"]').value;
    e.preventDefault();
    const res = getAvailableDates(from, to, hallname);
    Promise.resolve(res).then((data) => {
      const dates = data.data;
      if (dates.length > 0) {
        const trans = dates.map(
          (el) =>
            `${new Date(el[0]).toDateString()} - ${new Date(
              el[1]
            ).toDateString()}`
        );
        let str = "<li>";
        trans.forEach((date) => {
          str += `<p class='para'>Available From: <span>${date}</span> </p>`;
        });
        str += "</li>";
        const results = document.querySelector(".results-ul");
        return (results.innerHTML = str);
      } else {
        showAlert("error", "No dates available");
        let str = "<li>No dates available </li>";
        return (document.querySelector(".results-ul").innerHTML = str);
      }
    });
  });
}

const toggler = (selector, className) => {
  const doc = document.querySelector(selector);
  return doc.classList.toggle(className);
};

if (getAvlbBtn) {
  getAvlbBtn.addEventListener("click", () => toggler(".hidden", "show"));
}

const markup = (num) => {
  return `<li class="page__link"><a href=/bookings?page=${num}>${num}</a></li>`;
};
const getCount = async (url) => {
  const res = await axios(
    {
      method: "GET",
      url: url,
    },
    { withCredentials: true }
  );
  const data = res.data;
  return data.data.count;
};
if (paginationList) {
  const docs = getCount(
    `${location.protocol}//${location.host}/api/v1/bookings${location.search}`
  );
  Promise.resolve(docs).then((count) => {
    const numberPerPage = 30;
    const arrOfPages = range(1, Math.ceil(count / numberPerPage));
    arrOfPages.forEach((el) => {
      paginationList.innerHTML += markup(el);
    });
  });
}
//  END DOM MANIPULATION

// FUNCTIONS
const login = async (email, password) => {
  try {
    const res = await axios(
      {
        method: "POST",
        url: `${location.protocol}//${location.host}/api/v1/auth/login`,
        data: { email, password },
      },
      { withCredentials: true }
    );
    if (res.status === 200) {
      localStorage.setItem("user_delete_id", res.data.id);
      showAlert("success", "Login successful, redirecting...");
      location.assign("/");
    } else {
      return showAlert("error", "Incorrect email or password");
    }
  } catch (error) {
    showAlert("error", error.response.data.error);
  }
};
const register = async (
  firstname,
  lastname,
  password,
  confirmPassword,
  email
) => {
  try {
    const res = await axios(
      {
        method: "POST",
        url: `${location.protocol}//${location.host}/api/v1/auth/signup`,
        data: { firstname, lastname, password, confirmPassword, email },
      },
      { withCredentials: true }
    );
    if (res.status === 201) {
      showAlert("success", "Registeration successful, redirecting...");
      location.assign("/login");
    }
  } catch (error) {
    showAlert("error", error.response.data.error);
  }
};
const logoutFunction = async () => {
  try {
    const res = await axios({
      method: "POST",
      url: `${location.protocol}//${location.host}/api/v1/auth/logout`,
    });
    if (res.status === 204) {
      localStorage.clear();
      showAlert("success", "Logout successful, redirecting...");
      window.setTimeout(() => {
        location.assign("/login");
      }, 1000);
    }
  } catch (error) {
    showAlert("error", error.response.data.error);
  }
};

function range(start, end) {
  let arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}
async function createOneBook(options) {
  try {
    showAlert("success", "Reservation processing, please wait.... ", true);
    const res = await axios(
      {
        method: "POST",
        url: `${location.protocol}//${location.host}/api/v1/bookings`,
        data: { ...options },
      },
      {
        withCredentials: true,
      }
    );
    console.log(res);
    if (res.status === 201) {
      showAlert("success", "Booking successful");
      window.setTimeout(() => {
        location.assign("/bookings");
      }, 1500);
    }
  } catch (error) {
    console.log(error);
    if (error.response.status === 11000) {
      showAlert("error", error.response.data.error);
    } else {
      showAlert("error", error.response.data.error);
    }
  }
}

const searchByHallname = (input) => {
  try {
    showAlert("success", "Redirecting...");
    location.assign(`/bookings?hallname=${input}`);
  } catch (error) {
    showAlert("error", "Invalid input!");
  }
};
const getAvailableDates = async (from, to, hallname) => {
  try {
    const res = await axios(
      {
        method: "GET",
        url: `${location.protocol}//${location.host}/api/v1/bookings/getavailability/halls/${hallname}/from/${from}/to/${to}`,
      },
      { withCredentials: true }
    );

    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
    showAlert("error", error.response.data.error);
  }
};
const downloadCSV = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${location.protocol}//${location.host}/api/v1/download`,
    });
    if (res.status == 200) {
      window.open("/bookings.csv");
    }
  } catch (error) {
    showAlert("error", "File not downloaded");
  }
};

const deleteOneBook = async (id) => {
  try {
    const res = await axios(
      {
        method: "DELETE",
        url: `${location.protocol}//${location.host}/api/v1/bookings/${id}`,
      },
      {
        withCredentials: true,
      }
    );
    if (res.status === 204) {
      showAlert("success", "Reservation Deleted, redirecting.... ");
      window.setTimeout(() => {
        location.assign("/bookings");
      }, 1000);
    }
  } catch (error) {
    showAlert("error", error.response.data.error);
  }
};
const updateOneBook = async (id, options) => {
  try {
    const res = await axios(
      {
        method: "PATCH",
        url: `${location.protocol}//${location.host}/api/v1/bookings/${id}`,
        data: { ...options },
      },
      { withCredentials: true }
    );
    if (res.status === 201) {
      showAlert("success", "Update successful, redirecting....");
      window.setTimeout(() => {
        location.assign("/bookings");
      }, 1000);
    }
  } catch (error) {
    showAlert("error", error.response.data.error);
  }
};
function capitalizeLet(str) {
  return str
    .split(" ")
    .map((el) => el[0].toUpperCase() + el.substring(1).toLowerCase())
    .join(" ");
}
