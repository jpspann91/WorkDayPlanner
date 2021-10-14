//Declaration for day and time
moment(Date);
//Function to run the internal clock in jumbotron
function runTime(){
    //JQuery select currentDatTime element with matching class call moment.format()
$('#currentDateTime').text(moment().format('ddd MMM do YYY, h:mm:ss'));
}

//setInterval for runTime to every second
setInterval(runTime, 1000);


//Variable to hold currenttime
var currentTime = moment();
//startingTime is 8am, work week is 8am - 5pm
var startingTime = moment().startOf('day').add(8, 'hours');

var slotArray = [8,9,10,11,12,1,2,3,4,5];

var times = []

for(var i = 0; i < slotArray.length; i++){
    
    if(i == 0){
        times[i] = startingTime.add(0,'h');
        times[i] = times[i].format('hh:mm:A');
        $('.slot' + slotArray[i]).text(times[i]);
        $('.form' + slotArray[i]).attr("placeholder", "");
    }
    else{
        times[i] = startingTime.add(1,'h');
        times[i] = times[i].format('hh:mm:A');
        $('.slot' + slotArray[i]).text(times[i]);
        $('.form' + slotArray[i]).attr("placeholder", "");
    }

    
}
currentTime = moment().startOf('hour');

for(var i = 0; i < slotArray.length; i++){
    currentTime = moment().startOf('hour');
    times[i] = moment().startOf('day').add(slotArray[i], 'hours')
    if(currentTime.isAfter(times[i]
        )){

    }

}

for (var i = 0; i < slotArray.length; i++) {
    var dataHour = localStorage.getItem(slotArray[i]);
    // form - control
    $(".form" + slotArray[i]).val(dataHour);
}

$(".saveBtn").click(function () {
    event.preventDefault();
    var formValue = $(this).siblings(".form-control").val();
    console.log("Click Text Save");
    var listItem = $(this).parent().data("hour");

    localStorage.setItem(listItem, formValue);

    $('.localStorageText').text("Added to local storage ✔️");
});

$('.deleteBtn').click(function() {
    event.preventDefault();
    var formValue = $(this).siblings(".form-control").val(" ");
    console.log("Click Test Delete")
    var listItem = $(this).parent().data("hour");

    if(formValue === " "){
        $('.localStorageText').text("No Event to Delete");
    }
    else{
        
        $('.localStorageText').text("Event Deleted ❌");
    }
    localStorage.setItem(listItem, formValue)
})

