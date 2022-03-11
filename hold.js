const eventDataObj = {};
const eventArr = [];

const date = new Date();
let dayPerTime = [];
// let start = true;
let curHallName = hallName.value;
const startDate = []; 
let bookingDate = [];
let multipleHallBook = []
const objData = {}
let prevRender = hallName.value;


const renderCal = () => {
    console.log('reload');

    
    console.log(multipleHallBook);
    const dateLists = []
    bookingDate = [];
    const start = []
    const month = date.getMonth();
    const indexOfFirstDay =  new Date(
    date.getFullYear(), 
    date.getMonth(),
    1
    ).getDay();

    const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
    ).getDate();

    const prevLatDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
    ).getDate(); 

    const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
    ).getDay ();

    const nextDays = 7 - lastDayIndex - 1;
    console.log(indexOfFirstDay)
    const monthArr = [
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
        "Dec"
    ];



    const dayz = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "sat"]


    if(curHallName) {
        getBookedDates(curHallName,`${date.getFullYear()}-0${date.getMonth()+1}-01T00:00:00.000Z`,`${date.getFullYear()}-0${date.getMonth()+1}-${lastDay}T00:00:00.000Z`).then((val) => {
            
            console.log(val);
            
            
               
            val.data.data.forEach(el => {
                const dbDateFrom = new Date(el.bookedFrom);
                const dbDateArrFrom = dbDateFrom.toDateString().split(' ');
                const dbDateTo = new Date(el.bookedTo);
                const dbDateArrTo = dbDateTo.toDateString().split(' ');
                const dayDiff = dateDiff(el.bookedFrom, el.bookedTo)
                // const dayDiff = `${dbDateArrTo[2] - dbDateArrFrom[2]}`;
                // const monthDiff = `${el.bookedTo.split('-')[1] - el.bookedFrom.split('-')[1]}`;
                // const monthDiff = `${el.bookedTo.split('-')[1] - el.bookedFrom.split('-')[1]}`;
                // console.log(el.bookedFrom);
                if(el.bookedFrom === el.bookedTo) {
                    start.push(0)
                    dateLists.push(`${dbDateArrFrom[2]} ${dbDateArrFrom[1]} ${dbDateArrFrom[3]}`)
                    
                } else {
                    
                    let counter = 0
                    while (counter <= dayDiff) {
                        const bookedDate = new Date(el.bookedFrom);
                        bookedDate.setDate(bookedDate.getDate() + counter);
                        
                        start.push(counter)
                        
                        counter = counter + 1;
                        
                        dateLists.push(`${bookedDate.toDateString().split(' ')[2]} ${bookedDate.toDateString().split(' ')[1]} ${bookedDate.toDateString().split(' ')[3]}`)
                        
                    }
                    
                }
               
            });

            console.log(start);

            console.log(dateLists);
            console.log(start)
                    
            calenderMntGrpH1.innerHTML = monthArr[month];
            
            calenderMntGrpP.innerHTML = date.toDateString();
            let days = ''; 
            
            for (let x = indexOfFirstDay; x > 0; x--) {
                if (month === 0) {
                    days += `<div id="${prevLatDay - x + 1} ${monthArr[11]} ${date.getFullYear() - 1}" class="calender__prev_date">${prevLatDay - x + 1}</div>`;
                    dayPerTime.push(`${prevLatDay - x + 1} ${monthArr[11]} ${date.getFullYear() - 1}`)
                } else  {
                    days += `<div id="${prevLatDay - x + 1} ${monthArr[month - 1]} ${date.getFullYear()}" class="calender__prev_date">${prevLatDay - x + 1}</div>`;
                    dayPerTime.push(`${prevLatDay - x + 1} ${monthArr[month - 1]} ${date.getFullYear()}`)
                }
                calenderDays.innerHTML = days;
            }
            
            for (let i = 1; i <= lastDay; i++) {
                let inStorage = localStorage.getItem(curHallName);
                let inStorageTo = localStorage.getItem(curHallName);
                
                   
                if (inStorage) {
                   
                    inStorage = JSON.parse(inStorage);
                    inStorageTo = JSON.parse(inStorageTo)
                    inStorage = new Date(inStorage.bookedFrom).toDateString();
                    inStorage = `${inStorage.split(' ')[2]} ${inStorage.split(' ')[1]} ${inStorage.split(' ')[3]}`;
                    inStorageTo = new Date(inStorageTo.bookedTo).toDateString();
                    inStorageTo = `${inStorageTo.split(' ')[2]} ${inStorageTo.split(' ')[1]} ${inStorageTo.split(' ')[3]}`;
                    
                    

                    if (i < 10) {

                        if(`0${i} ${monthArr[month]} ${date.getFullYear()}` === inStorage || `0${i} ${monthArr[month]} ${date.getFullYear()}` === inStorageTo) {

                            if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {

                                days += `<div id="0${i} ${monthArr[month]} ${date.getFullYear()}" class="today active">${i}</div>`
                                dayPerTime.push(`0${i} ${monthArr[month]} ${date.getFullYear()}`)
                               
                                
                                bookingDate.push(convertUtcToWord(`0${i} ${monthArr[month]} ${date.getFullYear()}`))

                            } else {
                                
                               
                                days += `<div id="0${i} ${monthArr[month]} ${date.getFullYear()}" class="active">${i}</div>`;
                                dayPerTime.push(`0${i} ${monthArr[month]} ${date.getFullYear()}`)  
                                
                                bookingDate.push(convertUtcToWord(`0${i} ${monthArr[month]} ${date.getFullYear()}`))
                               
                            }
                            calenderDays.innerHTML = days;
                            
                        } else {
                            if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {

                                days += `<div id="0${i} ${monthArr[month]} ${date.getFullYear()}" class="today">${i}</div>`
                                dayPerTime.push(`0${i} ${monthArr[month]} ${date.getFullYear()}`)
                               
                                

                            } else {
                               
                               
                                days += `<div id="0${i} ${monthArr[month]} ${date.getFullYear()}">${i}</div>`;
                                dayPerTime.push(`0${i} ${monthArr[month]} ${date.getFullYear()}`)     

                                
                            }
                            calenderDays.innerHTML = days;
                        }
                        
                    } else {
                        
                        if(`${i} ${monthArr[month]} ${date.getFullYear()}` === inStorage || `${i} ${monthArr[month]} ${date.getFullYear()}` === inStorageTo) {

                            if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {

                                days += `<div id="${i} ${monthArr[month]} ${date.getFullYear()}" class="today active">${i}</div>`
                                dayPerTime.push(`${i} ${monthArr[month]} ${date.getFullYear()}`)

                                bookingDate.push(convertUtcToWord(`0${i} ${monthArr[month]} ${date.getFullYear()}`))
                                
                            } else {
                               
                                days += `<div id="${i} ${monthArr[month]} ${date.getFullYear()}" class="active">${i}</div>`;
                                dayPerTime.push(`${i} ${monthArr[month]} ${date.getFullYear()}`)     

                                bookingDate.push(convertUtcToWord(`0${i} ${monthArr[month]} ${date.getFullYear()}`))
                                
                            }
                            calenderDays.innerHTML = days;

                        } else {
                            if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {

                                days += `<div id="${i} ${monthArr[month]} ${date.getFullYear()}" class="today">${i}</div>`
                                dayPerTime.push(`${i} ${monthArr[month]} ${date.getFullYear()}`)
                                
                            } else {
                               
                                days += `<div id="${i} ${monthArr[month]} ${date.getFullYear()}">${i}</div>`;
                                dayPerTime.push(`${i} ${monthArr[month]} ${date.getFullYear()}`)     
                                
                            }
                            calenderDays.innerHTML = days;
                        }
                        
                    }

                    
                    
                } else {
                    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
                        if (i < 10) {
                            days += `<div id="0${i} ${monthArr[month]} ${date.getFullYear()}" class="today">${i}</div>`
                            dayPerTime.push(`0${i} ${monthArr[month]} ${date.getFullYear()}`)
                        } else {
                            days += `<div id="${i} ${monthArr[month]} ${date.getFullYear()}" class="today">${i}</div>`
                            dayPerTime.push(`${i} ${monthArr[month]} ${date.getFullYear()}`)
                        }
                        calenderDays.innerHTML = days;
                    } else {
                        if (i < 10) {
                            days += `<div id="0${i} ${monthArr[month]} ${date.getFullYear()}" >${i}</div>`;
                            dayPerTime.push(`0${i} ${monthArr[month]} ${date.getFullYear()}`)
                        } else {
                            days += `<div id="${i} ${monthArr[month]} ${date.getFullYear()}" >${i}</div>`;
                            dayPerTime.push(`${i} ${monthArr[month]} ${date.getFullYear()}`)
                        }
                        calenderDays.innerHTML = days;
                    }
                   
                }
            
                calenderDays.innerHTML = days;
                
            }

        
            for (let j = 1; j <= nextDays; j++) {
    
                if (month === 11) {
                    days += `<div id="0${j} ${monthArr[0]} ${date.getFullYear() + 1}" class="calender__next_date">${j}</div>`;
                    dayPerTime.push(`0${j} ${monthArr[0]} ${date.getFullYear() + 1}`)
                } else {
                    days += `<div id="0${j} ${monthArr[month + 1]} ${date.getFullYear()}" class="calender__next_date">${j}</div>`;
                    dayPerTime.push(`0${j} ${monthArr[month + 1]} ${date.getFullYear()}`)
                }
                calenderDays.innerHTML = days;
            }


            if(localStorage.getItem(`${curHallName}`)) {
                let exist = localStorage.getItem(prevRender);
                exist = JSON.parse(exist)
                objData.clientName = clientName.value;
                objData.clientPhoneNumber = clientTel.value;
                objData.clientEmail = email.value;
                objData.attendance = attendance.value;
                objData.event = prog.value;
                objData.hallname = curHallName;
                objData.bookedFrom = exist.bookedFrom;
                objData.bookedTo = exist.bookedTo;
            } else {
                objData.clientName = clientName.value;
                objData.clientPhoneNumber = clientTel.value;
                objData.clientEmail = email.value;
                objData.attendance = attendance.value;
                objData.event = prog.value;
                objData.hallname = curHallName;
                objData.bookedFrom = bookingDate[0];
                objData.bookedTo = bookingDate[1];
            }

            

            localStorage.setItem(`${prevRender}-data`, JSON.stringify(objData))
    
            dayPerTime = dayPerTime.filter(val => dateLists.includes(val));
            console.log(dayPerTime);
            console.log(bookingDate)
    
            let begin = 0;
            const divArr = Array.from(document.querySelectorAll('.calender__days div')).map(e => e.id)
        
            console.log(divArr.length);
            let w = 0
            let k = 0
            
            while (w < divArr.length || begin < dayPerTime.length )  {
                
                
                if (dayPerTime[begin] !== divArr[w]) {
                    // || divArr[w] === `${jsonObjTo.split(' ')[2]} ${jsonObjTo.split(' ')[1]} ${jsonObjTo.split(' ')[3]}`
                    // 
                    

                    document.getElementById(`${divArr[w]}`).addEventListener('click', (e) => {

                        e.target.classList.toggle('active')
                        // 04 Feb 2022
                        // 2022-02-25T00:00:00.000Z
    
                        const splitted = e.target.id.split(' ');
    
                        const ttt = monthArr.indexOf(splitted[1]) + 1;
    
                        const splittedVal = `${splitted[2]}-${monthArr.indexOf(splitted[1]) + 1}-${splitted[0]}T00:00:00.000Z`;
                        
                        if(bookingDate.length > 1) {
                            bookingDate = [];
                            showAlert('error', 'Cannot choose more than two dates, select a starting date and an end date');
                            Array.from(document.querySelectorAll('.calender__days div')).forEach(div => {
                                div.classList.remove('active')
                            })

                            

                            localStorage.removeItem(curHallName);
                            
                            throw new Error('cannot choose more than two dates, select a start date and an end date')
                        } else {

                           

                            diffDate = dateDiff(bookingDate[0], `${splitted[2]}-0${monthArr.indexOf(splitted[1]) + 1}-${splitted[0]}T00:00:00.000Z`)

                            if(diffDate < 1) {
                                bookingDate = [];
                                showAlert('error', 'Ending date cannot be before starting date, select a starting date and then an end date');
                                Array.from(document.querySelectorAll('.calender__days div')).forEach(div => {
                                    div.classList.remove('active')
                                })
                                
                                throw new Error('cannot choose more than two dates, select a start date and an end date')
                            };

                            if (localStorage.getItem(curHallName)) {
                                localStorage.removeItem(curHallName)
                            }
                            
                            bookingDate.push(`${splitted[2]}-0${monthArr.indexOf(splitted[1]) + 1}-${splitted[0]}T00:00:00.000Z`);
                            
                            
                            localStorage.setItem(curHallName, JSON.stringify({hallName: curHallName,bookedFrom:bookingDate[0],bookedTo: bookingDate[1]}))
                            
                            if (multipleHallBook.length > 0) {
                                multipleHallBook.pop()
                                multipleHallBook.push({
                                    hallName: curHallName,
                                    bookedFrom: bookingDate[0],
                                    bookedTo: bookingDate[1]
                                })
                            } else {
                                multipleHallBook.push({
                                    hallName: curHallName,
                                    bookedFrom: bookingDate[0],
                                    bookedTo: bookingDate[1] 
                                })
                            }
                           
                        }

                        console.log(bookingDate);
                        console.log(multipleHallBook);

                        // ttt < 10 ? console.log() : console.log(`${splitted[2]}-${monthArr.indexOf(splitted[1]) + 1}-${splitted[0]}T00:00:00.000Z`)
                        
                        
                    });
                   
                } else {
                    
                    
                   
                    
                    if (start[k] === 0) {

                        console.log(`${divArr[w]}`);

                        document.getElementById(`${divArr[w]}`).classList.add('start');

                        document.getElementById(`${divArr[w]}`).addEventListener('mouseover', (e) => {

                            const splitted = e.target.id.split(' ');
    
                            const ttt = monthArr.indexOf(splitted[1]) + 1;

                            console.log('hi');
        
                            getbookedDataOnHover(curHallName,`${splitted[2]}-0${monthArr.indexOf(splitted[1]) + 1}-${splitted[0]}T00:00:00.000Z`).then((bkdData) => {

                                // const bookedObj = convertArrayToObject(bkdData.data.data, e.target.id)

                                // console.log(bookedObj);
                                console.log(bkdData.data.data[0].clientName);
                                
                                modal.classList.add('active')
                                modal.innerHTML = `<h2>${bkdData.data.data[0].clientName}</h2><center><p>Email: ${bkdData.data.data[0].clientEmail}</p></center>
                                <p>Attendance: ${bkdData.data.data[0].attendance}</p><p>Hall Name: ${bkdData.data.data[0].hallname}</p><p>Phone Number: ${bkdData.data.data[0].clientPhoneNumber}</p><p>from: ${new Date(bkdData.data.data[0].bookedFrom).toDateString()}</p><p>To: ${new Date(bkdData.data.data[0].bookedTo).toDateString()}</p>`

                                setTimeout(() => {
                                    modal.classList.remove('active')
                                }, 5000);
                            })
                            
                            
                            // : getbookedDataOnHover(hallName, `${splitted[2]}-${monthArr.indexOf(splitted[1]) + 1}-${splitted[0]}T00:00:00.000Z`)
                        })
                        
                    } else {
                        document.getElementById(`${divArr[w]}`).classList.add('selected');
                    }
                    k++;
                    begin = begin + 1;
                    console.log(k, start[k]);
                    
                }
    
               
                
                w++;
            }

            prevRender = curHallName;

            console.log(prevRender);

           
        }).catch((e) => {
            // console.log(e);
        });
    } else {
        calenderMntGrpH1.innerHTML = monthArr[month];
            
            calenderMntGrpP.innerHTML = date.toDateString();
            let days = ''; 
            
            for (let x = indexOfFirstDay; x > 0; x--) {
                if (month === 0) {
                    days += `<div id="${prevLatDay - x + 1} ${monthArr[11]} ${date.getFullYear() - 1}" class="calender__prev_date">${prevLatDay - x + 1}</div>`;
                    dayPerTime.push(`${prevLatDay - x + 1} ${monthArr[11]} ${date.getFullYear() - 1}`)
                } else  {
                    days += `<div id="${prevLatDay - x + 1} ${monthArr[month - 1]} ${date.getFullYear()}" class="calender__prev_date">${prevLatDay - x + 1}</div>`;
                    dayPerTime.push(`${prevLatDay - x + 1} ${monthArr[month - 1]} ${date.getFullYear()}`)
                }
                calenderDays.innerHTML = days;
            }
            
            for (let i = 1; i <= lastDay; i++) {
            
                if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
                    if (i < 10) {
                        days += `<div id="0${i} ${monthArr[month]} ${date.getFullYear()}" class="today">${i}</div>`
                        dayPerTime.push(`0${i} ${monthArr[month]} ${date.getFullYear()}`)
                    } else {
                        days += `<div id="${i} ${monthArr[month]} ${date.getFullYear()}" class="today">${i}</div>`
                        dayPerTime.push(`${i} ${monthArr[month]} ${date.getFullYear()}`)
                    }
                } else {
                    if (i < 10) {
                        days += `<div id="0${i} ${monthArr[month]} ${date.getFullYear()}" >${i}</div>`;
                        dayPerTime.push(`0${i} ${monthArr[month]} ${date.getFullYear()}`)
                    } else {
                        days += `<div id="${i} ${monthArr[month]} ${date.getFullYear()}" >${i}</div>`;
                        dayPerTime.push(`${i} ${monthArr[month]} ${date.getFullYear()}`)
                    }
                }
                calenderDays.innerHTML = days;
            }
    
        
            for (let j = 1; j <= nextDays; j++) {
    
                if (month === 11) {
                    days += `<div id="0${j} ${monthArr[0]} ${date.getFullYear() + 1}" class="calender__next_date">${j}</div>`;
                    dayPerTime.push(`0${j} ${monthArr[0]} ${date.getFullYear() + 1}`)
                } else {
                    days += `<div id="0${j} ${monthArr[month + 1]} ${date.getFullYear()}" class="calender__next_date">${j}</div>`;
                    dayPerTime.push(`0${j} ${monthArr[month + 1]} ${date.getFullYear()}`)
                }
                calenderDays.innerHTML = days;
            }
    
            dayPerTime = dayPerTime.filter(val => dateLists.includes(val));
            console.log(dayPerTime);
    
            let begin = 0;
            const divArr = Array.from(document.querySelectorAll('.calender__days div')).map(e => e.id)
        
            console.log(divArr.length);
            let w = 0
    
            while (w < divArr.length || begin < dayPerTime.length)  {
                
                
                // console.log(document.getElementById(`${divArr[w]}`));
    
                if (dayPerTime[begin] !== divArr[w]) {
                    document.getElementById(`${divArr[w]}`).addEventListener('click', (e) => {
    
                        e.target.classList.toggle('active')
                        // 04 Feb 2022
                        // 2022-02-25T00:00:00.000Z
    
                        const splitted = e.target.id.split(' ');
    
                        const ttt = monthArr.indexOf(splitted[1]) + 1;
    
                        const splittedVal = `${splitted[2]}-${monthArr.indexOf(splitted[1]) + 1}-${splitted[0]}T00:00:00.000Z`
                        
                        ttt < 10 ? console.log(`${splitted[2]}-0${monthArr.indexOf(splitted[1]) + 1}-${splitted[0]}T00:00:00.000Z`) : console.log(`${splitted[2]}-${monthArr.indexOf(splitted[1]) + 1}-${splitted[0]}T00:00:00.000Z`)
                    });
                } else {
                    
    
                    document.getElementById(`${divArr[w]}`).classList.add('selected');
                    document.getElementById(`${divArr[w]}`).addEventListener('mouseover', () => {
                        const ttt = monthArr.indexOf(splitted[1]) + 1;
    
                        ttt < 10 ? getbookedDataOnHover(hallName,`${splitted[2]}-0${monthArr.indexOf(splitted[1]) + 1}-${splitted[0]}T00:00:00.000Z`) : getbookedDataOnHover(hallName, `${splitted[2]}-${monthArr.indexOf(splitted[1]) + 1}-${splitted[0]}T00:00:00.000Z`)
                        
                    })
                    begin = begin + 1;
                }

                w++;
            }
    
        
    
           
    }
 
}

