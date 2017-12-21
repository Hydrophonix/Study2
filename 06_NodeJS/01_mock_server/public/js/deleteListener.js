Array.from(document.getElementsByClassName('delete-button'), item => {
  const id = item.getAttribute('name');
  item.addEventListener('click', function() {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', id, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState != 4) return;
      if (xhr.status != 200) {
        console.log('error');
      } else {
        const data = JSON.parse(xhr.responseText);
        if (data.status !== 'success') {
          console.log('error');
        } else {
          window.location.reload();
        }
      }
    };
    xhr.send();
  });
});
