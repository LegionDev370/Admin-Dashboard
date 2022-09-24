let template = findELement("#template").content;

let tbody = findELement("#tbody");

let sortedBtn = findELement("#sorted-btn");

let modalSort = findELement("#modal-sort");

let selectAlephabit = findELement("#select-alephabit");

let selectOnline = findELement("#select-with-online");

let dataClone = data;

let modalFooter = findELement(".modal-footer");

let priorityFilter = findELement("#priority-filter");

let prioritySelect = findELement("#priority-select");

let resetBtn = findELement("#reset-btn");

let closeBtn = findELement("#close-btn");

let closeBtnModalHeader = findELement("#close");

let ticketsPage = findELement(".tickets-page");

let ticketsPageLink = findELement(".tickets-page-link");

let mainWrapper = findELement(".main-wrapper-right-content");

let searchBtn = findELement("#search-btn");

let searchInput = findELement(".search");

//selecting elements////

let filtrLastOnline = [];

let filtrLastOnlineRev = [];

let deafultArray = [];

let filtrSortingAlephabit = [];

let filtrSortingAlephabitRev = [];

searchBtn.onclick = function () {
  this.style.display = "none";
  searchInput.classList.add("search-active")
  if(searchInput.style.display === "none"){
    searchInput.style.display = "block"
  }
  searchInput.addEventListener("input", (event) => {
    let filtrNames = [];
    filtrNames = dataClone.forEach((element) => {
      if (element.name.toLowerCase().includes(event.target.value)) {
        filtrNames.push(element);
        addComponentsPage(filtrNames, 25);
      }
    });
  });
  searchInput.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
      searchInput.style.display = "none";
      searchBtn.style.display = "block";
    }
  })
};

function addComponentsPage(array, number) {
  tbody.innerHTML = "";
  for (let i = 0; i < array.length / number; i++) {
    let component = template.cloneNode(true);
    let userText = findELement("#user-text", component);
    let userName = findELement("#user-name", component);
    let userOnlineTime = findELement("#user-online-time", component);
    let userDateRegistration = findELement(
      "#user-date-registration",
      component
    );
    let userDateTimeReg = findELement("#user-date-time-reg", component);
    let userPriority = findELement("#user-priority", component);
    let avatarUsername = findELement("#avatar-username", component);
    let userEditBtn = findELement("#user-edit-btn", component);
    let currentPriority = findELement("#priority", component);
    let saveBtnChange = findELement("#save-btn-change", component);
    let changePriority = findELement("#change-priority", component);
    let extraMenu = findELement(".extra-menu", component);
    let priorityDeleteBtn = findELement("#delete-btn", component);
    priorityDeleteBtn.dataset.type = array[i].date_of_onliine;
    saveBtnChange.dataset.type = array[i].priority;
    userEditBtn.dataset.type = array[i].priority;

    currentPriority.textContent = array[i].priority;

    if (currentPriority.textContent === "high") {
      currentPriority.classList.add("priority-high");
    } else {
      if (currentPriority.textContent === "normal") {
        currentPriority.classList.add("priority-normal");
      } else {
        if (currentPriority.textContent === "low") {
          currentPriority.classList.add("priority-low");
        }
      }
    }
    userEditBtn.onclick = function () {
      if (userEditBtn.dataset.type === array[i].priority) {
        extraMenu.classList.add("extra-menu-active");
        userEditBtn.classList.add("edit-btn-none");
      }
    };

    priorityDeleteBtn.onclick = function () {
      let deleteBtnData = priorityDeleteBtn.dataset.type;
      let filter = array.filter((element) => {
        return deleteBtnData !== element.date_of_onliine;
      });
      addComponentsPage(filter, 25);
    };

    function userEditBtnFunc(saveBtn, array) {
      saveBtn.onclick = function () {
        if (changePriority.value !== "") {
          array.filter((element) => {
            if (saveBtn.dataset.type === array[i].priority) {
              return (element.priority = changePriority.value);
            }
            addComponentsPage(array, 25);
          });
        } else {
          alert("Please writing");
        }
      };
      changePriority.addEventListener("keydown", function (evt) {
        if (evt.key === "Enter") {
          if (changePriority.value !== "") {
            array.filter((element) => {
              if (saveBtn.dataset.type === array[i].priority) {
                return (element.priority = changePriority.value);
              }
              addComponentsPage(array, 25);
            });
          } else {
            alert("Please writing");
          }
        }
      });
    }
    userEditBtnFunc(saveBtnChange, dataClone);

    avatarUsername.src = `${array[i].ava}`;
    userText.textContent = array[i].text;
    userName.textContent = array[i].name;
    userPriority.textContent = array[i].priority;
    let priorityText = userPriority.textContent;
    userOnlineTime.textContent = array[i].date_of_onliine;
    userDateRegistration.textContent = array[i].date_of_register;
    userDateTimeReg.textContent = array[i].time;

    function userPriorityFunc(user) {
      if (user === "low") {
        userPriority.className = "btn-low";
      } else if (user === "normal") {
        userPriority.className = "btn-normal";
      } else if (user === "high") {
        userPriority.className = "btn-high";
      }
    }
    userPriorityFunc(priorityText);

    tbody.appendChild(component);
  }
}

