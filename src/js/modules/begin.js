export default function begin() {

    const btn = document.querySelector('#begin'),
          disp = document.querySelector('.begin'),
          close = document.querySelector('.tax__close');
    
    btn.addEventListener('click', () => {
        disp.classList.add('close');
    });

    close.addEventListener('click', () => {
        disp.classList.remove('close');
    });
}