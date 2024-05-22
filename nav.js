$(document).ready(function() {
    $("#nav-placeholder").load("nav.html", function() {
        var pathname = window.location.pathname.split("/").pop();
        if (pathname === "") pathname = "index.html";
        $('a[href="' + pathname + '"]').addClass('active');
    });
    $("#footer-placeholder").load("footer.html");
});
