document.querySelectorAll('.section h2').forEach(function (header) {
    header.addEventListener('click', function () {
        var content = header.nextElementSibling;
        if (content.style.display === 'block') {
            content.style.display = 'none';
        }
        else {
            content.style.display = 'block';
        }
    });
});
