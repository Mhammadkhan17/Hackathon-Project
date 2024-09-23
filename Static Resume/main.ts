document.querySelectorAll('.section h2').forEach((header) => {
    header.addEventListener('click', () => {
        const content:any = header.nextElementSibling;
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });
});