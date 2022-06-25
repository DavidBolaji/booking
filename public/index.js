// calender dom Elements
const calenderCont = document.querySelector(".calender__container");
const calenderCal = document.querySelector(".calender__calender");
const calenderMnt = document.querySelector(".calender__month");
const calenderLftArrDiv = document.querySelector(".calender__left_arrow");
const calenderLftArr = document.querySelector(".fas.fa-angle-left");
const calenderMntGrp = document.querySelector(".calender__month_group");
const calenderMntGrpH1 = document.querySelector(".calender__month_group h1");
const calenderMntGrpP = document.querySelector(".calender__month_group p");
const calenderRhtArrDiv = document.querySelector(".calender__right_arrow");
const calenderRhtArr = document.querySelector(".fas.fa-angle-right");
const calenderWeekCont = document.querySelector(".calender__weekdays");
const calenderWeekDiv = document.querySelector(".calender__weekdays div");
const calenderDays = document.querySelector(".calender__days");
const calenderPrevDate = document.querySelector(".calender__prev_date");
const calenderDayDiv = document.querySelector(".calender__days div");
const calenderNextDate = document.querySelector(".calender__next_date");
const hallName = document.querySelector("#hallname");
const modal = document.querySelector(".modal");

// calender edit page
const calenderContEdit = document.querySelector(".calender__container_edit");
const calenderCalEdit = document.querySelector(".calender__calender_edit");
const calenderMntEdit = document.querySelector(".calender__month_edit");
const calenderLftArrDivEdit = document.querySelector(
  ".calender__left_arrow_edit"
);
const calenderLftArrEdit = document.querySelector(".fas.fa-angle-left");
const calenderMntGrpEdit = document.querySelector(
  ".calender__month_group_edit"
);
const calenderMntGrpH1Edit = document.querySelector(
  ".calender__month_group_edit h1"
);
const calenderMntGrpPEdit = document.querySelector(
  ".calender__month_group_edit p"
);
const calenderRhtArrDivEdit = document.querySelector(".calender__right_arrow");
const calenderRhtArrEdit = document.querySelector(".fas.fa-angle-right");
const calenderWeekContEdit = document.querySelector(".calender__weekdays_edit");
const calenderWeekDivEdit = document.querySelector(
  ".calender__weekdays_edit div"
);
const calenderDaysEdit = document.querySelector(".calender__days_edit");
const calenderPrevDateEdit = document.querySelector(
  ".calender__prev_date_edit"
);
const calenderDayDivEdit = document.querySelector(".calender__days_edt div");
const calenderNextDateEdit = document.querySelector(
  ".calender__next_date_edit"
);
const hallNameEdit = document.querySelector("#halname");
const modalEdit = document.querySelector(".modal");

