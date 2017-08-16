function formToJson (form) {
  var formData = form.elements;
  var result = {};
  for(var i = 0 ; i < formData.length ; i++){
        var item = formData.item(i);
        result[item.name] = item.value;
    }
  return result;
}

function escapeHTML (unsafe_str) {
    return unsafe_str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#39;')
      .replace(/\//g, '&#x2F;')
}

var m = document.getElementById('message');
var s = document.getElementById('studentForm');
s.addEventListener('submit', function (event) {
  event.preventDefault();
  m.innerHTML = '';
  var data = formToJson(studentForm);
  var url = '/api/students';
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function () {
    var students = JSON.parse(xhr.responseText);
    if (xhr.readyState === 4 && xhr.status === 201) {
      m.setAttribute('class', 'success');
      m.innerHTML = 'Selamat datang, ' + escapeHTML(students.name) + '!';
    } else {
      m.setAttribute('class', 'error');
      m.innerHTML = 'Data gagal disimpan :(<br />Keterangan: ' + students.message;
    }
  };
  xhr.send(JSON.stringify(data));
});