const getLocalStorage = (hallname,cb) => {

    let newArr = [];

    hallname.forEach(hall => {
        console.log(hall);
        
        if (localStorage.getItem(`${hall}-data`)) {
            
            let newDataGrp = JSON.parse(localStorage.getItem(`${hall}-data`))
            const newData = JSON.parse(localStorage.getItem(`${hall}`))
            

            newArr.push(newDataGrp)

            
        } else {
            console.log('false');
        }
    })
    console.log(newArr);
    cb(newArr)
}

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    renderCal();

    setTimeout(() => {
        getLocalStorage(eventHalls, (cb) => {
            console.log(cb);
            // createMultipleBook(cb);
        })
    }, 2000);
        
})


hallName.addEventListener('change', (e) => {
    e.preventDefault();
    curHallName = e.target.value;
    renderCal()
})


calenderLftArr.addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    renderCal();
})

calenderRhtArr.addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    renderCal();
})


const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };
  


const getBookedDates = async (hallname, from, to) => {
	try {
		const res = await axios({
			method: 'GET',
			url: `${window.location.protocol}//${window.location.host}/api/v1/bookingss/getavailability/halls/${hallname}/from/${from}/to/${to}`,
		});
		return res;
	} catch (error) {
		showAlert('error', error.response.data.message);
		console.log(error);
	}
};

