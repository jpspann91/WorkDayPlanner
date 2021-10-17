//Declaration for day and time
moment(Date);
//Function to run the internal clock in jumbotron
function runTime(){
    //JQuery select currentDatTime element with matching class call moment.format()
$('#currentDateTime').text(moment().format('ddd MMM Do, YYYY, h:mm:ss:A'));
}

//setInterval for runTime to every second
setInterval(runTime, 1000);


//Variable to hold currenttime
var currentTime = moment();
//startingTime is 8am, work week is 8am - 5pm
var startingTime = moment().startOf('day').add(8, 'hours');

var slotArray = [8,9,10,11,12,13,14,15,16,17];

var time;

function resetTime(){
    time = 0;
    return
}


for(var i = 0; i < slotArray.length; i++){
    
    if(i == 0){
        time = startingTime.add(0,'h');
        time = time.format('hh:mm:A');
        $('.slot' + slotArray[i]).text(time);  
    }
    else{
        time = startingTime.add(1,'h');
        time = time.format('hh:mm:A');
        $('.slot' + slotArray[i]).text(time);
    }
       
}

resetTime();



function checkTime(item){

    currentTime = moment().startOf('hour').format('hh:mm:A');
    console.log(currentTime);

    var currentMod = currentTime.substring(6)
    var currentInt = parseInt(currentTime.substring(0,2));

    
    console.log(currentMod);

    if(currentInt < 12 && currentMod == "PM"){
        currentInt += 12;
    }
    console.log(item);
    console.log(currentInt);
    

    if(currentInt > item){
        console.log("Success1");
                return 'past';
            
        }
        else if(currentInt < item){
            console.log("Success2");
            return 'future';
            
        }
        else if(currentInt === item){
            console.log("Success3");
            return 'present';
            
    
        }
    
}

$(".saveBtn").click(function () {
    event.preventDefault();
    var formValue = $(this).siblings(".form-control").val();

    if(formValue == "" || formValue == " "){
        // alert("Please enter an event");
        $('.localStorageText').text("No Event Added");
        throw new Error("Please enter in an event");
        
    }

    console.log("Click Text Save");
    var listItem = $(this).parent().data("hour");

    $('.localStorageText').text("Added to Local Storage ✔️");
    
    localStorage.setItem(listItem, formValue);

    $(this).siblings('.form-control').removeClass('blank');

    $(this).siblings('.form-control').addClass(checkTime(listItem));

    
});

$('.deleteBtn').click(function() {
    event.preventDefault();
    console.log("Click Test Delete")

    var formValue = $(this).siblings(".form-control").val();

    if(formValue == "" || formValue == " "){
        // alert("No Event to Delete");
        $('.localStorageText').text("No Event Deleted");
        throw new Error("No Event to delete");
        
    }
    var listItem = $(this).parent().data("hour");
    $(this).siblings('.form-control').val(" ");
    $(this).siblings('.form-control').addClass('blank');
    // $(this).siblings('.form-control').css('background-color', 'white');
    
    console.log($(this).siblings('.form-control').val());
    

    $('.localStorageText').text("Event Deleted ❌");
    
    localStorage.removeItem(listItem);
    
})




for (var i = 0; i < slotArray.length; i++) {
    var dataHour = localStorage.getItem(slotArray[i]);
    // form - control
    $(".form" + slotArray[i]).val(dataHour);
    var formEl = document.getElementsByClassName('.form' + slotArray[i]);
    formEl.textContent = " ";
    
    if(!dataHour == ""){
        $(".form" + slotArray[i]).addClass(checkTime(slotArray[i]));
    }

   
}
$('.eventList').sortable();