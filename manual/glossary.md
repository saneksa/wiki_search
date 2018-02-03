# Глоссарий

  * Index - точка входа приложения. Файл, где содержится вызов `render` React'а и
   выполняется инициализация redux'а.
  * Страница(View) - корневой ui компонент, используется как компонент
  для отрисовки роутером (см. [Component](https://github.com/ReactTraining/react-router/blob/master/docs/API.md#component))
  * Route - конфигурация пути для react-router (https://github.com/ReactTraining/react-router/blob/master/docs/API.md#route)
  * Action - объект, описывающий действие, которое произошло в системе. Различные части системы общаются между собой 
  посредством action'ов и реагируют на них (http://redux.js.org/docs/basics/Actions.html). В чистом redux 
  action'ы нужны только, чтобы передавать информацию в store, но в нашем случае они также используются как
  управляющие сигналы для запуска логик.
  * Логика - объект, в котором выполняются действия с побочными эффектами, такие как ajax-запросы, работа с историей 
   браузера, запись в localStorage. Реализованы на базе [redux-logic](https://github.com/jeffbski/redux-logic)