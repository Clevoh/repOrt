// start with january

months = ["Jan", "Feb", 'Mar', 
    'Apr', 'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
]
weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

function totalDays (month) {
    const totalDays = new Date(2024, month + 1, 0)
    return totalDays.getDate();
}

const func = () => {
    const bodyEle = document.getElementsByTagName('table');
    const div = document.createElement("div")
    const trEl = document.createElement("tr")

    for (let i = 0; i < months.length; i++) {
        const daysTotal = totalDays(i)
        const tableCaption = document.createElement("caption")
        tableCaption.className = "capfction"
        tableCaption.innerHTML = months[i]
        div.appendChild(tableCaption)
          
        weekday.forEach((el) => {
            const tdEl = document.createElement("td")
            tdEl.innerHTML = el
            trEl.appendChild(tdEl)
        })

        for (let j = 0; j < daysTotal; j + 6) {
            const tableRow = document.createElement("tr")
            tableRow.className = `table-row-${j}`
            div.appendChild(tableRow)
            for (let k = 0; k < j; k++) {
                const day = new Date(2024, i, k + 1).getDay()
                weekday.forEach((el, i) => {
                    const tdataEl = document.createElement("td")
                    tdataEl.className = `tdataEl-E${k}`
                    day === i ? tdataEl.innerHTML = k + 1 : tdataEl.innerHTML = ""
                    tableRow.appendChild(tdataEl)
                });
                
            }
        }
    }  
    bodyEle.innerHTML = div 
}