import datepicker from 'pikaday';
//import datepicker from 'tiny-date-picker';
import 'pikaday/css/pikaday.css';
//import 'tiny-date-picker/tiny-date-picker.min.css';

export default (inputDOM) => {
  new datepicker({field: document.querySelector(inputDOM)});
  //datepicker(document.querySelector(inputDOM));
};
