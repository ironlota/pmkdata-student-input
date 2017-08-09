function formToJson (form) {
  const formData = new FormData(form);
  let result = {};
  for (const [entry, value] of formData.entries()) result[entry] = value;
  return result;
}

const message = document.getElementById('message');
const studentForm = document.getElementById('studentForm');
studentForm.addEventListener('submit', function (event) {
  event.preventDefault();
  message.innerHTML = '';
  const data = formToJson(studentForm);
  const url = 'http://localhost:3000/api/students';
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function () {
    const students = JSON.parse(xhr.responseText);
    if (xhr.readyState === 4 && xhr.status === '201') {
      message.setAttribute('class', 'success');
      message.innerHTML = 'Success! <br />' + students.name + ' has been registered!';
    } else {
      message.setAttribute('class', 'error');
      message.innerHTML = 'Error! <br /> Message: ' + students.message;
    }
  };
  xhr.send(JSON.stringify(data));
});
