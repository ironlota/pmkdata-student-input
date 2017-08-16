function daysInMonth(m, y) { // m is 1-indexed: 1-12
    switch (m) {
        case 2 :
            return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
        case 9 : case 4 : case 6 : case 11 :
            return 30;
        default :
            return 31
    }
}

function isDateValid(dateStr) {
    var dates = dateStr.split('-');
    if (dates.length != 3) return false;
    var y = dates[0];
    var m = dates[1];
    var d = dates[2];
    return y >= 1990 && y <= 2089 && m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
}

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
  if (!isDateValid(data.birth_date)) {
    m.innerHTML = 'Tanggal lahir harus merupakan tanggal yang benar dalam format YYYY-MM-DD (tahun-bulan-tanggal)';
    return false;
  }
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
