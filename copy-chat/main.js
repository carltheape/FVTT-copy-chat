
Hooks.on("init", function() {
    console.log("Copy Chat ENABLED");
});

Hooks.on("ready", function() {
    $("#chat-log").on('click', '.message-copy', function(event) {
        // console.log($(event.target));
         if($(event.target).hasClass("message-copy") || $(event.target).parent().hasClass("message-copy")){
             //console.log($(event.target));
             let content = $(this).closest(".chat-message").text().replace(/\s+/g, " ");
             //console.log(content);
             copyToClipboard(content.trim());
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
    // console.log(html);
    html.children('header').prepend( "<a class='button message-copy'><i class='fas fa-copy'></i></a>" );
});
