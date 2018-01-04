const h2 = document.querySelector('h2');
const data = {id: h2.getAttribute('data-id')};
const type = h2.getAttribute('data-type');
const apiVersion = h2.getAttribute('data-api');
const requestPath = `/api/${type}/`;
const redirectUrl = `/api/${apiVersion}/${type}/`;
const text = document.getElementsByTagName('textarea');

const xhr = new XMLHttpRequest();
xhr.open("PUT", requestPath, true);
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = () => {
  if (xhr.readyState != 4) return;
  if (xhr.status != 200) {
    console.log('error');
  } else {
    const data = JSON.parse(xhr.responseText);
    if (data.status !== 'success') {
      console.log('error');
    } else {
      window.location.href = redirectUrl;
    }
  }
};

document.getElementById('addBtn').addEventListener('click', function() {
  Array.from(document.getElementsByTagName('input'), item => {
    data[item.name] = item.value
  });
  if (text[0]) {
    data[text[0].name] = text[0].textContent;
  }
  xhr.send(JSON.stringify(data));
})
