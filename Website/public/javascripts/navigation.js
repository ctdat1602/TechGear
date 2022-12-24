let click = document.querySelectorAll('header ul li');
function active(){
    click.forEach((item) => 
    item.classList.remove('hovered'));
    this.classList.add('hovered');
}
click.forEach((item) =>
    item.addEventListener('mouseover',active));