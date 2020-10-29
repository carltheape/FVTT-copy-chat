
Hooks.on("init", function() {

});

Hooks.on("ready", function() {
    // let chat = $(".chat-message");
    // // console.log(chat);
    // $(chat).each(function(i,el){
    //     console.log($(el).find('.message-copy'));
    //     if($(el).find('.message-copy').length === 0){
    //         $(el).children('header').prepend( "<a class='button message-copy'><i class='fas fa-copy'></i></a>" );
    //     }
    //     console.log($(el).find('.message-copy'));
    //     // console.log(
    //     //     $(el).text()
    //     // );
    //   });
    $("#chat-log").on('click', '.message-copy', function(event) {
        console.log($(event.target));
         if($(event.target).hasClass("message-copy") || $(event.target).parent().hasClass("message-copy")){
             //console.log($(event.target));
             let content = $(this).closest(".chat-message").text().replace(/\s+/g, " ");
             //console.log(content);
             copyToClipboard(content);
             ui.notifications.notify("Copied to clipboard");
         }
    });

    function copyToClipboard(text) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(text).select();
        document.execCommand("copy");
        $temp.remove();
    }
});

Hooks.on('createChatMessage', (chatMessage) => {
});
Hooks.on("renderChatMessage", (message, html, data) => {
    console.log(html);
    html.children('header').prepend( "<a class='button message-copy'><i class='fas fa-copy'></i></a>" );
});