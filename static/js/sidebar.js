let sidebar = document.querySelector('.side-bar');
let arrowCollapse = document.querySelector('#logo-name__icon');
sidebar.onclick = () => {
    sidebar.classList.toggle('collapse');
    arrowCollapse.classList.toggle('collapse');
    if (arrowCollapse.classList.contains('collapse')) {
        arrowCollapse.classList = 
        'bx bx-arrow-from-left logo-name__icon collapse';
    } else {
        arrowCollapse.classList = 'bx bx-arrow-from-right logo-name__icon';
    }
}