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

var slotArray = [8,9,10,11,12,1,2,3,4,5];

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

$(".saveBtn").click(function () {
    event.preventDefault();
    var formValue = $(this).siblings(".form-control").val();
    console.log("Click Text Save");
    var listItem = $(this).parent().data("hour");
    
    
    $('.localStorageText').text("Added to Local Storage ✔️");
    
    
    localStorage.setItem(listItem, formValue);


    console.log($(this).siblings().children().text())

    currentTime = moment().startOf('hour').format('hh:mm:A');

    console.log(currentTime);

    time = $(this).siblings().children().text();

    console.log(time);

    

    // console.log($(this).siblings().eq(1).val())


        if(currentTime > time){
            $(this).siblings('.form-control').addClass('past');
            
            console.log("Success1");
        }
        else if(currentTime < time){
            $(this).siblings('.form-control').addClass('future');
            console.log("Success2");
        }
        else if(currentTime === time){
        
            $(this).siblings('.form-control').addClass('present');
            console.log("Success3");

        }


});

$('.deleteBtn').click(function() {
    event.preventDefault();
    console.log("Click Test Delete")
    var listItem = $(this).parent().data("hour");
    $(this).siblings('.form-control').val(" ")
    $(this).siblings('.form-control').addClass('blank');
        
    $('.localStorageText').text("Event Deleted ❌");
    
    localStorage.removeItem(listItem);

   
    
    
})




for (var i = 0; i < slotArray.length; i++) {
    var dataHour = localStorage.getItem(slotArray[i]);
    // form - control
    $(".form" + slotArray[i]).val(dataHour);
    // var formEl = document.getElementsByClassName('.form' + slotArray[i]);
    // // formEl.textContent = " ";
   
}