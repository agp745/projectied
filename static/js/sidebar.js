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

function createPform() {
    document.querySelector('.bg-modal').style.display = 'flex';
}

function addCollabForm() {
    document.querySelector('.collab-modal').style.display = 'flex';
}

function showCollabForm() {
    document.querySelector('.show-collab-modal').style.display = 'flex';
}

document.querySelector('.close').addEventListener('click', function() {
    document.querySelector('.bg-modal').style.display = 'none'
})

document.querySelector('.closeC').addEventListener('click', function() {
    document.querySelector('.collab-modal').style.display = 'none'
})

document.querySelector('.closeS').addEventListener('click', function() {
    document.querySelector('.show-collab-modal').style.display = 'none'
})

