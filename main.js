function createCalendar(elem, year, month, forMonth = false) {
    month = month - 1;
    let date = new Date(year, month);

    let calender = document.createElement('table');

    calender.className = forMonth ? 'month-calender' : 'year-calender';

    let fullMonth = date.toLocaleString('default', { month: 'long' });
    fullMonth += forMonth ? ` ${date.getFullYear()}` : '';
    let caption = document.createElement('caption');
    caption.append(document.createTextNode(fullMonth));
    calender.append(caption);


    let tHead = document.createElement('thead');
    let tBody = document.createElement('tbody');
    let tr = document.createElement('tr');
    let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    days.forEach(day => {
        let th = document.createElement('th');
        th.append(document.createTextNode(day));
        tr.append(th);
    });
    tHead.append(tr);
    calender.append(tHead);

    while (date.getMonth() === month) {
        let tr = document.createElement('tr');
        tBody.append(tr);
        for (let i = 0; i <= 6; i++) {
            let td = document.createElement('td');
            if (date.getDay() === i && date.getMonth() === month) {
                td.append(document.createTextNode(date.getDate()));
                date.setDate(date.getDate() + 1);
            }
            tr.append(td);
        }
    }

    calender.append(tBody);
    elem.append(calender);
}

function createMonthCalender(app, year, month) {
    if (month > 12 || month < 1) throw new Error('Wrong month.');
    createCalendar(app, year, month, true);
}

function createYearCalender(app, year) {
    let elem = document.createElement('div');
    elem.className = 'flex-box';
    let heading = document.createElement('h3');
    heading.append(document.createTextNode(`Calender of ${year}`));
    heading.style.textAlign = 'center';
    app.append(heading);
    app.append(elem);
    for (let i = 1; i <= 12; i++) {
        createCalendar(elem, year, i, false);
    }
}

let app = document.getElementById('app');
let today = new Date();

let dateSelector = document.getElementById('year-month');
dateSelector.value = `${today.getFullYear()}-${today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1}`;

createMonthCalender(app, today.getFullYear(), today.getMonth() + 1);

function showMonth() {
    let date = document.getElementById('year-month');

    if (date.value) {
        let [year, month] = date.value.split('-');
        while(app.firstChild){
            app.firstChild.remove();
        }

        createMonthCalender(app, year, month);
    }
}

function showYear() {
    let date = document.getElementById('year-month');

    if (date.value) {
        let [year, month] = date.value.split('-');
        while(app.firstChild){
            app.firstChild.remove();
        }

        createYearCalender(app, year);
    }
}