// edit bookings page
if (calenderContEdit) {
  // calender edit
  const calenderEditController = (function () {
    let counter = 0;
    let date = new Date();
    let month = new Date().getMonth();
    let monthArr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let indexOfFirstDay = new Date(date.getFullYear(), month, 1).getDay();
    let lastDayIndex = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDay();
    let prevLatDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    let lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    // days of month
    let days = "";

    // booked data from database
    let databaseBooked = [];
    // booked db days
    let dbBookedDays = [];
    // booked start days
    let dbStartDays = [];

    let bookingDates = [];

    let booked = [];

    let multiple = [];

    let hall = "";

    let hallDetails = {
      TarabaHall: {
        hallname: "Taraba Hall",
        amount: 200000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 80000,
        discount: 0,
      },
      SulejaGarden: {
        hallname: "Suleja Garden",
        amount: 150000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 35000,
        discount: 0,
      },
      ExecutiveHallConference: {
        hallname: "Executive Hall Conference",
        amount: 1500000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 250000,
        discount: 0,
      },
      ExecutiveLounge: {
        hallname: "Executive Lounge",
        amount: 500000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 250000,
        discount: 0,
      },
      ExecutiveHallWedding: {
        hallname: "Executive Hall wedding",
        amount: 1800000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 250000,
        discount: 0,
      },
      OfficeSpace: {
        hallname: "Executive Hall Conference",
        amount: 120000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 50000,
        discount: 0,
      },
      BenueHall: {
        hallname: "Benue Hall",
        amount: 500000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 80000,
        discount: 0,
      },
      NigerHall: {
        hallname: "Niger Hall",
        amount: 500000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 80000,
        discount: 0,
      },
      BanquetHall: {
        hallname: "Banquet Hall",
        amount: 300000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 100000,
        discount: 0,
      },
      AsoHall: {
        hallname: "Aso Hall",
        amount: 700000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 100000,
        discount: 0,
      },
      ArcadeHall: {
        hallname: "Arcade Hall",
        amount: 250000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 70000,
        discount: 0,
      },
      AfricaHallConference: {
        hallname: "Africa Hall/Foyer Conference",
        amount: 4000000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 440000,
        discount: 0,
      },
      AfricaHallWedding: {
        hallname: "Africa Hall Wedding",
        amount: 5000000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 440000,
        discount: 0,
      },
      AfricaHallGalleria: {
        hallname: "Africa Hall Galleria",
        amount: 200000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 80000,
        discount: 0,
      },
    };

    return {
      updatePayment: function (data, daysdiff, disc = "") {
        let amount;
        if (disc !== "") {
          daysdiff - 1 > 1
            ? (amount =
                data.amount * (daysdiff - 1) -
                (disc / 100) * (data.amount * (daysdiff - 1)))
            : (amount = data.amount - (disc / 100) * data.amount);
        } else {
          amount = data.amount * daysdiff;
        }

        return {
          amount,
          charge: (10 / 100) * data.amount,
          vat: (7.5 / 100) * data.amount,
          refund: data.refund,
          total: amount + (10 / 100) * data.amount + (7.5 / 100) * data.amount,
          discount: data.discount + disc,
        };
      },

      getPayment: function (data) {
        // curPay = {}
        let foundHall = {};
        let newString = this.mergeStrings(data);
        for (const halls in hallDetails) {
          if (halls === newString) {
            foundHall = { ...hallDetails[halls] };
          }
        }
        let res = this.calcPayment(foundHall);
        curPay = { ...res };
        return res;
      },

      mergeStrings: function (data) {
        let name = data.split(" ");
        let newName = "";

        for (let n = 0; n < name.length; n++) {
          newName += name[n];
        }

        return newName;
      },
      calcPayment: function (data) {
        return {
          discount: 0,
          amount: data.amount,
          charge: (data.serviceCharge / 100) * data.amount,
          vat: (data.vat / 100) * data.amount,
          refund: data.refund,
          total:
            data.amount +
            (data.serviceCharge / 100) * data.amount +
            (data.vat / 100) * data.amount,
        };
      },

      setHall: function (data) {
        hall = data;
      },

      getHall: function () {
        return hall;
      },

      returnMultiple: function () {
        return multiple;
      },

      filterMultiple: function () {
        multiple = multiple?.filter((m) => {
          return m?.bookedFrom.split("-")[0] != "NaN";
        });
      },

      setMultiple: function (data) {
        const multipleID = Array.from(data.bookedFrom).map((div) => {
          return div.id;
        });

        console.log(multiple);

        multiple = multiple.filter((d) => {
          return d?.hallname !== hall;
        });

        if (bookingDates.length !== 1) {
          multiple.push({
            ...data,
            hallname: hall,
            clientPhoneNumber: data.clientTel,
            bookedFrom: this.convertWordToUtc(bookingDates[0]),
            bookedTo: this.convertWordToUtc(bookingDates[1]),
          });
        } else {
          multiple.push({
            ...data,
            hallname: hall,
            clientPhoneNumber: data.clientTel,
            bookedFrom: this.convertWordToUtc(multipleID[0]),
            bookedTo: this.convertWordToUtc(multipleID[0]),
          });
        }
      },

      submitData: async function (options) {
        try {
          const res = await axios(
            {
              method: "POST",
              url: `${location.protocol}//${location.host}/api/v1/bookings/many`,
              data: [...options],
            },
            {
              withCredentials: true,
            }
          );

          return res;
        } catch (error) {
          return "error";
        }
      },

      returnFilterAndStartDate: function () {
        return {
          dbBookedDays,
          dbStartDays,
        };
      },

      setDiv: function (div) {
        this.addBookedClass(div);
      },

      populateDbDays: function (daydiff, startDay) {
        let startDaySort = new Date(startDay);

        for (let i = 0; i <= daydiff; i++) {
          if (i === 0) {
            dbStartDays.push(this.convertUtctoWord(startDay));

            dbBookedDays.push(
              this.convertUtctoWord(
                startDaySort.setDate(startDaySort.getDate() + 0)
              )
            );
          } else {
            dbBookedDays.push(
              this.convertUtctoWord(
                startDaySort.setDate(startDaySort.getDate() + 1)
              )
            );
          }
        }
      },

      convertBookedArr: function () {
        // map elements to booked array
        databaseBooked.forEach((e, i) => {
          if (e.bookedFrom !== e.bookedTo) {
            this.populateDbDays(
              this.dateDiff(e.bookedFrom, e.bookedTo),
              e.bookedFrom
            );
          } else {
            dbStartDays.push(this.convertUtctoWord(e.bookedFrom, e.bookedFrom));
            dbBookedDays.push(
              this.convertUtctoWord(e.bookedFrom, e.bookedFrom)
            );
          }
        });
      },

      addDate: function (date, hall, cb) {
        try {
          // check if more than two days are selected
          if (bookingDates.length > 1) {
            bookingDates = [];

            throw new Error("PLEASE SELECT ONLY TWO DATES, START AND END");
          } else {
            try {
              // check if a value already exist
              if (bookingDates.length === 1) {
                // check if second selected value is less than the previous value
                if (this.dateDiff(bookingDates[0], date) < 0) {
                  bookingDates = [];
                  throw new Error(
                    "PLEASE END DATE CANNOT BE BEFORE START DATE"
                  );
                } else {
                  // check if dates selected overlaps with a previous date
                  const isOvalapping = databaseBooked.filter((dbBooked) => {
                    return (
                      new Date(this.convertWordToUtc(bookingDates[0])) <
                        new Date(dbBooked.bookedFrom) &&
                      new Date(this.convertWordToUtc(date)) >
                        new Date(dbBooked.bookedTo)
                    );
                  });

                  try {
                    // throw error on overlapping dates
                    if (isOvalapping.length > 0) {
                      bookingDates = [];
                      throw new Error("Overlapping dates");
                    } else {
                      bookingDates.push(date);
                    }
                  } catch (e) {
                    cb("overlapping");
                  }
                }
              } else {
                bookingDates.push(date);
              }
            } catch (e) {
              cb("selection");
            }
          }

          cb(bookingDates);
        } catch (e) {
          cb("exceeded");
        }
      },

      uploadBooked: function (data) {
        databaseBooked = [...data.data.data];
      },

      returnDate: function () {
        return date;
      },

      incDate: function () {
        return date.setMonth(date.getMonth() + 1);
      },

      decDate: function () {
        return date.setMonth(date.getMonth() - 1);
      },

      convertDateToMonth: function () {
        return date.toDateString().split(" ")[1];
      },

      renderPrev: function (date) {
        indexOfFirstDay = new Date(
          date.getFullYear(),
          date.getMonth(),
          1
        ).getDay();
        lastDayIndex = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getDay();
        prevLatDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        lastDay = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getDate();

        for (let x = indexOfFirstDay; x > 0; x--) {
          if (month === 0) {
            days += `<div id="${prevLatDay - x + 1} ${
              monthArr[date.getMonth() - 1]
            } ${date.getFullYear() - 1}" class="calender__prev_date">${
              prevLatDay - x + 1
            }</div>`;
            // dayPerTime.push(`${prevLatDay - x + 1} ${monthArr[11]} ${date.getFullYear() - 1}`)
          } else {
            days += `<div id="${prevLatDay - x + 1} ${
              monthArr[date.getMonth() - 1]
            } ${date.getFullYear()}" class="calender__prev_date">${
              prevLatDay - x + 1
            }</div>`;
            // dayPerTime.push(`${prevLatDay - x + 1} ${monthArr[month - 1]} ${date.getFullYear()}`)
          }
        }
      },

      renderCurr: function (date) {
        // dayPerTime = []
        indexOfFirstDay = new Date(date.getFullYear(), month, 1).getDay();
        lastDayIndex = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getDay();
        prevLatDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        lastDay = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getDate();
        for (let i = 1; i <= lastDay; i++) {
          if (
            i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth()
          ) {
            if (i < 10) {
              days += `<div id="0${i} ${
                monthArr[date.getMonth()]
              } ${date.getFullYear()}" class="today">${i}</div>`;
            } else {
              days += `<div id="${i} ${
                monthArr[date.getMonth()]
              } ${date.getFullYear()}" class="today">${i}</div>`;
            }
          } else {
            if (i < 10) {
              days += `<div id="0${i} ${
                monthArr[date.getMonth()]
              } ${date.getFullYear()}">${i}</div>`;
            } else {
              days += `<div id="${i} ${
                monthArr[date.getMonth()]
              } ${date.getFullYear()}">${i}</div>`;
            }
          }
        }
      },

      clearDays: function () {
        days = "";
      },

      returnDays: function () {
        return days;
      },

      returnBooked: async function (hallname, from, to) {
        let baseUrl = window.location.href.split("/");
        baseUrl = baseUrl[baseUrl.length - 1];
        try {
          const res = await axios({
            method: "GET",
            url: `${window.location.protocol}//${window.location.host}/api/v1/bookings/edit/getavailability/halls/${hallname}/from/${from}/to/${to}/id/${baseUrl}`,
          });
          return res;
        } catch (error) {
          // showAlert('error', error.response.data.message);
        }
      },

      getbookedData: function (data, cb) {
        const bookedID = Array.from(data.bookedFrom).map((div) => {
          return div.id;
        });

        if (bookingDates.length !== 1) {
          booked.push({
            ...data,
            discount: data.discount,
            clientPhoneNumber: data.clientTel,
            bookedFrom: this.convertWordToUtc(bookingDates[0]),
            bookedTo: this.convertWordToUtc(bookingDates[1]),
          });
        } else {
          booked.push({
            ...data,
            discount: data.discount,
            clientPhoneNumber: data.clientTel,
            bookedFrom: this.convertWordToUtc(bookedID[0]),
            bookedTo: this.convertWordToUtc(bookedID[0]),
          });
        }

        cb(booked);
      },

      convertWordToUtc: function (str) {
        let val = new Date(str).toDateString().split(" ")[2];
        let date = new Date(str);
        val < 10
          ? (date = `${date.getFullYear()}-0${
              date.getMonth() + 1
            }-${val}T00:00:00.000Z`)
          : (date = `${date.getFullYear()}-0${
              date.getMonth() + 1
            }-${val}T00:00:00.000Z`);
        return date;
      },

      convertUtctoWord: function (str) {
        let date = new Date(str).toDateString();
        date = `${date.split(" ")[2]} ${date.split(" ")[1]} ${
          date.split(" ")[3]
        }`;
        return date;
      },

      getFirstAndLastDay: function () {
        if (date.getMonth() < 10) {
          return {
            from: `${date.getFullYear()}-0${
              date.getMonth() + 1
            }-01T00:00:00.000Z`,
            to: `${date.getFullYear()}-0${
              date.getMonth() + 1
            }-${lastDay}T00:00:00.000Z`,
          };
        } else {
          return {
            from: `${date.getFullYear()}-${
              date.getMonth() + 1
            }-01T00:00:00.000Z`,
            to: `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${lastDay}T00:00:00.000Z`,
          };
        }
      },

      // calculation of no. of days between two date
      dateDiff: function (from, to) {
        // To set two dates to two variables
        var date1 = new Date(from);
        var date2 = new Date(to);

        // To calculate the time difference of two dates
        var Difference_In_Time = date2.getTime() - date1.getTime();

        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        //To display the final no. of days (result)
        return Difference_In_Days;
      },

      addBookedClass: function (divs) {
        divs.forEach((div, i) => {
          dbBookedDays.forEach((bookedDay) => {
            if (div.id === bookedDay) {
              div.classList.add("selected");
            }
          });
        });

        this.addSelectedClass(divs);
      },

      addSelectedClass: function (divs) {
        divs.forEach((div) => {
          dbStartDays.forEach((startDay) => {
            if (div.id === startDay) {
              div.classList.add("start");
            }
          });
        });
      },

      clearBooked: function (div) {
        databaseBooked = [];
        // booked db days
        dbBookedDays = [];
        // booked start days
        dbStartDays = [];
      },

      getbookedDataOnHover: async function (hallname, from) {
        let val;
        if (new Date(from).getMonth() < 10) {
          val = from;
        } else {
          val = `${from.split("-")[0]}-${parseInt(from.split("-")[1])}-${
            from.split("-")[2]
          }`;
        }

        console.log(val);

        try {
          const res = await axios({
            method: "GET",
            url: `${window.location.protocol}//${window.location.host}/api/v1/bookingz/getavailability/hall/${hallname}/from/${val}`,
          });
          return res;
        } catch (error) {
          // showAlert('error', error.response.data.message);
        }
      },

      getBookingDates: function () {
        return bookingDates;
      },

      setBookingDates: function (datas) {
        bookingDates = [];
        datas.forEach((data) => {
          bookingDates.push(data);
        });
      },
      updateOneBook: async function (options, id) {
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
            return res;
          }
        } catch (error) {
          if (error.response.status === 401) {
            return "Unauthorized";
          }
          return "Please select a date";
        }
      },
    };
  })();

  //  control the UI
  const UIEditController = (function () {
    return {
      // set heafer month
      updateHeadOnArrPress: function (monthData) {
        calenderMntGrpH1Edit
          ? (calenderMntGrpH1Edit.innerHTML = monthData)
          : null;
      },
      // set header date
      groupheadDate: function (dateGroup) {
        calenderMntGrpPEdit
          ? (calenderMntGrpPEdit.innerHTML = dateGroup?.toDateString())
          : null;
      },
      // render calender days
      updateMonth: function (days) {
        calenderDaysEdit ? (calenderDaysEdit.innerHTML = days) : null;
      },
      // get input values for submit
      getBookedValueE: function () {
        var a = document.querySelector(".money__change")?.textContent;
        a = a?.replace(/\,/g, "");
        a = parseInt(a, 10);

        var paid = document.querySelector("#paid")?.value;
        var user = localStorage.getItem("user_delete_id");
        // paid === "paid" ? (paid = true) : (paid = false);
        // var a = document.querySelector('.total')?.value;

        // a=a?.replace(/\,/g,'');
        // a=parseInt(a,10);
        return {
          clientName: document.querySelector("#clientNameE").value,
          clientTel: document.querySelector("#clientTelE").value,
          hallname: document.querySelector("#halnameE").value,
          clientEmail: document.querySelector("#emailE").value,
          attendance: document.querySelector("#attendanceE").value,
          event: document.querySelector("#eventE").value,
          bookedFrom: document.querySelectorAll(".active"),
          discount: document.querySelector(".payment__discount")?.value,
          total: a,
          paid,
          user,
        };
      },

      showModal: function (data) {
        modal.innerHTML = `<h2>${
          data.data.data[0].clientName
        }</h2><center><p>Email: ${data.data.data[0].clientEmail}</p></center>
                <p>Attendance: ${
                  data.data.data[0].attendance
                }</p><p>Hall Name: ${
          data.data.data[0].hallname
        }</p><p>Phone Number: ${
          data.data.data[0].clientPhoneNumber
        }</p><p>from: ${new Date(
          data.data.data[0].bookedFrom
        ).toDateString()}</p><p>To: ${new Date(
          data.data.data[0].bookedTo
        ).toDateString()}</p>`;
      },

      hideAlert: function () {
        const el = document.querySelector(".alert");
        if (el) el.parentElement.removeChild(el);
      },

      showAlert: function (type, message, delayed) {
        this.hideAlert();
        const markup = `<div class="alert alert__${type}">${message}</div>`;
        document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
        if (delayed === true) window.setTimeout(this.hideAlert, 25000);
        window.setTimeout(this.hideAlert, 7000);
      },
    };
  })();

  //  App Controller
  var controllerE = (function (calECtrl, UIEctrl) {
    const couponBtn = document.querySelector(".coupon__input");
    const couponInput = document.querySelector(".payment__discount");

    const applyDiscount = (e) => {
      e.preventDefault();
      const discountPercentage = couponInput.value;

      let days = calECtrl.getBookingDates();

      let bookedDays = 0;
      if (days.length <= 1) {
        bookedDays = 1;
      } else {
        bookedDays = calECtrl.dateDiff(days[0], days[1]);
        bookedDays += 1;
      }

      const paymentDetails = calECtrl.updatePayment(
        calECtrl.getPayment(document.querySelector("#halnameE")?.value),
        bookedDays + 1,
        +discountPercentage
      );

      couponInput.value = "";

      // let paymentDetails = calECtrl.getPayment(document.querySelector('#halnameE')?.value)

      document.querySelector(".payment__details").classList.remove("visible");
      document.querySelector(".payment__details").classList.add("visible");

      document.querySelector(".payment__details").innerHTML = "";

      document.querySelector(".payment__details").innerHTML = `
            <div class="payment__amount">
                <div> Amount x ${bookedDays} days </div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.amount
                    )}</div>
                </div>
            </div>
            <div class="payment__charge"> 
                <div>charges (10%)</div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.charge
                    )}</div>
                </div>
            </div>
            <div class="payment__vat">
                <div> VAT (7.5%)</div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.vat
                    )}</div>
                </div>
            </div>
            <div class="payment__refund"> 
                <div>Refundable Caution: </div>
                <div class="payment__money">
                    <div>&#8358 </div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.refund
                    )}</div>
                </div>
            </div>
            <div class="payment__amount">
                <div> Total:  => </div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div class="money__change">${new Intl.NumberFormat().format(
                      paymentDetails.total
                    )}</div>
                </div>
            </div>`;

      document.querySelector(".payment__discount").value =
        paymentDetails.discount;
    };

    couponBtn.addEventListener("click", applyDiscount);

    const calculateDaysBooked = (days) => {
      let bookedDays = 0;
      if (days.length <= 1) {
        bookedDays = 1;
      } else {
        bookedDays = calECtrl.dateDiff(days[0], days[1]);
        bookedDays += 1;
      }

      const paymentDetails = calECtrl.updatePayment(
        calECtrl.getPayment(document.querySelector("#halnameE")?.value),
        bookedDays
      );

      // let paymentDetails = calECtrl.getPayment(document.querySelector('#halnameE')?.value)

      document.querySelector(".payment__details").classList.remove("visible");
      document.querySelector(".payment__details").classList.add("visible");

      document.querySelector(".payment__details").innerHTML = "";

      document.querySelector(".payment__details").innerHTML = `
            <div class="payment__amount">
                <div> Amount x ${bookedDays} days </div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.amount
                    )}</div>
                </div>
            </div>
            <div class="payment__charge"> 
                <div>charges (10%)</div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.charge
                    )}</div>
                </div>
            </div>
            <div class="payment__vat">
                <div> VAT (7.5%)</div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.vat
                    )}</div>
                </div>
            </div>
            <div class="payment__refund"> 
                <div>Refundable Caution: </div>
                <div class="payment__money">
                    <div>&#8358 </div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.refund
                    )}</div>
                </div>
            </div>
            <div class="payment__amount">
                <div> Total:  => </div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div class="money__change">${new Intl.NumberFormat().format(
                      paymentDetails.total
                    )}</div>
                </div>
            </div>`;

      document.querySelector(".payment__discount").value =
        paymentDetails.discount;
    };

    const renderpaymentData = () => {
      let paymentDetails = calECtrl.getPayment(
        document.querySelector("#halnameE")?.value
      );

      document.querySelector(".payment__details").classList.remove("visible");
      document.querySelector(".payment__details").classList.add("visible");

      document.querySelector(".payment__details").innerHTML = `
            <div class="payment__amount">
                <div> Amount </div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.amount
                    )}</div>
                </div>
            </div>
            <div class="payment__charge"> 
                <div>charges (10%)</div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.charge
                    )}</div>
                </div>
            </div>
            <div class="payment__vat">
                <div> VAT (7.5%)</div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.vat
                    )}</div>
                </div>
            </div>
            <div class="payment__refund"> 
                <div>Refundable Caution: </div>
                <div class="payment__money">
                    <div>&#8358 </div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.refund
                    )}</div>
                </div>
            </div>
            <div class="payment__amount">
                <div> Total </div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div class="money__change">${new Intl.NumberFormat().format(
                      paymentDetails.total
                    )}</div>
                </div>
            </div>`;
    };

    const clickDate = (e) => {
      e.target.classList.toggle("active");

      calECtrl.addDate(
        calECtrl.convertUtctoWord(e.target.id),
        document.querySelector("#halnameE").value,
        (cb) => {
          if (cb === "exceeded") {
            UIEctrl.showAlert(
              "error",
              "Cannot choose more than two dates, select a starting date and an end date"
            );
            Array.from(document.querySelectorAll(".active")).forEach(
              (active) => {
                active.classList.remove("active");
              }
            );
            renderAndAddEvent();
          } else if (cb === "selection") {
            UIEctrl.showAlert(
              "error",
              "Ending date cannot come before starting date"
            );
            Array.from(document.querySelectorAll(".active")).forEach(
              (active) => {
                active.classList.remove("active");
              }
            );
            renderAndAddEvent();
          } else if (cb === "overlapping") {
            UIEctrl.showAlert(
              "error",
              "Please select dates that doesn't ovelapp"
            );
            Array.from(document.querySelectorAll(".active")).forEach(
              (active) => {
                active.classList.remove("active");
              }
            );
            renderAndAddEvent();
          } else {
            calculateDaysBooked(cb);
            // let paymentDetails = calECtrl.getPayment(document.querySelector('#halnameE')?.value)
          }
        }
      );
    };

    const renderAndAddEvent = () => {
      // rerender calender date
      renderDaysOfCal(calECtrl.returnDate());

      let newFilter = Array.from(
        document.querySelectorAll(".calender__days_edit div")
      ).filter(
        (div) =>
          !calECtrl.returnFilterAndStartDate().dbBookedDays.includes(div.id)
      );

      // console.log(newFilter);
      // modal.classList.remove('active')
      Array.from(document.querySelectorAll(".calender__days_edit div")).forEach(
        (div) => {
          calECtrl.returnFilterAndStartDate().dbStartDays.forEach((sDay) => {
            if (div.id === sDay) {
              div.addEventListener("mouseover", (e) => {
                calECtrl
                  .getbookedDataOnHover(
                    document.querySelector("#halnameE").value,
                    calECtrl.convertWordToUtc(e.target.id)
                  )
                  .then((resp) => {
                    modal.classList.add("active");

                    UIEctrl.showModal(resp);
                  });
              });
            }
          });
        }
      );

      Array.from(document.querySelectorAll(".calender__days_edit div")).forEach(
        (div) => {
          calECtrl.returnFilterAndStartDate().dbStartDays.forEach((sDay) => {
            if (div.id === sDay) {
              div.addEventListener("mouseout", (e) => {
                calECtrl
                  .getbookedDataOnHover(
                    document.querySelector("#halnameE").value,
                    calECtrl.convertWordToUtc(e.target.id)
                  )
                  .then((resp) => {
                    modal.classList.toggle("active");

                    // UIEctrl.showModal(resp);
                  });
              });
            }
          });
        }
      );

      newFilter.forEach((filter) => {
        // add event listener to all
        filter.addEventListener("click", clickDate);
        // remove event listener
      });
    };

    // function to fetch booked hall
    const fetchbooked = (from, to) => {
      const filled = UIEctrl.getBookedValueE();

      calECtrl.setMultiple(filled);

      calECtrl.filterMultiple();

      calECtrl.setBookingDates([]);

      renderpaymentData();

      calECtrl
        .returnBooked(document.querySelector("#halnameE")?.value, from, to)
        .then((result) => {
          calECtrl.clearBooked(
            Array.from(document.querySelectorAll(".calender__days_edit div"))
          );
          console.log(result.data.data[0]);
          calECtrl.uploadBooked(result);

          calECtrl.convertBookedArr();

          renderAndAddEvent();

          calECtrl.setHall(document.querySelector("#halnameE")?.value);
        });
    };

    // fetch booked hall on change of hall
    document
      .querySelector("#halnameE")
      ?.addEventListener("change", () =>
        fetchbooked(
          calECtrl.getFirstAndLastDay().from,
          calECtrl.getFirstAndLastDay().to
        )
      );

    // function to render calender
    const renderDaysOfCal = (date, cb) => {
      // clear previous month entry
      calECtrl.clearDays();

      // render the days of the previous month
      calECtrl.renderPrev(date);

      // render current month days
      calECtrl.renderCurr(date);

      // return the days
      let days = calECtrl.returnDays();

      // update UI with days
      UIEctrl.updateMonth(days);

      // pass days
      calECtrl.setDiv(
        Array.from(document.querySelectorAll(".calender__days_edit div"))
      );
    };

    // add click event to arrow
    calenderRhtArr?.addEventListener("click", (e) => {
      e.preventDefault();

      let bookedDate = calECtrl.getBookingDates();

      console.log(bookedDate);
      // get the set date
      var date = calECtrl.returnDate();

      //reset date to next month
      calECtrl.incDate();

      // update UI with month
      UIEctrl.groupheadDate(date);

      // fetch data for that month
      fetchbooked(
        calECtrl.getFirstAndLastDay().from,
        calECtrl.getFirstAndLastDay().to
      );

      // get month data
      let month = calECtrl.convertDateToMonth();

      // update UI with month
      UIEctrl.updateHeadOnArrPress(month);

      // render calender
      renderDaysOfCal(date);

      calECtrl.setBookingDates(bookedDate);
    });

    // add click event to previous button
    calenderLftArr?.addEventListener("click", (e) => {
      e.preventDefault();

      let bookedDate = calECtrl.getBookingDates();
      // get the set date
      var date = calECtrl.returnDate();

      // reset date to prev month
      calECtrl.decDate();

      // update UI with month
      UIEctrl.groupheadDate(date);

      // fetch data for that month
      fetchbooked(
        calECtrl.getFirstAndLastDay().from,
        calECtrl.getFirstAndLastDay().to
      );

      // get month data
      let month = calECtrl.convertDateToMonth();

      // update UI with month
      UIEctrl.updateHeadOnArrPress(month);

      // render calender
      renderDaysOfCal(date);

      calECtrl.setBookingDates(bookedDate);
    });

    // add submit event
    document.querySelector("#updateOne")?.addEventListener("click", (e) => {
      // prevent page reload
      e.preventDefault();

      UIEctrl.showAlert(
        "success",
        "Reservation processing, please wait.... ",
        true
      );

      // get input values
      let bookedData = UIEctrl.getBookedValueE();
      // store the booked values
      calECtrl.getbookedData(bookedData, (booked) => {
        console.log(booked);

        let baseUrl = window.location.href.split("/");
        let id = baseUrl[baseUrl.length - 1];

        console.log(booked);
        calECtrl
          .updateOneBook(booked, id)
          .then((res) => {
            if (res.status === 201) {
              UIEctrl.showAlert(
                "success",
                "Update successful, redirecting...."
              );
              window.setTimeout(() => {
                location.assign("/bookings");
              }, 1500);
            } else {
              UIEctrl.showAlert("error", "Unauthorized...");
            }
          })
          .catch((e) => {
            UIEctrl.showAlert("error", e);
          });
      });
    });

    var date = calECtrl.returnDate();

    UIEctrl.groupheadDate(date);

    let month = calECtrl.convertDateToMonth();

    UIEctrl.updateHeadOnArrPress(month);
    fetchbooked(
      calECtrl.getFirstAndLastDay().from,
      calECtrl.getFirstAndLastDay().to
    );

    renderAndAddEvent();
  })(calenderEditController, UIEditController);
}

