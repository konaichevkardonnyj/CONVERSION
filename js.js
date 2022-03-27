//document.addEventListener('DOMContentLoaded', ()=>{
/* Создния модельного окна*/
const open = document.querySelectorAll('[date-input]'), // кдюч аргумент
      close = document.querySelector('[date-close]'),   // крестик закрытия
      model = document.querySelector('.modal');         // блок div для отображния всплывающей информации

function openModel (){
   model.classList.add('show');            // добавления класса со св-м display = 'block'
   document.body.style.overflow = 'hidden';  // отключить фоновую прокрутку св-м overflow = 'hidden'
   clearInterval(modelTimeId)       // если модельное окно открыто, то интервал удален
}
open.forEach( item=>{                       // функция для перебора массива
item.addEventListener('click', () => {  // все кнопки по событию
   openModel ()
   });
});

function clossModel() {
    model.classList.remove('show');         // удаление класса, что не показывать блок div
    document.body.style.overflow = ''             // включить фоновую прокрутку св-м overflow = 'hidden'
}
close.addEventListener('click', (clossModel));   // крестик закрытия
model.addEventListener('click',(e)=>{ // по фону закрытия
    console.dir(e.target);
    if (e.target === model) {                   // условия на className: "modal" в e.target
        clossModel()                            // удаление класса, что не показывать блок div
    }
});
document.addEventListener('keydown',(e)=>{ //событие на кнопку
    if (e.code === "Escape" && model.classList.contains('show')) {
        // условия при нажании кнопки Esc и есть ли класс show
        clossModel()
    }
});
    /*Появление окна через некотрое время */
const modelTimeId = setInterval(openModel, 1500);
    /*Прокрутить до низу и откроется окно*/
    /*document.documentElement.clientHeight; //прокрутка по Y
    window.pageYOffset; // Что видет пользователь
    document.documentElement.scrollHeight; // вся высота*/
function endmodel () {
   if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModel();
      window.removeEventListener('scroll', endmodel) // после выполнения удалить событие
   }
}
window.addEventListener('scroll', endmodel)  //событие  вызова на скрол endmodel()

/** Передача в Backend(Бэкент) модульного окна
 *  С ПОМОЩЬЮ FORMDATE   */
const forms = document.querySelectorAll('form');
const message = {
   loading: 'Загрузка',
   success: 'Спасибо, данные отправлены',
   failure: 'Ошибка, данные не отправлены'
};

forms.forEach(item =>{
   postData(item)
})

function postData (form){
   form.addEventListener('submit',(event)=>{
      event.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const request = new XMLHttpRequest();
      request.open = ('POST', 'server.php');
      //request.setRequestHeader('Content-type', 'multipart/form-data'); //заголовок не писать т.к. не покажет в консоль

      const formData = new FormData(form);

      request.send(formData);

      request.addEventListener('load',()=>{
         if (request.status ===200) {
            console.log(request.response);
            statusMessage.textContent = message.success; // сообщение об успехе
            form.reset();                                // сбор записи value
            setTimeout(() => {                    // интервал
               statusMessage.remove();
            }, 2000);                             // удаление сообщения после 2 секунд
         } else {
            statusMessage.textContent = message.failure; // сообщение об ошибке
         }
      })
   })
}











//});