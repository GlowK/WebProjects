// $("body").css("background-color","green");

$("ul").on("click","li", function(){
    $(this).toggleClass("completed");
});

//Clikc on X to delete "Todo"
$("ul").on("click", "li span", function(event){
    $(this).parent().fadeOut(500, function(e){
        $(this).remove();
    });
    event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
    if(event.which === 13){
        //grabbing new value from the input
        var todoText = $(this).val();
        $(this).val("");
        //adding new li in ul
        $("ul").append("<li><span id='trashcan'><i class='fas fa-trash-alt'></i></span> " + todoText + "</li>")
    }
})

$("#toggle-form").click(function(){
	$("input[type='text']").fadeToggle();
});