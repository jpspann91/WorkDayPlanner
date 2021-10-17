//Declaration for day and time
moment(Date);
//Function to run the internal clock in jumbotron
function runTime(){
    //JQuery select currentDatTime element then call moment().format()
    $('#currentDateTime').text(moment().format('ddd MMM Do, YYYY, h:mm:ss:A'));
}

//setInterval for runTime to every second
setInterval(runTime, 1000);


//Variable to hold currenttime
var currentTime = moment();
//startingTime is 8am, work week is 8am - 5pm
var startingTime = moment().startOf('day').add(8, 'hours');

//Array to easily loop through all rows in military time
var slotArray = [8,9,10,11,12,13,14,15,16,17];

//Hold time for populating times at beginning or row
var time;

//For loop to loop through all elements with slot class (spans)
for(var i = 0; i < slotArray.length; i++){
    
    //if i is zero
    if(i == 0){
        //set time to starting time 
        time = startingTime.add(0,'h');
        //format time
        time = time.format('hh:mm:A');
        //set text for this slot to formatted time
        $('.slot' + slotArray[i]).text(time);  
    }
    //If i is not zero
    else{
        //add 1 to time
        time = startingTime.add(1,'h');
        //format time
        time = time.format('hh:mm:A');
        //set text for this slot to formatted time
        $('.slot' + slotArray[i]).text(time);
    }    
}

//checkTime method returns a string to set class
function checkTime(item){

    //set current time to time right with formatting
    currentTime = moment().startOf('hour').format('hh:mm:A');
    //Testing purposes
    console.log(currentTime);

    //Grab the modifier AM or PM
    var currentMod = currentTime.substring(6)
    //Grab first part of time string (Grabs the numbers for comparison)
    var currentInt = parseInt(currentTime.substring(0,2));

    //Testing purposes
    console.log(currentMod);

    //Changes to military time if PM
    if(currentInt < 12 && currentMod == "PM"){
        currentInt += 12;
    }
    //Testing purposes
    console.log(item);
    //Testing purposes
    console.log(currentInt);
    
    //If current time is after the time chosen
    if(currentInt > item){
        //return string "past"
        return 'past'; 
    }
    //If current time is before the time chosen
    else if(currentInt < item){
        //return string "future"    
        return 'future';  
    }
    //If current time is the same as time chosen
    else if(currentInt === item){
        //return string "present"
        return 'present';
    }
    
}

//Event listener for save button
$(".saveBtn").click(function () {
    //Prevents page reload for forms
    event.preventDefault();
    //Variable to hold what is held in the form submitted
    var formValue = $(this).siblings(".form-control").val();

    //If the form is empty
    if(formValue == "" || formValue == " "){
        //Update text to prompt user nothing was added
        $('.localStorageText').text("No Event Added");
        //Throw error to stop from moving forward
        throw new Error("Please enter in an event");
        
    }
    //Testing purposes
    console.log("Click Text Save");
    //Variable to hold the time slot clicked
    var listItem = $(this).parent().data("hour");

    //Update user that it saved to local storage
    $('.localStorageText').text("Added to Local Storage ✔️");
    
    //Set localStorage keys, listItem is key name, formValue is the value entered into the form
    localStorage.setItem(listItem, formValue);

    //Removes class for blank, required to be able to work properly
    $(this).siblings('.form-control').removeClass('blank');

    //Call checkTime, string returned is the class added to the form element
    $(this).siblings('.form-control').addClass(checkTime(listItem));

    
});

$('.deleteBtn').click(function() {
    //Prevents page reload from form
    event.preventDefault();
    //Testing purposes
    console.log("Click Test Delete")
    //Variable to hold what is held in the form submitted
    var formValue = $(this).siblings(".form-control").val();

    //If the form is empty
    if(formValue == "" || formValue == " "){
        //Prompt user that the there was no event to delete
        $('.localStorageText').text("No Event Deleted");
        //Throw error to stop everything moving forward
        throw new Error("No Event to delete");
        
    }
    //Variable to hold the time slot clicked
    var listItem = $(this).parent().data("hour");
    //Sets text in the form to nothing
    $(this).siblings('.form-control').val("");
    //add blank class to clear out the color 
    $(this).siblings('.form-control').addClass('blank');
    
    //Testing purposes
    console.log($(this).siblings('.form-control').val());
    
    //Prompt user that the event has been deleted 
    $('.localStorageText').text("Event Deleted ❌");
    
    //Removes listItem from local Storage
    localStorage.removeItem(listItem);
})

//Loop through local storage when page is loaded
for (var i = 0; i < slotArray.length; i++) {
    //variable to hold value at current local storage key
    var dataHour = localStorage.getItem(slotArray[i]);
    // Sets text in key to the current form
    $(".form" + slotArray[i]).val(dataHour);
    //variable to hold current form element
    var formEl = document.getElementsByClassName('.form' + slotArray[i]);
    //Set text to blank so it does not show [object Object]
    formEl.textContent = " ";
    
    //If dataHour variable has something in it
    if(!dataHour == ""){
        //Call checkTime function to set the color for the form when page is reloaded
        $(".form" + slotArray[i]).addClass(checkTime(slotArray[i]));
    }  
}