import datepicker from 'pikaday';
import 'pikaday/css/pikaday.css';

export default (inputDOM) => {
  new datepicker({field: document.querySelector(inputDOM)});
};
