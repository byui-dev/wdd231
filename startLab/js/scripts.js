const openButton = document.querySelector('#openButton');
const dialogBox = document.querySelector('#dialogBox');
const closeButton = document.querySelector('#closeButton');
const dialogBoxText = document.querySelector('#dialogBox div');

// Open the dialog when the button is clicked
openButton1.addEventListener('click', () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `One Apple contains about 95 calories. Apples are a good source of fiber and vitamin C.`
    // Update the dialog content based on the button clicked
});

openButton2.addEventListener('click', () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `One Orange contains about 62 calories. Oranges are an excellent source of vitamin C and fiber.`
    // Update the dialog content based on the button clicked
});

openButton3.addEventListener('click', () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `One Banana contains about 105 calories. Bananas are a good source of potassium and vitamin C.`
    // Update the dialog content based on the button clicked
});

closeButton.addEventListener('click', () => {
    dialogBox.close();
});