sortedBtn.onclick = function () {
  modalSort.classList.add("modal-active");
};

addComponentsPage(dataClone, 25);

modalFooter.addEventListener("click", (e) => {
  if (e.target.id === "btn-save") {
    if (selectAlephabit.value === "a > z") {
      function sort(a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      }
      dataClone.sort(sort);
      filtrSortingAlephabit = dataClone;
      addComponentsPage(filtrSortingAlephabit, 25);
    } else {
      if (selectAlephabit.value === "z > a") {
        function reverseSort(a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        }
        dataClone.sort(reverseSort);
        filtrSortingAlephabitRev = dataClone;
        addComponentsPage(filtrSortingAlephabitRev, 25);
      } else {
        if (selectAlephabit.value === "Default select") {
          addComponentsPage(dataset, 25);
        }
      }
    }
    if (selectOnline.value === "last seen online") {
      dataClone.sort(
        (a, b) =>
          Number(a.time.replace(":", ".").substring(0, a.time.length - 3)) -
          Number(b.time.replace(":", ".").substring(0, b.time.length - 3))
      );
      filtrLastOnline = dataClone;
      addComponentsPage(filtrLastOnline, 25);
    } else {
      if (selectOnline.value === "last seen online reverse") {
        dataClone.sort(
          (a, b) =>
            Number(b.time.replace(":", ".").substring(0, b.time.length - 3)) -
            Number(a.time.replace(":", ".").substring(0, a.time.length - 3))
        );

        filtrLastOnlineRev = dataClone;
        addComponentsPage(filtrLastOnlineRev, 25);
      }
    }
    modalSort.classList.remove("modal-active");
  }
  if (e.target.id === "btn-close") {
    modalSort.classList.remove("modal-active");
  }
});

closeBtnModalHeader.onclick = function () {
  modalSort.classList.remove("modal-active");
};

priorityFilter.onclick = function () {
  prioritySelect.classList.add("priority-select-active");
  resetBtn.classList.add("reset-btn-active");
  closeBtn.classList.add("close-btn-active");

  resetBtn.onclick = function () {
    addComponentsPage(dataClone, 25);
    prioritySelect.value = "select";
  };
  closeBtn.onclick = function () {
    this.parentNode.removeChild(closeBtn);
    resetBtn.classList.remove("reset-btn-active");
    prioritySelect.classList.remove("priority-select-active");
  };
  prioritySelect.addEventListener("change", (e) => {
    if (e.target.value === "high") {
      let filterPriority = dataClone.filter((element) => {
        return e.target.value === element.priority;
      });
      addComponentsPage(filterPriority, 5);
    } else {
      if (e.target.value === "normal") {
        let filterPriority = dataClone.filter((element) => {
          return e.target.value === element.priority;
        });
        addComponentsPage(filterPriority, 5);
      } else {
        if (e.target.value === "low") {
          let filterPriority = dataClone.filter((element) => {
            return e.target.value === element.priority;
          });
          addComponentsPage(filterPriority, 5);
        }
      }
    }
  });
};

ticketsPage.onclick = function () {
  ticketsPageLink.classList.add("tickets-page-link-active");
  mainWrapper.classList.toggle("main-wrapper-right-content-active");
  this.classList.add("tickets-page-active");
};
