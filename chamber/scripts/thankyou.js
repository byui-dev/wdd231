const URLParams = new URLSearchParams(window.location.search);
const formData = {
  firstName: URLParams.get('firstName'),
  lastName: URLParams.get('lastName'),
  email: URLParams.get('email'),
  mobile: URLParams.get('mobile'),
  organization: URLParams.get('organization'),
  membership: URLParams.get('membership'),
  description: URLParams.get('description'),
  timestamp: URLParams.get('timestamp')
};

const formDataList = document.getElementById('form-data-');
Object.keys(formData).forEach((key) => {
  const listItem = document.createElement('li');
  listItem.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${formData[key]}`;
  formDataList.appendChild(listItem);  
});  