# Управление данными

Доступна по адресу: `localhost:4000/hello_worlds`

Класс компонента: `containers/HelloWorlds/HelloWorlds.js`

По сравнению с `FirstPage` добавляется использование redux и redux-logic.

При отрисовке страницы, в [componentWillMount](https://facebook.github.io/react/docs/react-component.html#mounting) 
выполняется отправка action'а на получение данных (если данных еще нет). 
Там же выполняется [mapping](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) данных
из store в [props](https://facebook.github.io/react/docs/components-and-props.html) компонента.

Запрос к сервису поиска выполняется в логике `searchHelloWorld`. 
