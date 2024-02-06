
let url = "http://www.omdbapi.com/?&apikey=b1f4c1c5";

function textChange1()
{
    $("#brand").css("transition",".2s")
    $("#brand").html("HOME _ PAGE _");
}

function textBack1()
{
    $("#brand").css("transition",".2s")
    $("#brand").html("GALAXY MOVIE");
}

function inputHover()
{
    $("body").css("background-size","130vw 130vh");
}

function inputOutHover()
{
    $("body").css("background-size","100vw 100vh");
}


function search() 
{
    $(".result").empty();
    $("#back").empty();
    $(".result").css("justify-content", "left");
    $(".result").css("padding-left", "40px");
    $("body").css("background-image","none");    
    $("body").css("background-color","rgb(255, 140, 0)");
    let title = $("#UserInput").val();
    for (let a = 1; a<=6; a++) {
        URL = url + "&s=" + title +"&page="+a;
        $.get(URL, function(data) {
        for (let i=0; i<data.Search.length; i++) {
            if (data.Search[i].Poster != "N/A") {
                let imdB = data.Search[i].imdbID;
                $(".result").append("<div class=\"movie\"><img onmouseover=\"blurr(\'"+imdB+"\')\" onmouseout=\"notBlurr()\" onclick=\"detail(\'"+imdB+"\')\" class=\"poster "+imdB+"\" src=\""+data.Search[i].Poster+"\"></div>");
            }
        }
        })
    }
    $("#back").append("<b><p id=\"backAnswer\">RESULTS FOR \""+title.toUpperCase()+"\"</p></b>");
}

function blurr(id)
{
    $(".poster").css("opacity",".7");
    $("."+id).css("transition",".2s");
    $("."+id).css("opacity","1");
}

function notBlurr()
{
    $(".poster").css("transition",".2s");
    $(".poster").css("opacity","1");
}

function back()
{
    $("#back").empty();
    search();
}

function home()
{
    $(".result").empty();
    $("#back").empty();
    $("body").css("background-image","url(\"https://coolhdwall.com/storage/202105/dune-2021-movie-poster-4k-wallpaper-3840x2160-48.jpg\")");
    $(".result").append("<div id=\"intro\">Find your best moments here</div>");
    $(".result").css("justify-content", "center");
}


function getDetail(id)
{
    $.get(url+"&i="+id, function(data3) {
        $("#DetailedPoster").attr("src",data3.Poster);
        $("#title").html(data3.Title);
        $("#info1").html(data3.Year+" . "+data3.Rated+" . "+data3.Runtime);
        $("#imbdRating").html("<b>IMDb Rating: </b>" + data3.Ratings[0].Value + " &#9733");
        $("#category").html("<b>|  "+data3.Genre+"  |</b>");
        $("#plot").html(data3.Plot);
        $("#director").html("<b>Director: </b> "+data3.Director);
        $("#actors").html("<b>Cast</b>: " + data3.Actors);
})
}

function detail(id) 
{
    $(".result").empty();
    $("#back").empty();
    
    let add = `
    <div class="info">
                
    <div id="first">
        <img id="DetailedPoster">
        <div class="info1">
            <div id="title">⏳ Please wait for a sec ⏳</div>
            <br>
            <div id="info1"></div>
            <br>
            <div id="imbdRating"><b></b></div>
            <br>
            <div id="category"></div>
            <br>
            <div id="plot"></div>
        </div>
    </div>

    <div id="second">
        <div id="director"></div><br>
        <div id="actors"></div>                
    </div>

    </div>
    `;
    $(".result").css("justify-content", "center");
    $(".result").append(add);
    getDetail(id);
    $("#back").append("<button onclick=\"back()\">BACK</button>");
}