const dateDiff = (from, to) => {
    // JavaScript program to illustrate 
    // calculation of no. of days between two date 
  
    // To set two dates to two variables
    var date1 = new Date(from);
    var date2 = new Date(to);
    
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
    
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    
    //To display the final no. of days (result)
    return Difference_In_Days
}



const getbookedDataOnHover = async (hallname, from) => {
    try {
		const res = await axios({
			method: 'GET',
			url: `${window.location.protocol}//${window.location.host}/api/v1/bookingz/getavailability/hall/${hallname}/from/${from}`,
		});
		return res;
	} catch (error) {
		// showAlert('error', error.response.data.message);
		console.log(error);
	}
}



const createOneBook = async(options) => {
	try {
		showAlert('success', 'Reservation processing, please wait.... ', true);
		const res = await axios(
			{
				method: 'POST',
				url: `${location.protocol}//${location.host}/api/v1/bookings`,
				data: { ...options },
			},
			{
				withCredentials: true,
			}
		);
		
		if (res.status === 201) {
			showAlert('success', 'Booking successful');
			window.setTimeout(() => {
				location.assign('/bookings');
                localStorage.clear();
			}, 1500);
		}
	} catch (error) {
		console.log(error);
		if (error.response.status === 11000) {
            
			showAlert('error', error.response.data.error);
		} else {
			showAlert('error', error.response.data.error);
		}
	}
}



