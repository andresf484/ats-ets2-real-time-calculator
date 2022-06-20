// TODO - $(document).ready function
$(document).ready( function() {

    //document.getElementById("txtHours").value = "1";
    //document.getElementById("txtMinutes").value = "00";

    loadRanges();

    document.getElementById("txtHours").disabled = true;
    document.getElementById("txtMinutes").disabled = true;

    let load_table = '';
    load_table +=`
    <tr>
        <td class="text-center">00:00</td>
        <td class="text-center">00:00</td>
    </tr>
    `;

    document.getElementById("data_table").innerHTML = load_table;

});

// TODO - function loadMinutesRange
function loadRanges(){

    /* https://stackoverflow.com/questions/32378590/set-date-input-fields-max-date-to-today */
    document.getElementById("txtHours").setAttribute("min", 0);
    document.getElementById("txtHours").setAttribute("step", 1);

    document.getElementById("txtMinutes").setAttribute("min", 0);
    document.getElementById("txtMinutes").setAttribute("max", 59);
    document.getElementById("txtMinutes").setAttribute("step", 1);

}

// TODO - function validateHours
function validateHours(){
    let hours = document.getElementById("txtHours").value;
    if(!isNaN(hours) && hours != '' && hours >= 0){
        document.getElementById("txtHours").value = hours;
        return hours;
    }else if(!isNaN(hours) && hours != '' && hours < 0){
        document.getElementById("txtHours").value = 0;
        return '0';
    }
}

// TODO - function validateMinutes
function validateMinutes(){
    let minutes = document.getElementById("txtMinutes").value;
    if(!isNaN(minutes) && minutes != '' && (minutes >= 0 && minutes <= 59)){
        document.getElementById("txtMinutes").value = minutes;
        return minutes;
    }else if( !isNaN(minutes) && minutes != '' && minutes < 0 ){
        document.getElementById("txtMinutes").value = 0;
        return '0';
    }else if( !isNaN(minutes) && minutes != '' && minutes > 59 ){
        document.getElementById("txtMinutes").value = 59;
        return '59';
    }
}

// TODO - function calculate
function calculate(){

    // https://www.tgmtruck.com/2021/07/convertir-tiempo-juego-tiempo-real-en.html

    var ats = document.getElementById("rdoATS").checked;
    //console.log(ats);
    
    var ets2eu = document.getElementById("rdoETS2EU").checked;
    //console.log(ets2eu);
    
    var ets2uk = document.getElementById("rdoETS2UK").checked;
    //console.log(ets2uk);

    if(ats == true) {
        //console.log("ATS");
        var scale = 20;
        document.getElementById("txtHours").disabled = false;
        document.getElementById("txtMinutes").disabled = false;
    }else if(ets2eu == true){
        //console.log("ETS2EU");
        var scale = 19;
        document.getElementById("txtHours").disabled = false;
        document.getElementById("txtMinutes").disabled = false;
    }else if(ets2uk == true){
        //console.log("ETS2UK");
        var scale = 15;
        document.getElementById("txtHours").disabled = false;
        document.getElementById("txtMinutes").disabled = false;
    }else{
        document.getElementById("txtHours").disabled = true;
        document.getElementById("txtMinutes").disabled = true;
    }


    let hours = validateHours();
    let minutes = validateMinutes();

    if ( (!isNaN(hours) && hours != '') && (!isNaN(minutes) && minutes != '') ) {

        var total_minutes_ingame = parseInt(hours) * 60 + parseInt(minutes);
    
        var game_time_scale = total_minutes_ingame / scale; // Euro truck Simulator 2 time scale "time compression": 1:19
    
        let load_table = "";
    
        // 	Tiempo convertido a la realidad
        if ( game_time_scale >= 60) {
        
            var converted_hours = game_time_scale / 60;
        
            load_table +=`
    
            <tr>
                <td class="text-center">`+hours+`:`+minutes+`</td>
                <td class="text-center">`+``+` `+converted_hours.toFixed(2)+` Horas</td>
            </tr>
    
            `;
    
        } else {
            
            load_table +=`
    
            <tr>
                <td class="text-center">`+hours+`:`+minutes+`</td>
                <td class="text-center">`+``+` `+game_time_scale.toFixed(2)+` Minutos</td>
            </tr>
    
            `;
    
        }
    
        document.getElementById("data_table").innerHTML = load_table;

    }else{

        let load_table = '';
        load_table +=`
        <tr>
            <td class="text-center">00:00</td>
            <td class="text-center">00:00</td>
        </tr>
        `;

        document.getElementById("data_table").innerHTML = load_table;

    }

}