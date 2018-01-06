let timer;

class PopupFace {
  vader(id) {
    const startAnimation = () => setTimeout(() => {
      if (document.getElementById('vader')) {
        document.getElementById('vader').classList.add('down');
        setTimeout(() => document.getElementById('vader').remove(), 400);
      }
    }, 3000);

    if (!document.getElementById('vader')) {
      document.body.insertAdjacentHTML('beforeEnd', Handlebars.templates.vader({
        src: `./images/vader/${Math.floor(Math.random() * 2)}.png`,
        name: id
      }));
      timer = startAnimation();
      return;
    }

    clearTimeout(timer);
    document.getElementById('itemName').textContent = id;
    timer = startAnimation();
  }
}

export const popupFace = new PopupFace();
