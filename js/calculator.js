// TODO - $(document).ready function
$(document).ready( function() {

    document.getElementById("txtHours").value = "1";
    document.getElementById("txtMinutes").value = "00";

    loadRanges();

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

    document.getElementById("txtMinutes").setAttribute("min", 1);
    document.getElementById("txtMinutes").setAttribute("max", 59);
    document.getElementById("txtMinutes").setAttribute("step", 1);

}

// TODO - function calculate
function calculate(){

    // https://www.tgmtruck.com/2021/07/convertir-tiempo-juego-tiempo-real-en.html

    var hours = document.getElementById("txtHours").value;
    var minutes = document.getElementById("txtMinutes").value;

    console.log("Datos ingresados: " + hours + ":" + minutes);

    var total_minutes_ingame = parseInt(hours) * 60 + parseInt(minutes);

    var game_time_scale = total_minutes_ingame / 19; // Euro truck Simulator 2 time scale "time compression": 1:19

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

}