// create booking page
if (calenderCont) {
  // calender Controller
  const calenderController = (function () {
    let counter = 0;
    let date = new Date();
    let month = new Date().getMonth();
    let monthArr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let indexOfFirstDay = new Date(date.getFullYear(), month, 1).getDay();
    let lastDayIndex = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDay();
    let prevLatDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    let lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    // days of month
    let days = "";
    // booked data from database
    let databaseBooked = [];
    // booked db days
    let dbBookedDays = [];
    // booked start days
    let dbStartDays = [];

    let bookingDates = [];

    let booked = [];

    let multiple = [];

    let hall = "";

    let hallDetails = {
      TarabaHall: {
        hallname: "Taraba Hall",
        amount: 200000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 80000,
        discount: 0,
      },
      SulejaGarden: {
        hallname: "Suleja Garden",
        amount: 150000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 35000,
        discount: 0,
      },
      ExecutiveHallConference: {
        hallname: "Executive Hall Conference",
        amount: 1500000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 250000,
        discount: 0,
      },
      ExecutiveLounge: {
        hallname: "Executive Lounge",
        amount: 500000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 250000,
        discount: 0,
      },
      ExecutiveHallWedding: {
        hallname: "Executive Hall wedding",
        amount: 1800000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 250000,
        discount: 0,
      },
      OfficeSpace: {
        hallname: "Executive Hall Conference",
        amount: 120000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 50000,
        discount: 0,
      },
      BenueHall: {
        hallname: "Benue Hall",
        amount: 500000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 80000,
        discount: 0,
      },
      NigerHall: {
        hallname: "Niger Hall",
        amount: 500000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 80000,
        discount: 0,
      },
      BanquetHall: {
        hallname: "Banquet Hall",
        amount: 300000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 100000,
        discount: 0,
      },
      AsoHall: {
        hallname: "Aso Hall",
        amount: 700000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 100000,
        discount: 0,
      },
      ArcadeHall: {
        hallname: "Arcade Hall",
        amount: 250000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 70000,
        discount: 0,
      },
      AfricaHallConference: {
        hallname: "Africa Hall/Foyer Conference",
        amount: 4000000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 440000,
        discount: 0,
      },
      AfricaHallWedding: {
        hallname: "Africa Hall Wedding",
        amount: 5000000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 440000,
        discount: 0,
      },
      AfricaHallGalleria: {
        hallname: "Africa Hall Galleria",
        amount: 200000,
        serviceCharge: 10,
        vat: 7.5,
        refund: 80000,
        discount: 0,
      },
    };

    let curPay = {};

    return {
      updatePayment: function (data, daysdiff, disc = "") {
        console.log(disc);
        console.log(data);
        console.log(daysdiff);
        let amount;
        if (disc !== "") {
          daysdiff - 1 > 1
            ? (amount =
                data.amount * (daysdiff - 1) -
                (disc / 100) * (data.amount * (daysdiff - 1)))
            : (amount = data.amount - (disc / 100) * data.amount);
        } else {
          amount = data.amount * daysdiff;
        }

        console.log(amount);
        console.log(data.discount);

        return {
          amount,
          charge: (10 / 100) * data.amount,
          vat: (7.5 / 100) * data.amount,
          refund: data.refund,
          total: amount + (10 / 100) * data.amount + (7.5 / 100) * data.amount,
          discount: data.discount + disc,
        };
      },

      getPayment: function (data) {
        // curPay = {}
        let foundHall = {};
        let newString = this.mergeStrings(data);
        for (const halls in hallDetails) {
          if (halls === newString) {
            foundHall = { ...hallDetails[halls] };
          }
        }
        let res = this.calcPayment(foundHall);
        curPay = { ...res };
        return res;
      },

      mergeStrings: function (data) {
        let name = data.split(" ");
        let newName = "";

        for (let n = 0; n < name.length; n++) {
          newName += name[n];
        }

        return newName;
      },
      calcPayment: function (data) {
        return {
          discount: 0,
          amount: data.amount,
          charge: (data.serviceCharge / 100) * data.amount,
          vat: (data.vat / 100) * data.amount,
          refund: data.refund,
          total:
            data.amount +
            (data.serviceCharge / 100) * data.amount +
            (data.vat / 100) * data.amount,
        };
      },

      setHall: function (data) {
        hall = data;
        console.log(hall);
      },

      getHall: function () {
        return hall;
      },

      returnMultiple: function () {
        return multiple;
      },

      filterMultiple: function () {
        multiple = multiple?.filter((m) => {
          return m?.bookedFrom.split("-")[0] != "NaN";
        });

        console.log(multiple);
      },

      setMultiple: function (data) {
        const multipleID = Array.from(data.bookedFrom).map((div) => {
          return div.id;
        });

        multiple = multiple.filter((d) => {
          return d?.hallname !== hall;
        });

        if (bookingDates.length !== 1) {
          multiple.push({
            ...data,
            hallname: hall,
            clientPhoneNumber: data.clientTel,
            bookedFrom: this.convertWordToUtc(bookingDates[0]),
            bookedTo: this.convertWordToUtc(bookingDates[1]),
          });
        } else {
          multiple.push({
            ...data,
            hallname: hall,
            clientPhoneNumber: data.clientTel,
            bookedFrom: this.convertWordToUtc(multipleID[0]),
            bookedTo: this.convertWordToUtc(multipleID[0]),
          });
        }
      },

      submitData: async function (options) {
        console.log(options);
        try {
          const res = await axios(
            {
              method: "POST",
              url: `${location.protocol}//${location.host}/api/v1/bookings/many`,
              data: [...options],
            },
            {
              withCredentials: true,
            }
          );
          console.log(res);
          //   return res;
        } catch (error) {
          return "error";
        }
      },

      returnFilterAndStartDate: function () {
        return {
          dbBookedDays,
          dbStartDays,
        };
      },

      setDiv: function (div) {
        this.addBookedClass(div);
      },

      populateDbDays: function (daydiff, startDay) {
        let startDaySort = new Date(startDay);

        for (let i = 0; i <= daydiff; i++) {
          if (i === 0) {
            dbStartDays.push(this.convertUtctoWord(startDay));

            dbBookedDays.push(
              this.convertUtctoWord(
                startDaySort.setDate(startDaySort.getDate() + 0)
              )
            );
          } else {
            dbBookedDays.push(
              this.convertUtctoWord(
                startDaySort.setDate(startDaySort.getDate() + 1)
              )
            );
          }
        }

        console.log(dbStartDays);
      },

      convertBookedArr: function () {
        // map elements to booked array
        databaseBooked.forEach((e, i) => {
          if (e.bookedFrom !== e.bookedTo) {
            this.populateDbDays(
              this.dateDiff(e.bookedFrom, e.bookedTo),
              e.bookedFrom
            );
          } else {
            dbStartDays.push(this.convertUtctoWord(e.bookedFrom, e.bookedFrom));
            dbBookedDays.push(
              this.convertUtctoWord(e.bookedFrom, e.bookedFrom)
            );
          }
        });

        // console.log(dbBookedDays, dbStartDays);
      },

      addDate: function (date, hall, cb) {
        console.log(date);
        try {
          // check if more than two days are selected
          if (bookingDates.length > 1) {
            bookingDates = [];

            throw new Error("PLEASE SELECT ONLY TWO DATES, START AND END");
          } else {
            try {
              // check if a value already exist
              if (bookingDates.length === 1) {
                // check if second selected value is less than the previous value
                if (this.dateDiff(bookingDates[0], date) < 0) {
                  bookingDates = [];
                  throw new Error(
                    "PLEASE END DATE CANNOT BE BEFORE START DATE"
                  );
                } else {
                  // check if dates selected overlaps with a previous date
                  const isOvalapping = databaseBooked.filter((dbBooked) => {
                    return (
                      new Date(this.convertWordToUtc(bookingDates[0])) <
                        new Date(dbBooked.bookedFrom) &&
                      new Date(this.convertWordToUtc(date)) >
                        new Date(dbBooked.bookedTo)
                    );
                  });

                  console.log(isOvalapping);

                  try {
                    // throw error on overlapping dates
                    if (isOvalapping.length > 0) {
                      bookingDates = [];
                      throw new Error("Overlapping dates");
                    } else {
                      bookingDates.push(date);
                    }
                  } catch (e) {
                    cb("overlapping");
                  }
                }
              } else {
                bookingDates.push(date);
              }
            } catch (e) {
              cb("selection");
            }
          }

          cb(bookingDates);
        } catch (e) {
          cb("exceeded");
        }
      },

      uploadBooked: function (data) {
        databaseBooked = [...data.data.data];
      },

      returnDate: function () {
        return date;
      },

      incDate: function () {
        return date.setMonth(date.getMonth() + 1);
      },

      decDate: function () {
        return date.setMonth(date.getMonth() - 1);
      },

      convertDateToMonth: function () {
        return date.toDateString().split(" ")[1];
      },

      renderPrev: function (date) {
        indexOfFirstDay = new Date(
          date.getFullYear(),
          date.getMonth(),
          1
        ).getDay();
        lastDayIndex = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getDay();
        prevLatDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        lastDay = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getDate();

        for (let x = indexOfFirstDay; x > 0; x--) {
          if (month === 0) {
            days += `<div id="${prevLatDay - x + 1} ${
              monthArr[date.getMonth() - 1]
            } ${date.getFullYear() - 1}" class="calender__prev_date">${
              prevLatDay - x + 1
            }</div>`;
            // dayPerTime.push(`${prevLatDay - x + 1} ${monthArr[11]} ${date.getFullYear() - 1}`)
          } else {
            days += `<div id="${prevLatDay - x + 1} ${
              monthArr[date.getMonth() - 1]
            } ${date.getFullYear()}" class="calender__prev_date">${
              prevLatDay - x + 1
            }</div>`;
            // dayPerTime.push(`${prevLatDay - x + 1} ${monthArr[month - 1]} ${date.getFullYear()}`)
          }
        }
      },

      renderCurr: function (date) {
        // dayPerTime = []
        indexOfFirstDay = new Date(date.getFullYear(), month, 1).getDay();
        lastDayIndex = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getDay();
        prevLatDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        lastDay = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getDate();
        for (let i = 1; i <= lastDay; i++) {
          if (
            i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth()
          ) {
            if (i < 10) {
              days += `<div id="0${i} ${
                monthArr[date.getMonth()]
              } ${date.getFullYear()}" class="today">${i}</div>`;
            } else {
              days += `<div id="${i} ${
                monthArr[date.getMonth()]
              } ${date.getFullYear()}" class="today">${i}</div>`;
            }
          } else {
            if (i < 10) {
              days += `<div id="0${i} ${
                monthArr[date.getMonth()]
              } ${date.getFullYear()}">${i}</div>`;
            } else {
              days += `<div id="${i} ${
                monthArr[date.getMonth()]
              } ${date.getFullYear()}">${i}</div>`;
            }
          }
        }
      },

      clearDays: function () {
        days = "";
      },

      returnDays: function () {
        return days;
      },

      returnBooked: async function (hallname, from, to) {
        try {
          const res = await axios({
            method: "GET",
            url: `${window.location.protocol}//${window.location.host}/api/v1/bookingss/getavailability/halls/${hallname}/from/${from}/to/${to}`,
          });
          return res;
        } catch (error) {
          // showAlert('error', error.response.data.message);
          console.log(error);
        }
      },

      getbookedData: function (data, cb) {
        const bookedID = Array.from(data.bookedFrom).map((div) => {
          return div.id;
        });

        console.log(bookedID.length);

        if (bookingDates.length !== 1) {
          console.log("entered is two");
          booked.push({
            ...data,
            discount: +discount,
            clientPhoneNumber: data.clientTel,
            bookedFrom: this.convertWordToUtc(bookingDates[0]),
            bookedTo: this.convertWordToUtc(bookingDates[1]),
          });
        } else {
          console.log("entered is one");
          booked.push({
            ...data,
            discount: +discount,
            clientPhoneNumber: data.clientTel,
            bookedFrom: this.convertWordToUtc(bookedID[0]),
            bookedTo: this.convertWordToUtc(bookedID[0]),
          });
        }
        console.log(booked);
        cb(booked);
      },

      convertWordToUtc: function (str) {
        let val = new Date(str).toDateString().split(" ")[2];
        let date = new Date(str);
        val < 10
          ? (date = `${date.getFullYear()}-0${
              date.getMonth() + 1
            }-${val}T00:00:00.000Z`)
          : (date = `${date.getFullYear()}-0${
              date.getMonth() + 1
            }-${val}T00:00:00.000Z`);
        return date;
      },

      convertUtctoWord: function (str) {
        let date = new Date(str).toDateString();
        date = `${date.split(" ")[2]} ${date.split(" ")[1]} ${
          date.split(" ")[3]
        }`;
        return date;
      },

      getFirstAndLastDay: function () {
        if (date.getMonth() < 10) {
          return {
            from: `${date.getFullYear()}-0${
              date.getMonth() + 1
            }-01T00:00:00.000Z`,
            to: `${date.getFullYear()}-0${
              date.getMonth() + 1
            }-${lastDay}T00:00:00.000Z`,
          };
        } else {
          return {
            from: `${date.getFullYear()}-${
              date.getMonth() + 1
            }-01T00:00:00.000Z`,
            to: `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${lastDay}T00:00:00.000Z`,
          };
        }
      },

      // calculation of no. of days between two date
      dateDiff: function (from, to) {
        // To set two dates to two variables
        var date1 = new Date(from);
        var date2 = new Date(to);

        // To calculate the time difference of two dates
        var Difference_In_Time = date2.getTime() - date1.getTime();

        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        //To display the final no. of days (result)
        return Difference_In_Days;
      },

      addBookedClass: function (divs) {
        divs.forEach((div, i) => {
          dbBookedDays.forEach((bookedDay) => {
            if (div.id === bookedDay) {
              div.classList.add("selected");
            }
          });
        });

        this.addSelectedClass(divs);
      },

      addSelectedClass: function (divs) {
        divs.forEach((div) => {
          dbStartDays.forEach((startDay) => {
            if (div.id === startDay) {
              div.classList.add("start");
            }
          });
        });
      },

      clearBooked: function (div) {
        databaseBooked = [];
        // booked db days
        dbBookedDays = [];
        // booked start days
        dbStartDays = [];
      },

      getbookedDataOnHover: async function (hallname, from) {
        let val;
        if (new Date(from).getMonth() < 10) {
          val = from;
        } else {
          val = `${from.split("-")[0]}-${parseInt(from.split("-")[1])}-${
            from.split("-")[2]
          }`;
        }

        console.log(val);

        try {
          const res = await axios({
            method: "GET",
            url: `${window.location.protocol}//${window.location.host}/api/v1/bookingz/getavailability/hall/${hallname}/from/${val}`,
          });
          return res;
        } catch (error) {
          // showAlert('error', error.response.data.message);
          console.log(error);
        }
      },

      getBookingDates: function () {
        return bookingDates;
      },

      setBookingDates: function (datas) {
        bookingDates = [];
        datas.forEach((data) => {
          bookingDates.push(data);
        });
      },
      updateOneBook: async function (options, id) {
        try {
          const res = await axios(
            {
              method: "PATCH",
              url: `${location.protocol}//${location.host}/api/v1/bookings/${id}`,
              data: { ...options },
            },
            { withCredentials: true }
          );
          console.log(res);
          if (res.status === 201) {
            return res;
          }
        } catch (error) {
          console.log("error", "Please select a date");
        }
      },
    };
  })();

  //  control the UI
  const UIController = (function () {
    return {
      // set heafer month
      updateHeadOnArrPress: function (monthData) {
        calenderMntGrpH1 ? (calenderMntGrpH1.innerHTML = monthData) : null;
      },
      // set header date
      groupheadDate: function (dateGroup) {
        calenderMntGrpP
          ? (calenderMntGrpP.innerHTML = dateGroup?.toDateString())
          : null;
      },
      // render calender days
      updateMonth: function (days) {
        calenderDays ? (calenderDays.innerHTML = days) : null;
      },
      // get input values for submit
      getBookedValue: function () {
        var a = document.querySelector(".money__change")?.textContent;
        a = a?.replace(/\,/g, "");
        a = parseInt(a, 10);

        var paid = document.querySelector("#paidB")?.value;
        var user = localStorage.getItem("user_delete_id");
        // console.log(document.querySelector("#hallname")?.value);

        return {
          clientName: document.querySelector("#clientName")?.value,
          clientTel: document.querySelector("#clientTel")?.value,
          hallname: document.querySelector("#hallname")?.value,
          clientEmail: document.querySelector("#email")?.value,
          attendance: document.querySelector("#attendance")?.value,
          event: document.querySelector("#event")?.value,
          bookedFrom: document.querySelectorAll(".active"),
          discount: document.querySelector(".payment__discount")?.value,
          total: a,
          paid,
          user,
        };
      },

      showModal: function (data) {
        modal.innerHTML = `<h2>${
          data.data.data[0].clientName
        }</h2><center><p>Email: ${data.data.data[0].clientEmail}</p></center>
                <p>Attendance: ${
                  data.data.data[0].attendance
                }</p><p>Hall Name: ${
          data.data.data[0].hallname
        }</p><p>Phone Number: ${
          data.data.data[0].clientPhoneNumber
        }</p><p>from: ${new Date(
          data.data.data[0].bookedFrom
        ).toDateString()}</p><p>To: ${new Date(
          data.data.data[0].bookedTo
        ).toDateString()}</p>`;
      },

      hideAlert: function () {
        const el = document.querySelector(".alert");
        if (el) el.parentElement.removeChild(el);
      },

      showAlert: function (type, message, delayed) {
        this.hideAlert();
        const markup = `<div class="alert alert__${type}">${message}</div>`;
        document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
        if (delayed === true) window.setTimeout(this.hideAlert, 25000);
        window.setTimeout(this.hideAlert, 7000);
      },
    };
  })();

  //  App Controller
  var controller = (function (calCtrl, UIctrl) {
    const couponBtn = document.querySelector(".coupon__input");
    const couponInput = document.querySelector(".payment__discount");

    const applyDiscount = (e) => {
      e.preventDefault();
      const discountPercentage = couponInput.value;

      let days = calCtrl.getBookingDates();

      let bookedDays = 0;
      if (days.length <= 1) {
        bookedDays = 1;
      } else {
        bookedDays = calCtrl.dateDiff(days[0], days[1]);
        bookedDays += 1;
      }

      const paymentDetails = calCtrl.updatePayment(
        calCtrl.getPayment(document.querySelector("#hallname")?.value),
        bookedDays + 1,
        +discountPercentage
      );

      couponInput.value = "";

      // let paymentDetails = calCtrl.getPayment(document.querySelector('#hallname')?.value)

      document.querySelector(".payment__details").classList.remove("visible");
      document.querySelector(".payment__details").classList.add("visible");

      document.querySelector(".payment__details").innerHTML = "";

      document.querySelector(".payment__details").innerHTML = `
            <div class="payment__amount">
                <div> Amount x ${bookedDays} days </div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.amount
                    )}</div>
                </div>
            </div>
            <div class="payment__charge"> 
                <div>charges (10%)</div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.charge
                    )}</div>
                </div>
            </div>
            <div class="payment__vat">
                <div> VAT (7.5%)</div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.vat
                    )}</div>
                </div>
            </div>
            <div class="payment__refund"> 
                <div>Refundable Caution: </div>
                <div class="payment__money">
                    <div>&#8358 </div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.refund
                    )}</div>
                </div>
            </div>
            <div class="payment__amount">
                <div> Total:  => </div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div class="money__change">${new Intl.NumberFormat().format(
                      paymentDetails.total
                    )}</div>
                </div>
            </div>`;

      document.querySelector(".payment__discount").value =
        paymentDetails.discount;
    };

    couponBtn.addEventListener("click", applyDiscount);

    const calculateDaysBooked = (days) => {
      let bookedDays = 0;
      if (days.length <= 1) {
        bookedDays = 1;
      } else {
        bookedDays = calCtrl.dateDiff(days[0], days[1]);
        bookedDays += 1;
      }

      const paymentDetails = calCtrl.updatePayment(
        calCtrl.getPayment(document.querySelector("#hallname")?.value),
        bookedDays
      );

      // let paymentDetails = calCtrl.getPayment(document.querySelector('#hallname')?.value)

      document.querySelector(".payment__details").classList.remove("visible");
      document.querySelector(".payment__details").classList.add("visible");

      document.querySelector(".payment__details").innerHTML = "";

      document.querySelector(".payment__details").innerHTML = `
            <div class="payment__amount">
                <div> Amount x ${bookedDays} days </div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.amount
                    )}</div>
                </div>
            </div>
            <div class="payment__charge"> 
                <div>charges (10%)</div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.charge
                    )}</div>
                </div>
            </div>
            <div class="payment__vat">
                <div> VAT (7.5%)</div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.vat
                    )}</div>
                </div>
            </div>
            <div class="payment__refund"> 
                <div>Refundable Caution: </div>
                <div class="payment__money">
                    <div>&#8358 </div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.refund
                    )}</div>
                </div>
            </div>
            <div class="payment__amount">
                <div> Total:  => </div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div class="money__change">${new Intl.NumberFormat().format(
                      paymentDetails.total
                    )}</div>
                </div>
            </div>`;

      document.querySelector(".payment__discount").value =
        paymentDetails.discount;
    };

    const renderpaymentData = () => {
      let paymentDetails = calCtrl.getPayment(
        document.querySelector("#hallname")?.value
      );

      document.querySelector(".payment__details").classList.remove("visible");
      document.querySelector(".payment__details").classList.add("visible");

      document.querySelector(".payment__details").innerHTML = `
            <div class="payment__amount">
                <div> Amount </div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.amount
                    )}</div>
                </div>
            </div>
            <div class="payment__charge"> 
                <div>charges (10%)</div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.charge
                    )}</div>
                </div>
            </div>
            <div class="payment__vat">
                <div> VAT (7.5%)</div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.vat
                    )}</div>
                </div>
            </div>
            <div class="payment__refund"> 
                <div>Refundable Caution: </div>
                <div class="payment__money">
                    <div>&#8358 </div>
                    <div>${new Intl.NumberFormat().format(
                      paymentDetails.refund
                    )}</div>
                </div>
            </div>
            <div class="payment__amount">
                <div> Total </div>
                <div class="payment__money">
                    <div>&#8358</div>
                    <div class="money__change">${new Intl.NumberFormat().format(
                      paymentDetails.total
                    )}</div>
                </div>
            </div>`;
    };

    const clickDate = (e) => {
      e.target.classList.toggle("active");

      calCtrl.addDate(
        calCtrl.convertUtctoWord(e.target.id),
        document.querySelector("#hallname").value,
        (cb) => {
          if (cb === "exceeded") {
            UIctrl.showAlert(
              "error",
              "Cannot choose more than two dates, select a starting date and an end date"
            );
            Array.from(document.querySelectorAll(".active")).forEach(
              (active) => {
                active.classList.remove("active");
              }
            );
            renderAndAddEvent();
          } else if (cb === "selection") {
            UIctrl.showAlert(
              "error",
              "Ending date cannot come before starting date"
            );
            Array.from(document.querySelectorAll(".active")).forEach(
              (active) => {
                active.classList.remove("active");
              }
            );
            renderAndAddEvent();
          } else if (cb === "overlapping") {
            UIctrl.showAlert(
              "error",
              "Please select dates that doesn't ovelapp"
            );
            Array.from(document.querySelectorAll(".active")).forEach(
              (active) => {
                active.classList.remove("active");
              }
            );
            renderAndAddEvent();
          } else {
            calculateDaysBooked(cb);
            // let paymentDetails = calCtrl.getPayment(document.querySelector('#hallname')?.value)
          }
        }
      );
    };

    const renderAndAddEvent = () => {
      // rerender calender date
      renderDaysOfCal(calCtrl.returnDate());

      let newFilter = Array.from(
        document.querySelectorAll(".calender__days div")
      ).filter(
        (div) =>
          !calCtrl.returnFilterAndStartDate().dbBookedDays.includes(div.id)
      );

      // console.log(newFilter);
      // modal.classList.remove('active')
      Array.from(document.querySelectorAll(".calender__days div")).forEach(
        (div) => {
          calCtrl.returnFilterAndStartDate().dbStartDays.forEach((sDay) => {
            if (div.id === sDay) {
              div.addEventListener("mouseover", (e) => {
                calCtrl
                  .getbookedDataOnHover(
                    document.querySelector("#hallname").value,
                    calCtrl.convertWordToUtc(e.target.id)
                  )
                  .then((resp) => {
                    modal.classList.add("active");

                    UIctrl.showModal(resp);
                  });
              });
            }
          });
        }
      );

      Array.from(document.querySelectorAll(".calender__days div")).forEach(
        (div) => {
          calCtrl.returnFilterAndStartDate().dbStartDays.forEach((sDay) => {
            if (div.id === sDay) {
              div.addEventListener("mouseout", (e) => {
                calCtrl
                  .getbookedDataOnHover(
                    document.querySelector("#hallname").value,
                    calCtrl.convertWordToUtc(e.target.id)
                  )
                  .then((resp) => {
                    modal.classList.toggle("active");

                    // UIctrl.showModal(resp);
                  });
              });
            }
          });
        }
      );

      newFilter.forEach((filter) => {
        // add event listener to all
        filter.addEventListener("click", clickDate);
        // remove event listener
      });
    };

    // function to fetch booked hall
    const fetchbooked = (from, to) => {
      const filled = UIctrl.getBookedValue();

      calCtrl.setMultiple(filled);

      calCtrl.filterMultiple();

      calCtrl.setBookingDates([]);

      renderpaymentData();

      calCtrl
        .returnBooked(document.querySelector("#hallname")?.value, from, to)
        .then((result) => {
          calCtrl.clearBooked(
            Array.from(document.querySelectorAll(".calender__days div"))
          );
          console.log(result.data.data[0]);
          calCtrl.uploadBooked(result);

          calCtrl.convertBookedArr();

          renderAndAddEvent();

          calCtrl.setHall(document.querySelector("#hallname")?.value);
        });
    };

    // fetch booked hall on change of hall
    document
      .querySelector("#hallname")
      ?.addEventListener("change", () =>
        fetchbooked(
          calCtrl.getFirstAndLastDay().from,
          calCtrl.getFirstAndLastDay().to
        )
      );

    // function to render calender
    const renderDaysOfCal = (date, cb) => {
      // clear previous month entry
      calCtrl.clearDays();

      // render the days of the previous month
      calCtrl.renderPrev(date);

      // render current month days
      calCtrl.renderCurr(date);

      // return the days
      let days = calCtrl.returnDays();

      // update UI with days
      UIctrl.updateMonth(days);

      // pass days
      calCtrl.setDiv(
        Array.from(document.querySelectorAll(".calender__days div"))
      );
    };

    // add click event to arrow
    calenderRhtArr?.addEventListener("click", (e) => {
      e.preventDefault();

      let bookedDate = calCtrl.getBookingDates();

      console.log(bookedDate);
      // get the set date
      var date = calCtrl.returnDate();

      //reset date to next month
      calCtrl.incDate();

      // update UI with month
      UIctrl.groupheadDate(date);

      // fetch data for that month
      fetchbooked(
        calCtrl.getFirstAndLastDay().from,
        calCtrl.getFirstAndLastDay().to
      );

      // get month data
      let month = calCtrl.convertDateToMonth();

      // update UI with month
      UIctrl.updateHeadOnArrPress(month);

      // render calender
      renderDaysOfCal(date);

      calCtrl.setBookingDates(bookedDate);
    });

    // add click event to previous button
    calenderLftArr?.addEventListener("click", (e) => {
      e.preventDefault();

      let bookedDate = calCtrl.getBookingDates();
      // get the set date
      var date = calCtrl.returnDate();

      // reset date to prev month
      calCtrl.decDate();

      // update UI with month
      UIctrl.groupheadDate(date);

      // fetch data for that month
      fetchbooked(
        calCtrl.getFirstAndLastDay().from,
        calCtrl.getFirstAndLastDay().to
      );

      // get month data
      let month = calCtrl.convertDateToMonth();

      // update UI with month
      UIctrl.updateHeadOnArrPress(month);

      // render calender
      renderDaysOfCal(date);

      calCtrl.setBookingDates(bookedDate);
    });

    // add submit event
    document
      .querySelector(".form__input.bg-green")
      ?.addEventListener("click", (e) => {
        // prevent page reload
        e.preventDefault();

        UIctrl.showAlert(
          "success",
          "Reservation processing, please wait.... ",
          true
        );

        // get input values
        let bookedData = UIctrl.getBookedValue();

        console.log(bookedData);
        calCtrl.setHall(bookedData.hallname);

        calCtrl.setMultiple(bookedData);

        calCtrl.filterMultiple();

        const multipleData = calCtrl.returnMultiple();

        calCtrl
          .submitData(multipleData)
          .then((res) => {
            console.log(res);
            // if (res.status === 201) {
            //   UIctrl.showAlert("success", "Booking successful");
            //   window.setTimeout(() => {
            //     location.assign("/bookings");
            //   }, 1500);
            // }
          })
          .catch((e) => {
            showAlert("error", e.response.data.error);
          });

        // store the booked values
        // calCtrl.getbookedData(bookedData, (booked) => {

        //     console.log(booked);

        //     console.log(bookedData);
        //     calCtrl.submitData(booked).then(res => {
        //         if (res.status === 201) {
        //             UIctrl.showAlert('success', 'Booking successful');
        //             window.setTimeout(() => {
        //                 location.assign('/bookings');
        //             }, 1500);
        //         }
        //     }).catch(e => {
        //         showAlert('error', e.response.data.error);
        //     })
        // })
      });

    var date = calCtrl.returnDate();

    UIctrl.groupheadDate(date);

    let month = calCtrl.convertDateToMonth();

    UIctrl.updateHeadOnArrPress(month);

    // fetchbooked(calCtrl.getFirstAndLastDay().from, calCtrl.getFirstAndLastDay().to);

    // renderDaysOfCal(new Date())

    renderAndAddEvent();

    calCtrl.setHall(document.querySelector("#hallname")?.value);
  })(calenderController, UIController);
}

