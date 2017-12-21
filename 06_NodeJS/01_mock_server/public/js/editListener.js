const h1 = document.querySelector('h1');
const data = {id: h1.getAttribute('data-id')};
const type = h1.getAttribute('data-type');
const apiVersion = h1.getAttribute('data-api');
const requestPath = `/api/${type}/`;
const redirectUrl = `/api/${apiVersion}/${type}/`;

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
  xhr.send(JSON.stringify(data));
})