const createMultipleBook = async(options) => {
	try {
		showAlert('success', 'Reservation processing, please wait.... ', true);
		const res = await axios(
			{
				method: 'POST',
				url: `${location.protocol}//${location.host}/api/v1/bookings/many`,
				data: [ ...options ],
			},
			{
				withCredentials: true,
			}
		);
		
		if (res.status === 201) {
			showAlert('success', 'Booking successful');
			window.setTimeout(() => {
				location.assign('/bookings');
                localStorage.clear();
			}, 1500);
		}
	} catch (error) {
		
		if (error.response.status === 11000) {
            console.log(error.response.status);
			showAlert('error', error.response.data.error);
		} else {
			showAlert('error', error.response.data.error);
		}
	}
}

const hideAlert = () => {
	const el = document.querySelector('.alert');
	if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, message, delayed) => {
	hideAlert();
	const markup = `<div class="alert alert__${type}">${message}</div>`;
	document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
	if (delayed === true) window.setTimeout(hideAlert, 25000);
	window.setTimeout(hideAlert, 7000);
};

const convertUtcToWord = (str) => {
    let val = new Date(str).toDateString().split(' ')[2]
    let date = new Date(str);
    val < 10 ? date = `${date.getFullYear()}-0${date.getMonth()+1}-0${val}T00:00:00.000Z`: date = `${date.getFullYear()}-0${date.getMonth()+1}-${val}T00:00:00.000Z`
    return date;
}

const convertWordToUtc = (str) => {
    let date = new Date(str).toDateString();
    date = `${date.split(' ')[2]} ${date.split(' ')[1]} ${date.split(' ')[3]}`;

    return date;
}

console.log(new Date('24 Feb 2022').toDateString())