const calenderPageCont = document.querySelector(".calender-cont");
const navLeft = document.querySelector(".nav-left i");
const navRight = document.querySelector(".nav-right i");
const calenderMonth = document.querySelector(".calender-month");
const calenderMonthH2 = document.querySelector(".calender-month h2");
const calenderMonthP = document.querySelector(".calender-month p");
const monthBtn = document.querySelector(".month-btn");
const weekBtn = document.querySelector(".week-btn");
const dayBtn = document.querySelector(".day-btn");
const weekDayDiv = document.querySelector(".calender-body-header div");
const dayDate = document.querySelector(".calender-body-body");

// view calender page
const calenderPageController = (function () {
  let date = new Date();
  let month = new Date().getMonth();
  let monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let indexOfFirstDay = new Date(date.getFullYear(), month, 1).getDay();
  let lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();
  let prevLatDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  // days of month
  let days = "";

  let databaseBooked = [];

  return {
    convertDateToMonth: function () {
      return date.toDateString().split(" ")[1];
    },

    clearDays: function () {
      days = "";
    },

    clearDbBooked: function () {
      databaseBooked = [];
    },

    convertWordToUtc: function (str) {
      let val = new Date(str).toDateString().split(" ")[2];
      let date = new Date(str);
      val < 10
        ? (date = `${date.getFullYear()}-0${
            date.getMonth() + 1
          }-${val}T00:00:00.000Z`)
        : (date = `${date.getFullYear()}-0${
            date.getMonth() + 1
          }-${val}T00:00:00.000Z`);
      return date;
    },

    convertUtctoWord: function (str) {
      let date = new Date(str).toDateString();
      date = `${date.split(" ")[2]} ${date.split(" ")[1]} ${
        date.split(" ")[3]
      }`;
      return date;
    },

    convertDateToMonth: function () {
      return date.toDateString().split(" ")[1];
    },

    decDate: function () {
      return date.setMonth(date.getMonth() - 1);
    },

    dateDiff: function (from, to) {
      // To set two dates to two variables
      var date1 = new Date(from);
      var date2 = new Date(to);

      // To calculate the time difference of two dates
      var Difference_In_Time = date2.getTime() - date1.getTime();

      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      //To display the final no. of days (result)
      return Difference_In_Days;
    },

    getFirstAndLastDay: function () {
      if (date.getMonth() <= 9) {
        return {
          from: `${date.getFullYear()}-0${
            date.getMonth() + 1
          }-01T00:00:00.000Z`,
          to: `${date.getFullYear()}-0${
            date.getMonth() + 1
          }-${lastDay}T00:00:00.000Z`,
        };
      } else {
        return {
          from: `${date.getFullYear()}-${date.getMonth() + 1}-01T00:00:00.000Z`,
          to: `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${lastDay}T00:00:00.000Z`,
        };
      }
    },

    getBookedForRender: function () {
      return databaseBooked;
    },

    getAllBookings: async function (from, to) {
      // /getavailability/halls/${hallname}/from/${from}/to/${to}

      try {
        const res = await axios({
          method: "GET",
          url: `${window.location.protocol}//${window.location.host}/api/v1/bookings/getall/from/${from}/to/${to}`,
        });
        return res;
      } catch (error) {
        // showAlert('error', error.response.data.message);
        console.log(error);
      }
    },

    getbookedDataOnHover: async function (hallname, from) {
      let val;
      if (new Date(from).getMonth() < 10) {
        val = from;
      } else {
        val = `${from.split("-")[0]}-${parseInt(from.split("-")[1])}-${
          from.split("-")[2]
        }`;
      }

      // console.log(val);

      try {
        const res = await axios({
          method: "GET",
          url: `${window.location.protocol}//${window.location.host}/api/v1/bookingz/getavailability/hall/${hallname}/from/${val}`,
        });
        return res;
      } catch (error) {
        // showAlert('error', error.response.data.message);
        console.log(error);
      }
    },

    incDate: function () {
      return date.setMonth(date.getMonth() + 1);
    },

    returnDate: function () {
      return date;
    },

    returnDbBooked: function () {
      return databaseBooked;
    },

    returnDays: function () {
      return days;
    },

    renderPrev: function (date) {
      indexOfFirstDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      ).getDay();
      lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDay();
      prevLatDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
      lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

      for (let x = indexOfFirstDay; x > 0; x--) {
        if (month === 0) {
          days += `<div id="${prevLatDay - x + 1} ${
            monthArr[date.getMonth() - 1]
          } ${
            date.getFullYear() - 1
          }" class="cal-prev"><span class="date-date">${
            prevLatDay - x + 1
          }</span></div>`;
          // dayPerTime.push(`${prevLatDay - x + 1} ${monthArr[11]} ${date.getFullYear() - 1}`)
        } else {
          days += `<div id="${prevLatDay - x + 1} ${
            monthArr[date.getMonth() - 1]
          } ${date.getFullYear()}" class="cal-prev"><span class="date-date">${
            prevLatDay - x + 1
          }</span></div>`;
          // dayPerTime.push(`${prevLatDay - x + 1} ${monthArr[month - 1]} ${date.getFullYear()}`)
        }
      }
    },

    renderCurr: function (date) {
      // dayPerTime = []
      indexOfFirstDay = new Date(date.getFullYear(), month, 1).getDay();
      lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDay();
      prevLatDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
      lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      for (let i = 1; i <= lastDay; i++) {
        if (
          i === new Date().getDate() &&
          date.getMonth() === new Date().getMonth()
        ) {
          if (i < 10) {
            days += `<div id="0${i} ${
              monthArr[date.getMonth()]
            } ${date.getFullYear()}" class="current-day"><span class="date-date">${i}</span></div>`;
          } else {
            days += `<div id="${i} ${
              monthArr[date.getMonth()]
            } ${date.getFullYear()}" class="current-day"><span class="date-date">${i}</span></div>`;
          }
        } else {
          if (i < 10) {
            days += `<div id="0${i} ${
              monthArr[date.getMonth()]
            } ${date.getFullYear()}"><span class="date-date">${i}</span></div>`;
          } else {
            days += `<div id="${i} ${
              monthArr[date.getMonth()]
            } ${date.getFullYear()}"><span class="date-date">${i}</span></div>`;
          }
        }
      }
    },

    setDbBooked: function (data) {
      data &&
        [...data.data.data].forEach((val) => {
          databaseBooked.push({
            ...val,
            daydifference: this.dateDiff(val.bookedFrom, val.bookedTo),
          });
        });

      databaseBooked.sort((a, b) => {
        return b.daydifference - a.daydifference;
      });
    },
  };
})();

