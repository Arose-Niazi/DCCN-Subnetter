var nextTableID = 0;

function println(string)
{
    document.getElementById("Output").innerHTML += string + "<BR>\n";
}

function printHeading(string, center, heading)
{
    if(heading == undefined)
        heading = "h3";
    if(center == true)
        document.getElementById("Output").innerHTML += "<div style=\"text-align: center;\"><"+heading+">" + string + "</"+heading+"></div>\n";
    else document.getElementById("Output").innerHTML += "<"+heading+">" + string + "</"+heading+">\n";
}

function clearOutput()
{
    document.getElementById("Output").innerHTML="";
}


function createTable(headings)
{

    document.getElementById("Output").innerHTML += "<div class='container'><div class='table' id='TableNo"+nextTableID+"'></div></div>";

    let string = "<div class='table-header'>";
    for(let i=0; i<headings.length; i++)
    {
        string += "<div class='header__item'><a id='"+headings[i]+"' class='filter__link' href='#'>" + headings[i] + "</a></div>";
        console.log(headings[i]);
    }

    document.getElementById("TableNo" + nextTableID).innerHTML += string+ "</div>";
    document.getElementById("TableNo" + nextTableID).innerHTML += "<div id='ContentTableNo"+nextTableID+"' class='table-content'></div>";
    nextTableID++;
}

function addTableRow(data)
{
    //data = data.split(",");
    let string = "<div class='table-row'>";
    for(let i=0; i<data.length; i++)
    {
        string += "<div class='table-data'>" + data[i] + "</div>";
    }

    document.getElementById("ContentTableNo" + (nextTableID - 1)).innerHTML += string+ "</div>";
}



/*
function createTable(headings)
{
    headings = headings.split(",");
    document.getElementById("Output").innerHTML += "<table id='TableNo"+nextTableID+"'></table>";

    let string = "<tr>";
    for(let i=0; i<headings.length; i++)
    {
        string += "<th>" + headings[i] + "</th>";
        console.log(headings[i]);
    }
    console.log(string);

    document.getElementById("TableNo" + nextTableID).innerHTML += string+ "</tr>";
    nextTableID++;
}

function addTableRow(data)
{
    data = data.split(",");
    let string = "<tr>";
    for(let i=0; i<data.length; i++)
    {
        string += "<td>" + data[i] + "</td>";
    }

    document.getElementById("TableNo" + (nextTableID - 1)).innerHTML += string+ "</tr>";
}*/