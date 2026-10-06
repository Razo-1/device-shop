export function backTo(){
    const back = document.getElementById('back');

    back.addEventListener('click',() => {
    window.history.back();

    setTimeout(() => {
        window.location.reload();
    }, 100);
})
}