//  control the UI page
const UIPageController = (function () {
  return {
    // set header date
    groupheadDate: function (dateGroup) {
      calenderMonthP
        ? (calenderMonthP.innerHTML = dateGroup?.toDateString())
        : null;
    },

    showModal: function (data) {
      modal.innerHTML = `<h2>${
        data.data.data[0].clientName
      }</h2><center><p>Email: ${data.data.data[0].clientEmail}</p></center>
            <p>Attendance: ${data.data.data[0].attendance}</p><p>Hall Name: ${
        data.data.data[0].hallname
      }</p><p>Phone Number: ${
        data.data.data[0].clientPhoneNumber
      }</p><p>from: ${new Date(
        data.data.data[0].bookedFrom
      ).toDateString()}</p><p>To: ${new Date(
        data.data.data[0].bookedTo
      ).toDateString()}</p>`;
    },

    // set heafer month
    updateHeadOnArrPress: function (monthData) {
      console.log(monthData);

      const monthLong = [
        "January",
        "February",
        "march",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const monthShort = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      console.log(monthShort.includes(monthData));
      calenderMonthH2
        ? (calenderMonthH2.innerHTML = monthLong[monthShort.indexOf(monthData)])
        : null;
    },

    // render calender days
    updateMonth: function (days) {
      dayDate ? (dayDate.innerHTML = days) : null;
    },
  };
})();

//  App Page Controller
var controller = (function (calCtrl, UIctrl) {
  // function to render calender
  const renderDaysOfCal = (date, cb) => {
    // clear previous month entry
    calCtrl.clearDays();

    // render the days of the previous month
    calCtrl.renderPrev(date);

    // render current month days
    calCtrl.renderCurr(date);

    // return the days
    let days = calCtrl.returnDays();

    // update UI with days
    UIctrl.updateMonth(days);

    calCtrl
      .getAllBookings(
        calCtrl.getFirstAndLastDay().from,
        calCtrl.getFirstAndLastDay().to
      )
      .then((res) => {
        calCtrl.setDbBooked(res);

        calCtrl.getBookedForRender().forEach((data) => {
          if (data.bookedFrom === data.bookedTo) {
            dayDate
              ? Array.from(dayDate?.childNodes).forEach((p) => {
                  if (p.id === calCtrl.convertUtctoWord(data.bookedFrom)) {
                    console.log("inside " + p.id);
                    p.insertAdjacentHTML(
                      "beforeend",
                      `<p class="detail single" onmouseover="hoverDetail(this)" onmouseout="hoverDetailR(this)">${data.hallname}</p>`
                    );

                    // p.addEventListener('mouseover', hoverDetail)
                  }
                })
              : null;
          } else {
            // dbStartDays.push(this.convertUtctoWord(data.bookedFrom))
            let startDaySort = new Date(data.bookedFrom);

            for (let i = 0; i < data.daydifference; i++) {
              if (i === 0) {
                dayDate
                  ? Array.from(dayDate.childNodes).forEach((d) => {
                      if (d?.id === calCtrl.convertUtctoWord(startDaySort)) {
                        d.insertAdjacentHTML(
                          "beforeend",
                          `<p class="detail booked" onmouseover="hoverDetail(this)" onmouseout="hoverDetailR(this)">${data.hallname}</p>`
                        );

                        // d.addEventListener('mouseover', hoverDetail)
                      }
                    })
                  : null;

                startDaySort = startDaySort.setDate(startDaySort.getDate() + 1);
              } else {
                dayDate
                  ? Array.from(dayDate.childNodes).forEach((f) => {
                      if (f.id === calCtrl.convertUtctoWord(startDaySort)) {
                        f.insertAdjacentHTML(
                          "beforeend",
                          `<p class="detail middle-booked">${data.hallname}</p>`
                        );
                      }
                    })
                  : null;

                // console.log(startDaySort);

                startDaySort = new Date(startDaySort).setDate(
                  new Date(startDaySort).getDate() + 1
                );
              }
            }

            dayDate
              ? Array.from(dayDate.childNodes).forEach((l) => {
                  if (l.id === calCtrl.convertUtctoWord(data.bookedTo)) {
                    l.insertAdjacentHTML(
                      "beforeend",
                      `<p class="detail end-booked">${data.hallname}</p>`
                    );
                  }
                })
              : null;
          }
        });
      });
  };

  navLeft &&
    navLeft.addEventListener("click", () => {
      calCtrl.clearDbBooked();

      var date = calCtrl.returnDate();

      // reset date to prev month
      calCtrl.decDate();

      let month = calCtrl.convertDateToMonth();

      UIctrl.updateHeadOnArrPress(month);

      // update UI with month
      UIctrl.groupheadDate(date);

      renderDaysOfCal(date);
    });

  navRight &&
    navRight.addEventListener("click", () => {
      calCtrl.clearDbBooked();

      var date = calCtrl.returnDate();

      // reset date to prev month
      calCtrl.incDate();

      let month = calCtrl.convertDateToMonth();

      UIctrl.updateHeadOnArrPress(month);

      // update UI with month
      UIctrl.groupheadDate(date);

      renderDaysOfCal(date);
    });

  var date = calCtrl.returnDate();

  let month = calCtrl.convertDateToMonth();

  UIctrl.updateHeadOnArrPress(month);

  UIctrl.groupheadDate(date);

  renderDaysOfCal(calCtrl.returnDate());
})(calenderPageController, UIPageController);

// Display booking on hover function
const hoverDetail = (e) => {
  const id = e.parentElement.id;
  const place = e.textContent;

  calenderPageController
    .getbookedDataOnHover(place, calenderPageController.convertWordToUtc(id))
    .then((res) => {
      // console.log(res);

      modal.classList.add("active");

      UIPageController.showModal(res);
    });
};

const hoverDetailR = (e) => {
  const id = e.parentElement.id;
  const place = e.textContent;

  calenderPageController
    .getbookedDataOnHover(place, calenderPageController.convertWordToUtc(id))
    .then((res) => {
      // console.log(res);

      modal.classList.toggle("active");

      // UIPageController.showModal(res);
    });
};

// View bookings-table
if (document.querySelector(".tab")) {
  // bookings-page-table
  (function () {
    let filterArr = [];
    const listEl = document.querySelector("tr");
    const loader = document.querySelector(".loader");
    const inputFilter = document.querySelector(".input-filter");
    inputFilter ? (inputFilter.value = "") : null;
    const selectFilter = document.querySelector(".select-book");
    const btnSub = document.querySelector(".btn-submit");
    let start = true;

    // get the quotes from API
    const getQuotes = async (page, limit) => {
        try {
          const res = await axios({
            method: "GET",
            url: `${window.location.protocol}//${window.location.host}/api/v1/bookings?page=${page}&limit=${limit}`,
          });
          return res;
        } catch (error) {
          console.log(error);
        }
      },
      convertWordToUtc = (str) => {
        let val = new Date(str).toDateString().split(" ")[2];
        let date = new Date(str);
        val < 10
          ? (date = `${date.getFullYear()}-0${
              date.getMonth() + 1
            }-${val}T00:00:00.000Z`)
          : (date = `${date.getFullYear()}-0${
              date.getMonth() + 1
            }-${val}T00:00:00.000Z`);
        return date;
      };

    convertUtctoWord = (str) => {
      let date = new Date(str).toDateString();
      date = `${date.split(" ")[2]} ${date.split(" ")[1]} ${
        date.split(" ")[3]
      }`;
      return date;
    };

    const getUnfiltered = async (search, value) => {
      if (search === "bookedFrom") {
        value = `${value.split("/")[0]}-${value.split("/")[1]}-${
          value.split("/")[2]
        }`;
      }

      try {
        const res = await axios({
          method: "GET",
          url: `${window.location.protocol}//${window.location.host}/api/v1/no-filter/bookings/search/${search}/value/${value}`,
        });
        return res;
      } catch (error) {
        console.log(error);
      }
    };

    count = 0;

    const setFilter = (val) => {
      Array.from(document.querySelectorAll("tr")).forEach((tr, i) => {
        if (i !== 0) {
          tr.remove();
        }
      });

      listEl.insertAdjacentHTML("afterend", val);
      hideLoader();
    };

    const setValue = (val) => {
      listEl.insertAdjacentHTML("afterend", val);
      hideLoader();
    };

    // show the quotes
    const showQuotes = (data) => {
      let html = "";
      data.forEach((value) => {
        html += `<tr><td>${value.clientName}</td><td>${
          value.clientEmail
        }</td><td>${value.clientPhoneNumber}</td><td>${
          value.hallname
        }</td><td>${value.attendance}</td><td>${
          value.event ? value.event : "N/A"
        }</td><td>${new Date(
          value.bookedFrom
        ).toDateString()}</td><td>${new Date(
          value.bookedTo
        ).toDateString()}</td><td>${
          !value.paid ? "unpaid" : "paid"
        }</td><td style="white-space: nowrap">&#8358 ${new Intl.NumberFormat().format(
          value.total
        )}</td><td>${value.discount}%</td><td><i onClick="runDelete(this)" id=${
          value._id
        }  class="fa fa-trash" style="color:#eb4d4b;display: flex;justify-content: center;cursor: pointer"></i><td><a onClick="return confirm('are you sure you want to update')" href="/bookings/${
          value._id
        }"><i id=${
          value._id
        }  class="fa fa-edit" style="color:#20bf6b;display: flex;justify-content: center;cursor: pointer"></i></a></td></tr>`;
      });

      setValue(html);
    };

    const showQuotesF = (data) => {
      let html = "";
      data.forEach((value) => {
        html += `<tr><td>${value.clientName}</td><td>${
          value.clientEmail
        }</td><td>${value.clientPhoneNumber}</td><td>${
          value.hallname
        }</td><td>${value.attendance}</td><td>${
          value.event ? value.event : "N/A"
        }</td><td>${new Date(
          value.bookedFrom
        ).toDateString()}</td><td>${new Date(
          value.bookedTo
        ).toDateString()}</td><td>${
          !value.paid ? "unpaid" : "paid"
        }</td><td style="white-space: nowrap">&#8358 ${new Intl.NumberFormat().format(
          value.total
        )}</td><td>${value.discount}%</td><td><i onClick="runDelete(this)" id=${
          value._id
        }  class="fa fa-trash" style="color:#eb4d4b;display: flex;justify-content: center;cursor: pointer"></i><td><a onClick="return confirm('are you sure you want to update')" href="/bookings/${
          value._id
        }"><i class="fa fa-edit" style="color:#20bf6b;display: flex;justify-content: center;cursor: pointer"></i></a></td></tr>`;
      });

      setFilter(html);
    };

    const hideLoader = () => {
      loader ? loader.classList.remove("list-active") : null;
    };

    const showLoader = () => {
      loader ? loader.classList.add("list-active") : null;
    };

    const hasMoreQuotes = (page, limit, total) => {
      const startIndex = (page - 1) * limit + 1;
      return total === 0 || startIndex < total;
    };

    // load quotes
    const loadQuotes = async (page, limit) => {
      // show the loader
      showLoader();

      setTimeout(async () => {
        try {
          // if having more quotes to fetch
          if (hasMoreQuotes(page, limit, total)) {
            // call the API to get quotes
            const response = await getQuotes(page, limit);
            // show quotes
            showQuotes(response.data.data.bookings);
            // update the total
            total = response.data.data.count;
          }
        } catch (error) {
          return error.message;
        } finally {
          hideLoader();
        }
      }, 100);
    };
    let text = "";
    let queryVal = selectFilter ? selectFilter.value : null;

    const filterScript = (e) => {
      showLoader();
      // console.log(queryVal,inputFilter.value);

      getUnfiltered(queryVal, inputFilter.value).then((data) => {
        showQuotesF(data.data.data.booking);
      });
    };

    const changeScript = () => {
      queryVal = selectFilter.value;
    };

    btnSub ? btnSub.addEventListener("click", filterScript) : null;
    selectFilter ? selectFilter.addEventListener("change", changeScript) : null;

    // control variables
    let currentPage = 1;
    const limit = 50;
    let total = 0;

    window.addEventListener(
      "scroll",
      () => {
        const {
          scrollTop,
          scrollHeight,
          clientHeight,
        } = document.documentElement;

        if (
          scrollTop + clientHeight >= scrollHeight - 150 &&
          hasMoreQuotes(currentPage, limit, total)
        ) {
          currentPage++;
          loadQuotes(currentPage, limit);
        }
      },
      {
        passive: true,
      }
    );

    // initialize
    loadQuotes(currentPage, limit);
  })();
}

// View bins-table
if (document.querySelector(".bin")) {
  (function () {
    let filterArr = [];
    const listElB = document.querySelector("tr");
    const loader = document.querySelector(".loader");
    const inputFilterB = document.querySelector(".input-filterB");
    inputFilterB ? (inputFilterB.value = "") : null;
    const selectFilterB = document.querySelector(".select-bookB");
    const btnSubB = document.querySelector(".btn-submitB");
    let start = true;

    // get the quotes from API
    const getQuotes = async (page, limit) => {
        try {
          const res = await axios({
            method: "GET",
            url: `${window.location.protocol}//${window.location.host}/api/v1/bins?page=${page}&limit=${limit}`,
          });
          return res;
        } catch (error) {
          console.log(error);
        }
      },
      convertWordToUtc = (str) => {
        let val = new Date(str).toDateString().split(" ")[2];
        let date = new Date(str);
        val < 10
          ? (date = `${date.getFullYear()}-0${
              date.getMonth() + 1
            }-${val}T00:00:00.000Z`)
          : (date = `${date.getFullYear()}-0${
              date.getMonth() + 1
            }-${val}T00:00:00.000Z`);
        return date;
      };

    convertUtctoWord = (str) => {
      let date = new Date(str).toDateString();
      date = `${date.split(" ")[2]} ${date.split(" ")[1]} ${
        date.split(" ")[3]
      }`;
      return date;
    };

    const getUnfiltered = async (search, value) => {
      if (search === "bookedFrom") {
        value = `${value.split("/")[0]}-${value.split("/")[1]}-${
          value.split("/")[2]
        }`;
      }

      try {
        const res = await axios({
          method: "GET",
          url: `${window.location.protocol}//${window.location.host}/api/v1/no-filter/bins/search/${search}/value/${value}`,
        });
        return res;
      } catch (error) {
        console.log(error);
      }
    };

    count = 0;

    const setValue = (val) => {
      listElB.insertAdjacentHTML("afterend", val);
      hideLoader();
    };

    // show the quotes
    const showQuotes = (data) => {
      let html = "";
      data.forEach((value) => {
        html += `<tr class="bin"><td>${value.clientName}</td><td>${
          value.clientEmail
        }</td><td>${value.clientPhoneNumber}</td><td>${
          value.hallname
        }</td><td>${value.attendance}</td><td>${
          value.event ? value.event : "N/A"
        }</td><td>${new Date(
          value.bookedFrom
        ).toDateString()}</td><td>${new Date(
          value.bookedTo
        ).toDateString()}</td><td>${
          !value.paid ? "unpaid" : "paid"
        }</td><td style="white-space: nowrap">&#8358 ${new Intl.NumberFormat().format(
          value.total
        )}</td><td>${
          value.discount
        }%</td><td><i onClick="runDeleteP(this)" id=${
          value._id
        }  class="fa fa-trash" style="color:#eb4d4b;display: flex;justify-content: center;cursor: pointer"></i><td><i id=${
          value._id
        } onClick="runRestore(this)"  class="fa fa-refresh" style="color:#20bf6b;display: flex;justify-content: center;cursor: pointer"></i></td></tr>`;
      });

      // console.log(html);
      setValue(html);
    };

    const setFilter = (val) => {
      Array.from(document.querySelectorAll("tr")).forEach((tr, i) => {
        if (i !== 0) {
          tr.remove();
        }
      });

      listElB.insertAdjacentHTML("afterend", val);
      hideLoader();
    };

    const showQuotesF = (data) => {
      let html = "";
      data.forEach((value) => {
        html += `<tr class="bin"><td>${value.clientName}</td><td>${
          value.clientEmail
        }</td><td>${value.clientPhoneNumber}</td><td>${
          value.hallname
        }</td><td>${value.attendance}</td><td>${
          value.event ? value.event : "N/A"
        }</td><td>${new Date(
          value.bookedFrom
        ).toDateString()}</td><td>${new Date(
          value.bookedTo
        ).toDateString()}</td><td>${
          !value.paid ? "unpaid" : "paid"
        }</td><td style="white-space: nowrap">&#8358 ${new Intl.NumberFormat().format(
          value.total
        )}</td><td>${
          value.discount
        }%</td><td><i onClick="runDeleteP(this)" id=${
          value._id
        }  class="fa fa-trash" style="color:#eb4d4b;display: flex;justify-content: center;cursor: pointer"></i><td><i id=${
          value._id
        } onClick="runRestore(this)"  class="fa fa-refresh" style="color:#20bf6b;display: flex;justify-content: center;cursor: pointer"></i></td></tr>`;
      });

      // console.log(html);
      setFilter(html);
    };

    const hideLoader = () => {
      loader ? loader.classList.remove("list-active") : null;
    };

    const showLoader = () => {
      loader ? loader.classList.add("list-active") : null;
    };

    const hasMoreQuotes = (page, limit, total) => {
      const startIndex = (page - 1) * limit + 1;
      return total === 0 || startIndex < total;
    };

    // load quotes
    const loadQuotes = async (page, limit) => {
      // show the loader
      showLoader();

      setTimeout(async () => {
        try {
          // if having more quotes to fetch
          if (hasMoreQuotes(page, limit, total)) {
            // call the API to get quotes
            const response = await getQuotes(page, limit);
            // show quotes
            console.log(response.data.data.bin);
            showQuotes(response.data.data.bin);
            // update the total
            total = response.data.data.count;
          }
        } catch (error) {
          return error.message;
        } finally {
          hideLoader();
        }
      }, 100);
    };
    let text = "";
    let queryVal = selectFilterB ? selectFilterB.value : null;

    const filterScript = (e) => {
      showLoader();
      // console.log(queryVal,inputFilter.value);

      getUnfiltered(queryVal, inputFilterB.value).then((data) => {
        console.log(data.data.data.bin);
        showQuotesF(data.data.data.bin);
      });
    };

    const changeScript = () => {
      queryVal = selectFilter.value;
    };

    btnSubB ? btnSubB.addEventListener("click", filterScript) : null;
    selectFilterB
      ? selectFilterB.addEventListener("change", changeScript)
      : null;

    // control variables
    let currentPage = 1;
    const limit = 50;
    let total = 0;

    window.addEventListener(
      "scroll",
      () => {
        const {
          scrollTop,
          scrollHeight,
          clientHeight,
        } = document.documentElement;

        if (
          scrollTop + clientHeight >= scrollHeight - 150 &&
          hasMoreQuotes(currentPage, limit, total)
        ) {
          currentPage++;
          loadQuotes(currentPage, limit);
        }
      },
      {
        passive: true,
      }
    );

    // initialize
    loadQuotes(currentPage, limit);
  })();
}

// Delete from table
const runDelete = (e) => {
  if (confirm("Are you sure you want to delete")) {
    deleteOneBook(e.id, localStorage.getItem("user_delete_id"));
  } else {
    console.log("no");
  }
};

// Delete from Bin
const runDeleteP = (e) => {
  if (confirm("Are you sure you want to delete permanently")) {
    deletePermanently(e.id);
  } else {
    console.log("no");
  }
};

// Restore to table
const runRestore = (e) => {
  if (confirm("Are you sure you want to restore")) {
    restoreBook(e.id);
  } else {
    console.log("no");
  }
};

// Delete single Booking
const deleteOneBook = async (id, user) => {
  try {
    const res = await axios(
      {
        method: "DELETE",
        url: `${location.protocol}//${location.host}/api/v1/bookings/${id}/${user}`,
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
    if (error.response.status === 401) {
      return showAlert("error", "Unauthorized");
    }
    showAlert("error", error);
  }
};

// Delete booking permanently
const deletePermanently = async (id) => {
  try {
    const res = await axios(
      {
        method: "DELETE",
        url: `${location.protocol}//${location.host}/api/v1/bins/${id}`,
      },
      {
        withCredentials: true,
      }
    );
    if (res.status === 204) {
      showAlert("success", "Reservation Deleted, redirecting.... ");
      window.setTimeout(() => {
        location.assign("/bookings-table");
      }, 1000);
    }
  } catch (error) {
    showAlert("error", error);
  }
};

// Restore Booking
const restoreBook = async (id) => {
  try {
    const res = await axios(
      {
        method: "GET",
        url: `${location.protocol}//${location.host}/api/v1/bins/restore/${id}`,
      },
      {
        withCredentials: true,
      }
    );
    if (res.status === 204) {
      showAlert("success", "Reservation Restored, redirecting.... ");
      window.setTimeout(() => {
        location.assign("/bookings");
      }, 1000);
    }
  } catch (error) {
    showAlert("error", error);
  }
};

// Hide alert on screen
const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

// Show alert on screen
const showAlert = (type, message, delayed) => {
  hideAlert();
  const markup = `<div class="alert alert__${type}">${message}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  if (delayed === true) window.setTimeout(this.hideAlert, 25000);
  window.setTimeout(this.hideAlert, 7000);
};

// check if discount value is a number
const isNumber = (e) => {
  let inputVal = "";

  let discount = document.querySelector(".payment__discount").value;

  let newDiscount = discount.split("");

  for (var i = 0; i <= newDiscount.length; i++) {
    if (
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
        newDiscount[i]
      )
    ) {
      inputVal += newDiscount[i];
    }
  }

  document.querySelector(".payment__discount").value = "";

  document.querySelector(".payment__discount").value = inputVal;
};

const croneJob = async () => {
  let today = new Date();

  let lastDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  ).toISOString();

  const res = await axios(
    {
      method: "DELETE",
      url: `${location.protocol}//${location.host}/api/v1/bookings/crone/day/${lastDay}`,
    },
    {
      withCredentials: true,
    }
  );
};

croneJob();
